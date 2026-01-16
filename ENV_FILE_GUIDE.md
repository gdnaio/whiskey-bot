# .env File Setup Guide

## Current Status

Your `.env` file is **almost correct**, but you need to use **application access keys** instead of CLI keys.

## What to Change

### ❌ Current Issue:
You're using CLI access keys (`AKIA3IXNILOKNCE2H2X7`). These work, but it's better practice to use separate keys for your application.

### ✅ What You Need:

1. **Create a new IAM user for your application:**
   - IAM → Users → Add users
   - Name: `whiskeybot-app-dev`
   - Access key type: **"Local code"** (what you just selected)
   - Permissions: `AmazonDynamoDBFullAccess`
   - Save the new Access Key ID and Secret Access Key

2. **Update your `.env` file:**
   ```env
   VITE_ENVIRONMENT=dev
   VITE_AWS_REGION=us-east-1
   VITE_AWS_ACCESS_KEY_ID=<new-app-access-key>
   VITE_AWS_SECRET_ACCESS_KEY=<new-app-secret-key>
   ```

## Table Names - You Don't Need Them!

**Important:** You don't need to define table names in `.env`. The DynamoDB service automatically handles this:

- When `VITE_ENVIRONMENT=dev` → uses `dev_*` tables
- When `VITE_ENVIRONMENT=prod` → uses `prod_*` tables

### In Your Code:

Just use the base table name:

```javascript
// This automatically uses dev_warehouses (in dev) or prod_warehouses (in prod)
await dynamoDBService.putItem('warehouses', data)
await dynamoDBService.scanTable('mash_bills')
await dynamoDBService.getItem('barrels', { id: '123' })
```

The service adds the prefix automatically!

## Complete .env File (Minimal)

```env
VITE_ENVIRONMENT=dev
VITE_AWS_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=<your-app-access-key>
VITE_AWS_SECRET_ACCESS_KEY=<your-app-secret-key>
```

That's it! No table names needed.

## Quick Test

After updating `.env` with app credentials:

1. Restart dev server: `npm run dev`
2. Test in browser console or a component:
   ```javascript
   import dynamoDBService from './services/dynamodb'
   
   // Test write
   await dynamoDBService.putItem('warehouses', {
     id: 'test-' + Date.now(),
     name: 'Test Warehouse'
   })
   
   // Test read
   const items = await dynamoDBService.scanTable('warehouses')
   console.log('Found', items.length, 'warehouses')
   ```

## All Available Tables

You can access any of these tables using just the base name:

- `warehouses`, `rackhouses`
- `mash_bills`, `internal_spirit_types`, `recipes`
- `product_lines`, `product_masters`, `mixed_product_masters`
- `raw_materials`, `raw_material_bom`, `ttb_material_kinds`
- `tanks`, `fermenters`
- `whiskey_kinds`, `base_tax_rates`
- `customers`, `vendors`, `contacts`, `dsps`, `owners`, `linked_distilleries`
- `fermentation_logs`, `fermentation_cooks`, `fermenter_status`, `fermenter_moves`, `fermentation_scrap_logs`
- `distillation_logs`, `distillation_runs`, `production_reports`
- `barrels`, `barrel_fill_logs`, `barrel_history`, `onsite_barrels`, `offsite_barrels`, `barrel_dumps`, `rackhouse_inventory`
- `starting_raw_materials`, `starting_finished_goods`, `starting_tanks`, `starting_onsite_barrels`, `starting_offsite_barrels`

Just use the base name - the service handles the prefix!

