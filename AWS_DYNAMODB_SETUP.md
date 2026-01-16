# AWS DynamoDB Setup Guide - Dev & Production

This guide walks you through setting up DynamoDB for both local development and production deployment on AWS Amplify.

## Overview

- **Development**: Uses local `.env` file with `dev_` prefixed tables
- **Production**: Uses AWS Amplify environment variables with `prod_` prefixed tables
- **Free Tier**: DynamoDB free tier includes 25 GB storage and 25 read/write capacity units

---

## Part 1: Create DynamoDB Tables in AWS Console

### Step 1: Log into AWS Console

1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Sign in to your account
3. Navigate to **DynamoDB** service

### Step 2: Create Development Table

1. Click **"Create table"**
2. **Table name**: `dev_warehouses` (or your first table name)
3. **Partition key**: `id` (type: String)
4. **Table settings**: 
   - **Capacity mode**: Choose **"On-demand"** (free tier eligible, pay per request)
   - OR **"Provisioned"** with 5 read/write capacity units (free tier covers 25 units)
5. Click **"Create table"**

### Step 3: Create Production Table

1. Click **"Create table"** again
2. **Table name**: `prod_warehouses` (same structure, different prefix)
3. **Partition key**: `id` (type: String)
4. **Table settings**: Same as dev table
5. Click **"Create table"**

### Step 4: Create Additional Tables

Repeat for all tables you need:
- `dev_warehouses` / `prod_warehouses`
- `dev_mash_bills` / `prod_mash_bills`
- `dev_internal_spirit_types` / `prod_internal_spirit_types`
- `dev_fermentation_logs` / `prod_fermentation_logs`
- `dev_distillation_logs` / `prod_distillation_logs`
- `dev_barrels` / `prod_barrels`
- etc.

**Note**: The service automatically prefixes table names based on `VITE_ENVIRONMENT`, so you only need to pass the base name (e.g., `warehouses`) to the service methods.

---

## Part 2: Set Up IAM User & Permissions

### Step 1: Create IAM User for Development

1. Go to **IAM** → **Users** → **"Add users"**
2. **User name**: `whiskeybot-dev` (or your preferred name)
3. **Access type**: Select **"Access key - Programmatic access"**
4. Click **"Next: Permissions"**

### Step 2: Attach DynamoDB Policy

1. Click **"Attach policies directly"**
2. Search for and select: **"AmazonDynamoDBFullAccess"** (for development)
   - OR create a custom policy with only the permissions you need (see below)
3. Click **"Next"** → **"Create user"**
4. **IMPORTANT**: Copy the **Access Key ID** and **Secret Access Key**
   - Save these immediately - you won't see the secret key again!

### Step 3: Custom Policy (Optional - More Secure)

If you want to limit permissions, create a custom policy:

1. Go to **IAM** → **Policies** → **"Create policy"**
2. Click **"JSON"** tab and paste:

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
        "dynamodb:Query",
        "dynamodb:BatchGetItem",
        "dynamodb:BatchWriteItem"
      ],
      "Resource": [
        "arn:aws:dynamodb:*:*:table/dev_*",
        "arn:aws:dynamodb:*:*:table/prod_*"
      ]
    }
  ]
}
```

3. Name it: `WhiskeyBotDynamoDBAccess`
4. Attach it to your IAM user

---

## Part 3: Local Development Setup

### Step 1: Create `.env` File

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your values:

```env
# Environment
VITE_ENVIRONMENT=dev

# AWS Region
VITE_AWS_REGION=us-east-1

# AWS Credentials (from IAM user you created)
VITE_AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
VITE_AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### Step 2: Verify `.env` is Ignored

Check that `.env` is in `.gitignore` (it should be already):
```bash
cat .gitignore | grep .env
```

### Step 3: Restart Dev Server

```bash
npm run dev
```

The app will now connect to your `dev_*` tables in DynamoDB.

---

## Part 4: Production Setup (AWS Amplify)

### Step 1: Deploy to AWS Amplify

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. Click **"New app"** → **"Host web app"**
4. Connect your repository
5. Configure build settings (Amplify usually auto-detects Vite/React)

### Step 2: Set Environment Variables in Amplify

1. In your Amplify app, go to **"Environment variables"**
2. Click **"Manage variables"**
3. Add the following variables:

```
VITE_ENVIRONMENT = prod
VITE_AWS_REGION = us-east-1
VITE_AWS_ACCESS_KEY_ID = <your-production-access-key>
VITE_AWS_SECRET_ACCESS_KEY = <your-production-secret-key>
```

**OR** (Recommended): Use IAM Roles instead of access keys:

1. In Amplify, go to **"Access control"** → **"Service role"**
2. Create or select an IAM role with DynamoDB permissions
3. The AWS SDK will automatically use this role (no access keys needed)

### Step 3: Create Production IAM User (If Using Access Keys)

1. Create a separate IAM user: `whiskeybot-prod`
2. Attach the same DynamoDB policy
3. Use these credentials in Amplify environment variables

### Step 4: Redeploy

After setting environment variables, Amplify will automatically redeploy. Your app will now connect to `prod_*` tables.

---

## Part 5: Using the DynamoDB Service

### In Your Components

```javascript
import dynamoDBService from '../services/dynamodb'

// The service automatically uses the correct table prefix based on VITE_ENVIRONMENT
// Pass only the base table name:

// Get an item
const warehouse = await dynamoDBService.getItem('warehouses', { id: '123' })
// Connects to: dev_warehouses (local) or prod_warehouses (production)

// Create/Update an item
await dynamoDBService.putItem('warehouses', {
  id: '123',
  name: 'Main Warehouse',
  taxPaid: true,
  sortOrder: 1,
  createdAt: new Date().toISOString()
})

// Update an item
await dynamoDBService.updateItem(
  'warehouses',
  { id: '123' },
  'SET #name = :name, taxPaid = :taxPaid',
  { '#name': 'name' },
  { ':name': 'Updated Warehouse Name', ':taxPaid': false }
)

// Delete an item
await dynamoDBService.deleteItem('warehouses', { id: '123' })

// Scan all items
const allWarehouses = await dynamoDBService.scanTable('warehouses')

// Query items (requires a GSI or sort key)
const items = await dynamoDBService.queryTable(
  'warehouses',
  'userId = :userId',
  {},
  { ':userId': 'user123' }
)
```

---

## Part 6: Testing the Connection

### Test Locally

1. Create a test component or add to an existing page:

```javascript
import { useEffect, useState } from 'react'
import dynamoDBService from '../services/dynamodb'

function TestDynamoDB() {
  const [status, setStatus] = useState('Testing...')

  useEffect(() => {
    async function test() {
      try {
        // Test write
        await dynamoDBService.putItem('warehouses', {
          id: 'test-' + Date.now(),
          name: 'Test Warehouse',
          createdAt: new Date().toISOString()
        })
        
        // Test read
        const items = await dynamoDBService.scanTable('warehouses')
        setStatus(`✅ Connected! Found ${items.length} items.`)
      } catch (error) {
        setStatus(`❌ Error: ${error.message}`)
        console.error('DynamoDB Error:', error)
      }
    }
    test()
  }, [])

  return <div>{status}</div>
}
```

2. Add this component to a page temporarily
3. Check the browser console for any errors

### Test in Production

1. Deploy to Amplify
2. Check Amplify logs for any DynamoDB errors
3. Test the same functionality in production

---

## Part 7: Free Tier Limits & Costs

### DynamoDB Free Tier (Always Free)

- **25 GB** of storage
- **25 read capacity units** (RCU) per month
- **25 write capacity units** (WCU) per month
- **2.5 million stream read requests** from DynamoDB Streams

### On-Demand Pricing (After Free Tier)

- **$1.25 per million write request units**
- **$0.25 per million read request units**
- **$0.25 per GB** of data stored

### Cost Estimation

For a small application:
- ~1,000 reads/day = ~30,000/month = **$0.01/month**
- ~100 writes/day = ~3,000/month = **$0.01/month**
- 1 GB storage = **$0.25/month**

**Total: ~$0.27/month** (well within free tier for small apps)

---

## Part 8: Security Best Practices

### ✅ Do:

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use separate IAM users** for dev and prod
3. **Limit IAM permissions** to only what's needed
4. **Use IAM roles** in Amplify instead of access keys when possible
5. **Enable MFA** on your AWS root account
6. **Rotate access keys** regularly (every 90 days)

### ❌ Don't:

1. **Don't use root account credentials**
2. **Don't share access keys** in code or chat
3. **Don't use the same credentials** for dev and prod
4. **Don't grant more permissions** than necessary

---

## Part 9: Troubleshooting

### "Access Denied" Error

- Check IAM user has DynamoDB permissions
- Verify access key ID and secret key are correct
- Check table name matches exactly (case-sensitive)

### "Table Not Found" Error

- Verify table exists in the correct region
- Check table name includes the prefix (`dev_` or `prod_`)
- Ensure `VITE_ENVIRONMENT` is set correctly

### "Invalid Credentials" Error

- Double-check `.env` file values (no extra spaces)
- Verify credentials are active in IAM
- Restart dev server after changing `.env`

### CORS Errors (if using backend API)

- Configure CORS in your API Gateway or Express server
- Add your domain to allowed origins

### Connection Timeout

- Check your internet connection
- Verify AWS region is correct
- Check AWS service status page

---

## Part 10: Next Steps

1. ✅ Create DynamoDB tables (dev and prod)
2. ✅ Set up IAM user with permissions
3. ✅ Create local `.env` file
4. ✅ Test connection locally
5. ✅ Deploy to Amplify
6. ✅ Set Amplify environment variables
7. ✅ Test connection in production
8. ✅ Start using DynamoDB in your components!

---

## Quick Reference

### Environment Variables

**Local (.env):**
```env
VITE_ENVIRONMENT=dev
VITE_AWS_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=<dev-key>
VITE_AWS_SECRET_ACCESS_KEY=<dev-secret>
```

**Production (Amplify):**
```
VITE_ENVIRONMENT=prod
VITE_AWS_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=<prod-key>
VITE_AWS_SECRET_ACCESS_KEY=<prod-secret>
```

### Table Naming

- Base name: `warehouses`
- Dev table: `dev_warehouses` (auto-prefixed)
- Prod table: `prod_warehouses` (auto-prefixed)

### Service Usage

```javascript
// Always use base name - prefix is automatic
await dynamoDBService.putItem('warehouses', data)
```

---

## Support

If you encounter issues:
1. Check AWS CloudWatch logs (in Amplify)
2. Check browser console for errors
3. Verify IAM permissions
4. Test with AWS CLI: `aws dynamodb list-tables --region us-east-1`

