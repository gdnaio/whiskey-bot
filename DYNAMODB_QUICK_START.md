# DynamoDB Quick Start Checklist

## ✅ Step-by-Step Setup

### 1. Create Tables in AWS Console (5 minutes)

1. Go to [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb/)
2. Click **"Create table"**
3. For each table, create both dev and prod versions:

**Development Tables:**
- Table name: `dev_warehouses`
- Partition key: `id` (String)
- Capacity: **On-demand** (recommended for free tier)

**Production Tables:**
- Table name: `prod_warehouses`
- Partition key: `id` (String)
- Capacity: **On-demand**

**Repeat for:**
- `dev_mash_bills` / `prod_mash_bills`
- `dev_internal_spirit_types` / `prod_internal_spirit_types`
- `dev_fermentation_logs` / `prod_fermentation_logs`
- `dev_distillation_logs` / `prod_distillation_logs`
- `dev_barrels` / `prod_barrels`
- Any other tables you need

---

### 2. Create IAM User (3 minutes)

1. Go to [IAM Console](https://console.aws.amazon.com/iam/)
2. **Users** → **"Add users"**
3. Name: `whiskeybot-dev`
4. Access type: **"Access key - Programmatic access"**
5. Permissions: Attach **"AmazonDynamoDBFullAccess"** policy
6. **SAVE** the Access Key ID and Secret Access Key immediately!

---

### 3. Local Development Setup (2 minutes)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   VITE_ENVIRONMENT=dev
   VITE_AWS_REGION=us-east-1
   VITE_AWS_ACCESS_KEY_ID=<paste-your-access-key>
   VITE_AWS_SECRET_ACCESS_KEY=<paste-your-secret-key>
   ```

3. Restart your dev server:
   ```bash
   npm run dev
   ```

---

### 4. Production Setup in AWS Amplify (5 minutes)

1. Go to your Amplify app in [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click on your app → **"Environment variables"**
3. Click **"Manage variables"**
4. Add these variables:

   ```
   VITE_ENVIRONMENT = prod
   VITE_AWS_REGION = us-east-1
   VITE_AWS_ACCESS_KEY_ID = <your-prod-access-key>
   VITE_AWS_SECRET_ACCESS_KEY = <your-prod-secret-key>
   ```

5. **Redeploy** your app (Amplify will auto-redeploy after adding variables)

---

### 5. Test Connection

Add this test code to any component:

```javascript
import { useEffect } from 'react'
import dynamoDBService from '../services/dynamodb'

useEffect(() => {
  async function test() {
    try {
      // Test write
      await dynamoDBService.putItem('warehouses', {
        id: 'test-' + Date.now(),
        name: 'Test Warehouse',
        createdAt: new Date().toISOString()
      })
      console.log('✅ DynamoDB connected!')
      
      // Test read
      const items = await dynamoDBService.scanTable('warehouses')
      console.log(`Found ${items.length} items`)
    } catch (error) {
      console.error('❌ DynamoDB error:', error)
    }
  }
  test()
}, [])
```

---

## 📝 Important Notes

- **Table names are auto-prefixed**: Pass `'warehouses'` → uses `dev_warehouses` or `prod_warehouses`
- **Environment detection**: Set `VITE_ENVIRONMENT=dev` or `VITE_ENVIRONMENT=prod`
- **Never commit `.env`**: Already in `.gitignore`
- **Free tier**: 25 GB storage + 25 read/write units per month

---

## 🔗 Full Documentation

See `AWS_DYNAMODB_SETUP.md` for complete details, troubleshooting, and security best practices.

