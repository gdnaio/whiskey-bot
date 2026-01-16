import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'

// Get environment (dev or prod)
const environment = import.meta.env.VITE_ENVIRONMENT || 'dev'
const isProduction = environment === 'prod' || environment === 'production'

// Initialize DynamoDB client
// In production with Amplify, credentials may be handled by AWS SDK automatically
const clientConfig = {
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
}

// Only add explicit credentials if they're provided (for local dev)
if (import.meta.env.VITE_AWS_ACCESS_KEY_ID && import.meta.env.VITE_AWS_SECRET_ACCESS_KEY) {
  clientConfig.credentials = {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  }
}

const client = new DynamoDBClient(clientConfig)

const docClient = DynamoDBDocumentClient.from(client)

/**
 * DynamoDB Service
 * 
 * Supports both development (local .env) and production (AWS Amplify) environments.
 * Automatically prefixes table names based on environment (dev_* or prod_*).
 * Automatically segments data by ownerId (Cognito user ID) for multi-tenant support.
 * 
 * NOTE: For production, you should use a backend API instead of connecting directly
 * from the frontend. This setup is for development purposes.
 * 
 * For production, create a backend API (Node.js/Express, AWS Lambda, etc.) that
 * handles DynamoDB operations and call that API from your React app.
 */
class DynamoDBService {
  /**
   * Get the full table name with environment prefix
   * @param {string} tableName - Base table name (e.g., 'warehouses')
   * @returns {string} Full table name (e.g., 'dev_warehouses' or 'prod_warehouses')
   */
  getTableName(tableName) {
    const prefix = isProduction ? 'prod' : 'dev'
    return `${prefix}_${tableName}`
  }

  /**
   * Ensure ownerId is present in an item
   * @param {object} item - The item to check
   * @param {string} ownerId - The owner ID to add if missing
   * @returns {object} Item with ownerId
   */
  _ensureOwnerId(item, ownerId) {
    if (!ownerId) {
      throw new Error('ownerId is required for DynamoDB operations. User must be authenticated.')
    }
    return {
      ...item,
      ownerId: item.ownerId || ownerId,
    }
  }
  /**
   * Get a single item by primary key
   * @param {string} tableName - Name of the DynamoDB table
   * @param {object} key - Primary key object (e.g., { id: '123' })
   * @param {string} ownerId - Owner ID (Cognito user ID) - required
   * @returns {Promise<object|null>} The item or null if not found (only returns if ownerId matches)
   */
  async getItem(tableName, key, ownerId) {
    if (!ownerId) {
      throw new Error('ownerId is required for getItem operation')
    }
    try {
      const command = new GetCommand({
        TableName: this.getTableName(tableName),
        Key: key,
      })
      const response = await docClient.send(command)
      const item = response.Item || null
      
      // Verify ownership
      if (item && item.ownerId !== ownerId) {
        console.warn('Item found but ownerId does not match. Returning null for security.')
        return null
      }
      
      return item
    } catch (error) {
      console.error('Error getting item from DynamoDB:', error)
      throw error
    }
  }

  /**
   * Put (create or replace) an item
   * @param {string} tableName - Name of the DynamoDB table
   * @param {object} item - The item to put
   * @param {string} ownerId - Owner ID (Cognito user ID) - required
   * @returns {Promise<object>} The response
   */
  async putItem(tableName, item, ownerId) {
    if (!ownerId) {
      throw new Error('ownerId is required for putItem operation')
    }
    try {
      const itemWithOwner = this._ensureOwnerId(item, ownerId)
      const command = new PutCommand({
        TableName: this.getTableName(tableName),
        Item: itemWithOwner,
      })
      const response = await docClient.send(command)
      return response
    } catch (error) {
      console.error('Error putting item to DynamoDB:', error)
      throw error
    }
  }

  /**
   * Update an item
   * @param {string} tableName - Name of the DynamoDB table
   * @param {object} key - Primary key object
   * @param {string} ownerId - Owner ID (Cognito user ID) - required
   * @param {object} updateExpression - Update expression (e.g., 'SET #name = :name')
   * @param {object} expressionAttributeNames - Expression attribute names
   * @param {object} expressionAttributeValues - Expression attribute values
   * @returns {Promise<object>} The response
   */
  async updateItem(tableName, key, ownerId, updateExpression, expressionAttributeNames = {}, expressionAttributeValues = {}) {
    if (!ownerId) {
      throw new Error('ownerId is required for updateItem operation')
    }
    try {
      // First verify ownership by getting the item
      const existingItem = await this.getItem(tableName, key, ownerId)
      if (!existingItem) {
        throw new Error('Item not found or you do not have permission to update it')
      }

      // Add ownerId to condition expression to ensure ownership
      const conditionExpression = 'ownerId = :ownerId'
      const finalExpressionAttributeNames = {
        ...expressionAttributeNames,
        '#ownerId': 'ownerId',
      }
      const finalExpressionAttributeValues = {
        ...expressionAttributeValues,
        ':ownerId': ownerId,
      }

      const command = new UpdateCommand({
        TableName: this.getTableName(tableName),
        Key: key,
        UpdateExpression: updateExpression,
        ConditionExpression: conditionExpression,
        ExpressionAttributeNames: finalExpressionAttributeNames,
        ExpressionAttributeValues: finalExpressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      })
      const response = await docClient.send(command)
      return response.Attributes
    } catch (error) {
      console.error('Error updating item in DynamoDB:', error)
      throw error
    }
  }

  /**
   * Delete an item
   * @param {string} tableName - Name of the DynamoDB table
   * @param {object} key - Primary key object
   * @param {string} ownerId - Owner ID (Cognito user ID) - required
   * @returns {Promise<object>} The response
   */
  async deleteItem(tableName, key, ownerId) {
    if (!ownerId) {
      throw new Error('ownerId is required for deleteItem operation')
    }
    try {
      // First verify ownership
      const existingItem = await this.getItem(tableName, key, ownerId)
      if (!existingItem) {
        throw new Error('Item not found or you do not have permission to delete it')
      }

      const command = new DeleteCommand({
        TableName: this.getTableName(tableName),
        Key: key,
        ConditionExpression: 'ownerId = :ownerId',
        ExpressionAttributeValues: {
          ':ownerId': ownerId,
        },
      })
      const response = await docClient.send(command)
      return response
    } catch (error) {
      console.error('Error deleting item from DynamoDB:', error)
      throw error
    }
  }

  /**
   * Scan all items in a table (use with caution on large tables)
   * Automatically filters by ownerId to only return items belonging to the user
   * @param {string} tableName - Name of the DynamoDB table
   * @param {string} ownerId - Owner ID (Cognito user ID) - required
   * @param {object} filterExpression - Optional additional filter expression
   * @returns {Promise<Array>} Array of items belonging to the owner
   */
  async scanTable(tableName, ownerId, filterExpression = null) {
    if (!ownerId) {
      throw new Error('ownerId is required for scanTable operation')
    }
    try {
      const params = {
        TableName: this.getTableName(tableName),
        FilterExpression: 'ownerId = :ownerId',
        ExpressionAttributeValues: {
          ':ownerId': ownerId,
        },
      }
      
      if (filterExpression) {
        // Combine ownerId filter with additional filter
        params.FilterExpression = `ownerId = :ownerId AND (${filterExpression.expression})`
        params.ExpressionAttributeNames = filterExpression.attributeNames || {}
        params.ExpressionAttributeValues = {
          ':ownerId': ownerId,
          ...filterExpression.attributeValues,
        }
      }

      const command = new ScanCommand(params)
      const response = await docClient.send(command)
      return response.Items || []
    } catch (error) {
      console.error('Error scanning DynamoDB table:', error)
      throw error
    }
  }

  /**
   * Query items by partition key (and optionally sort key)
   * Automatically filters by ownerId to only return items belonging to the user
   * @param {string} tableName - Name of the DynamoDB table
   * @param {string} ownerId - Owner ID (Cognito user ID) - required
   * @param {string} keyConditionExpression - Key condition expression
   * @param {object} expressionAttributeNames - Expression attribute names
   * @param {object} expressionAttributeValues - Expression attribute values
   * @returns {Promise<Array>} Array of items belonging to the owner
   */
  async queryTable(tableName, ownerId, keyConditionExpression, expressionAttributeNames = {}, expressionAttributeValues = {}) {
    if (!ownerId) {
      throw new Error('ownerId is required for queryTable operation')
    }
    try {
      const finalExpressionAttributeValues = {
        ...expressionAttributeValues,
        ':ownerId': ownerId,
      }
      
      // Add ownerId filter to the query
      const filterExpression = 'ownerId = :ownerId'
      
      const command = new QueryCommand({
        TableName: this.getTableName(tableName),
        KeyConditionExpression: keyConditionExpression,
        FilterExpression: filterExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: finalExpressionAttributeValues,
      })
      const response = await docClient.send(command)
      return response.Items || []
    } catch (error) {
      console.error('Error querying DynamoDB table:', error)
      throw error
    }
  }
}

// Export a singleton instance
export const dynamoDBService = new DynamoDBService()
export default dynamoDBService


