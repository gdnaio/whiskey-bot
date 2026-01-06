import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
  },
})

const docClient = DynamoDBDocumentClient.from(client)

/**
 * DynamoDB Service
 * 
 * NOTE: For production, you should use a backend API instead of connecting directly
 * from the frontend. This setup is for development purposes.
 * 
 * For production, create a backend API (Node.js/Express, AWS Lambda, etc.) that
 * handles DynamoDB operations and call that API from your React app.
 */
class DynamoDBService {
  /**
   * Get a single item by primary key
   * @param {string} tableName - Name of the DynamoDB table
   * @param {object} key - Primary key object (e.g., { id: '123' })
   * @returns {Promise<object|null>} The item or null if not found
   */
  async getItem(tableName, key) {
    try {
      const command = new GetCommand({
        TableName: tableName,
        Key: key,
      })
      const response = await docClient.send(command)
      return response.Item || null
    } catch (error) {
      console.error('Error getting item from DynamoDB:', error)
      throw error
    }
  }

  /**
   * Put (create or replace) an item
   * @param {string} tableName - Name of the DynamoDB table
   * @param {object} item - The item to put
   * @returns {Promise<object>} The response
   */
  async putItem(tableName, item) {
    try {
      const command = new PutCommand({
        TableName: tableName,
        Item: item,
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
   * @param {object} updateExpression - Update expression (e.g., 'SET #name = :name')
   * @param {object} expressionAttributeNames - Expression attribute names
   * @param {object} expressionAttributeValues - Expression attribute values
   * @returns {Promise<object>} The response
   */
  async updateItem(tableName, key, updateExpression, expressionAttributeNames = {}, expressionAttributeValues = {}) {
    try {
      const command = new UpdateCommand({
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
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
   * @returns {Promise<object>} The response
   */
  async deleteItem(tableName, key) {
    try {
      const command = new DeleteCommand({
        TableName: tableName,
        Key: key,
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
   * @param {string} tableName - Name of the DynamoDB table
   * @param {object} filterExpression - Optional filter expression
   * @returns {Promise<Array>} Array of items
   */
  async scanTable(tableName, filterExpression = null) {
    try {
      const params = {
        TableName: tableName,
      }
      
      if (filterExpression) {
        params.FilterExpression = filterExpression.expression
        params.ExpressionAttributeNames = filterExpression.attributeNames || {}
        params.ExpressionAttributeValues = filterExpression.attributeValues || {}
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
   * @param {string} tableName - Name of the DynamoDB table
   * @param {string} keyConditionExpression - Key condition expression
   * @param {object} expressionAttributeNames - Expression attribute names
   * @param {object} expressionAttributeValues - Expression attribute values
   * @returns {Promise<Array>} Array of items
   */
  async queryTable(tableName, keyConditionExpression, expressionAttributeNames = {}, expressionAttributeValues = {}) {
    try {
      const command = new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
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


