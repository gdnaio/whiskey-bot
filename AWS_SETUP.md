# AWS DynamoDB Setup Guide

This guide will help you connect your WhiskeyBot application to AWS DynamoDB.

## Prerequisites

1. AWS Account with DynamoDB table created
2. AWS Access Key ID and Secret Access Key
3. DynamoDB table name and region

## Step 1: Create Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
# AWS Region where your DynamoDB table is located
VITE_AWS_REGION=us-east-1

# AWS Access Key ID (for development only - use IAM roles in production)
VITE_AWS_ACCESS_KEY_ID=your-access-key-id-here

# AWS Secret Access Key (for development only - use IAM roles in production)
VITE_AWS_SECRET_ACCESS_KEY=your-secret-access-key-here

# DynamoDB Table Names (add your table names here)
VITE_TABLE_MASH_BILLS=mash-bills
VITE_TABLE_INTERNAL_SPIRIT_TYPES=internal-spirit-types
VITE_TABLE_CONTACTS=contacts
```

**Important:** The `.env` file is already in `.gitignore` and will not be committed to git.

## Step 2: Get Your AWS Credentials

1. Go to AWS Console → IAM → Users
2. Select your user (or create a new one)
3. Go to "Security credentials" tab
4. Click "Create access key"
5. Choose "Application running outside AWS"
6. Copy the Access Key ID and Secret Access Key
7. **Save the Secret Access Key immediately** - you won't be able to see it again

## Step 3: Set Up IAM Permissions

Your IAM user needs the following DynamoDB permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Scan",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:*:*:table/*"
    }
  ]
}
```

Or attach the `AmazonDynamoDBFullAccess` policy for development (not recommended for production).

## Step 4: Using the DynamoDB Service

Import and use the service in your React components:

```javascript
import dynamoDBService from '../services/dynamodb'

// Example: Get an item
const mashBill = await dynamoDBService.getItem('mash-bills', { id: '123' })

// Example: Create/Update an item
await dynamoDBService.putItem('mash-bills', {
  id: '123',
  name: 'My Mash Bill',
  batchSize: 100,
  // ... other fields
})

// Example: Update an item
await dynamoDBService.updateItem(
  'mash-bills',
  { id: '123' },
  'SET #name = :name, batchSize = :batchSize',
  { '#name': 'name' },
  { ':name': 'Updated Name', ':batchSize': 150 }
)

// Example: Delete an item
await dynamoDBService.deleteItem('mash-bills', { id: '123' })

// Example: Scan all items
const allMashBills = await dynamoDBService.scanTable('mash-bills')

// Example: Query items
const items = await dynamoDBService.queryTable(
  'mash-bills',
  'userId = :userId',
  {},
  { ':userId': 'user123' }
)
```

## Step 5: Restart Your Development Server

After creating the `.env` file, restart your Vite dev server:

```bash
npm run dev
```

## Security Best Practices

⚠️ **Important Security Notes:**

1. **Never commit `.env` files to git** - They're already in `.gitignore`
2. **For production**, use one of these approaches:
   - **Backend API**: Create a Node.js/Express API that handles DynamoDB operations
   - **AWS Amplify**: Use AWS Amplify for full-stack integration
   - **API Gateway + Lambda**: Serverless backend API
   - **IAM Roles**: Use IAM roles instead of access keys when deploying to AWS

3. **Limit IAM permissions**: Only grant the minimum permissions needed
4. **Use environment-specific credentials**: Different keys for dev/staging/production

## Example: Creating a Backend API (Recommended for Production)

For production, create a simple Express.js backend:

```javascript
// backend/server.js
const express = require('express')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
// ... set up routes that call DynamoDB

// Then call from React:
const response = await fetch('https://your-api.com/api/mash-bills', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(mashBillData)
})
```

## Troubleshooting

- **"Access Denied"**: Check IAM permissions
- **"Table not found"**: Verify table name and region
- **"Invalid credentials"**: Double-check your Access Key ID and Secret Access Key
- **CORS errors**: If using a backend API, ensure CORS is configured

## Next Steps

1. Create your DynamoDB tables in AWS Console
2. Set up your `.env` file with credentials
3. Start using the `dynamoDBService` in your components
4. Consider setting up a backend API for production use


