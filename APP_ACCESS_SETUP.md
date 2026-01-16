# Give Your App Access to DynamoDB Tables

Now that your tables are created, you need to set up credentials for your React application to access them.

---

## Step 1: Create IAM User for Your Application

### In AWS Console:

1. Go to **IAM** → **Users** → **"Add users"**
2. **User name**: `whiskeybot-app-dev` (for development)
3. **Access type**: Select **"Access key - Programmatic access"**
4. Click **"Next"**
5. **Permissions**: 
   - Select **"Attach policies directly"**
   - Search for and select: **"AmazonDynamoDBFullAccess"**
   - Click **"Next"**
6. Review and click **"Create user"**
7. **IMPORTANT**: Copy both:
   - **Access Key ID** (starts with `AKIA...`)
   - **Secret Access Key** (long string - you can only see it once!)
   - Save these somewhere safe!

### Repeat for Production:

Create another user: `whiskeybot-app-prod` with the same permissions (for production/Amplify).

---

## Step 2: Set Up Local Development (.env file)

### Create/Update .env file:

```bash
# In your project root
cp .env.example .env
```

### Edit .env file:

```env
# Environment
VITE_ENVIRONMENT=dev

# AWS Region
VITE_AWS_REGION=us-east-1

# AWS Credentials (from whiskeybot-app-dev user)
VITE_AWS_ACCESS_KEY_ID=<paste-your-dev-access-key-here>
VITE_AWS_SECRET_ACCESS_KEY=<paste-your-dev-secret-key-here>
```

### Restart your dev server:

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## Step 3: Set Up Production (AWS Amplify)

### In AWS Amplify Console:

1. Go to your Amplify app: https://console.aws.amazon.com/amplify/
2. Click on your app
3. Go to **"Environment variables"** (left sidebar)
4. Click **"Manage variables"**
5. Add these variables:

```
VITE_ENVIRONMENT = prod
VITE_AWS_REGION = us-east-1
VITE_AWS_ACCESS_KEY_ID = <your-prod-access-key>
VITE_AWS_SECRET_ACCESS_KEY = <your-prod-secret-key>
```

6. Click **"Save"**
7. Amplify will automatically redeploy with the new variables

---

## Step 4: Test the Connection

### Test Locally:

Add this test code to any component (temporarily):

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

  return <div className="p-4 bg-white rounded">{status}</div>
}
```

Add `<TestDynamoDB />` to a page temporarily to test.

### Test in Production:

After Amplify redeploys, test the same functionality in your production app.

---

## Step 5: Start Using DynamoDB in Your Components

### Example: Save a Warehouse

```javascript
import dynamoDBService from '../services/dynamodb'

async function handleSaveWarehouse(formData) {
  try {
    const warehouseData = {
      id: crypto.randomUUID(), // Generate unique ID
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    await dynamoDBService.putItem('warehouses', warehouseData)
    console.log('Warehouse saved!')
  } catch (error) {
    console.error('Error saving warehouse:', error)
  }
}
```

### Example: Load Warehouses

```javascript
import { useEffect, useState } from 'react'
import dynamoDBService from '../services/dynamodb'

function WarehousesList() {
  const [warehouses, setWarehouses] = useState([])

  useEffect(() => {
    async function loadWarehouses() {
      try {
        const items = await dynamoDBService.scanTable('warehouses')
        setWarehouses(items)
      } catch (error) {
        console.error('Error loading warehouses:', error)
      }
    }
    loadWarehouses()
  }, [])

  return (
    <div>
      {warehouses.map(warehouse => (
        <div key={warehouse.id}>{warehouse.name}</div>
      ))}
    </div>
  )
}
```

---

## Quick Checklist

- [ ] Created IAM user: `whiskeybot-app-dev`
- [ ] Copied Access Key ID and Secret Access Key
- [ ] Created `.env` file with credentials
- [ ] Set `VITE_ENVIRONMENT=dev` in .env
- [ ] Restarted dev server
- [ ] Tested connection locally
- [ ] Created IAM user: `whiskeybot-app-prod` (for production)
- [ ] Added credentials to AWS Amplify environment variables
- [ ] Set `VITE_ENVIRONMENT=prod` in Amplify
- [ ] Tested connection in production

---

## Security Reminders

✅ **Do:**
- Use separate IAM users for dev and prod
- Keep `.env` file local (already in `.gitignore`)
- Rotate access keys every 90 days
- Use least privilege permissions (custom policy if needed)

❌ **Don't:**
- Commit `.env` file to git
- Share access keys in code or chat
- Use root account credentials
- Use the same keys for dev and prod

---

## Troubleshooting

### "Access Denied" Error
- Check IAM user has `AmazonDynamoDBFullAccess` policy
- Verify access keys are correct in `.env`
- Check keys are active in IAM console

### "Table Not Found" Error
- Verify table name (should be base name like `warehouses`, not `dev_warehouses`)
- Check `VITE_ENVIRONMENT` is set correctly
- Verify tables exist in AWS Console

### "Invalid Credentials" Error
- Double-check keys copied correctly (no spaces)
- Verify keys are for the right AWS account
- Restart dev server after changing `.env`

---

## Next Steps

Once connected, you can:
1. Update your `CreateWarehouse.jsx` to actually save to DynamoDB
2. Update list pages to load from DynamoDB
3. Add update/delete functionality
4. Implement real-time data loading

Your app is now ready to use DynamoDB! 🎉

