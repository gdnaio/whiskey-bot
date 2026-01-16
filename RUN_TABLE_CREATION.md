# Run Table Creation Script

## ✅ Ready to Run!

I've created a Node.js script that bypasses the AWS CLI permission issues and uses the AWS SDK directly with your hardcoded credentials.

## Run This Command:

```bash
node scripts/create-tables-node.js
```

## What It Does:

1. ✅ Tests your AWS credentials
2. ✅ Creates all 41 dev tables (`dev_*`)
3. ✅ Creates all 41 prod tables (`prod_*`)
4. ✅ Total: **82 tables**
5. ✅ Shows progress for each table
6. ✅ Waits for tables to become active
7. ✅ Shows final summary

## Expected Output:

```
========================================
WhiskeyBot DynamoDB Table Creation
========================================
Region: us-east-1
Total Tables: 41
Environments: dev + prod
Total Tables to Create: 82
========================================

Testing AWS credentials...
✓ AWS credentials valid
  Account: 123456789012
  User: arn:aws:iam::123456789012:user/your-user

This will create 82 tables (41 dev + 41 prod)
Press Ctrl+C to cancel, or Enter to continue...

[Creating tables...]
```

## Time Estimate:

- ~2-3 seconds per table
- Total: ~5-10 minutes for all 82 tables

## After It Completes:

1. Verify in AWS Console: https://console.aws.amazon.com/dynamodb/
2. You should see all `dev_*` and `prod_*` tables listed
3. Tables are ready to use!

---

## Alternative: Bash Script (if Node.js doesn't work)

If the Node.js script has issues, you can also try the bash script:

```bash
./scripts/create-tables-with-credentials.sh
```

This uses environment variables with your credentials.

---

## Troubleshooting

### "Cannot find module" error
```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/client-sts
```

### "Access Denied" error
- Check your IAM user has `dynamodb:CreateTable` permission
- Attach `AmazonDynamoDBFullAccess` policy

### Script hangs
- Press Ctrl+C to cancel
- Check AWS Console to see which tables were created
- Re-run script (it will skip existing tables)


