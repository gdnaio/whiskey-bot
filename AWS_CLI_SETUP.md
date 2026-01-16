# AWS CLI Setup for DynamoDB Table Creation

This guide walks you through setting up AWS CLI and creating DynamoDB tables programmatically.

---

## Step 1: Install AWS CLI

### macOS
```bash
# Using Homebrew (recommended)
brew install awscli

# Or download from AWS
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

### Linux
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Windows
Download and run the MSI installer from: https://aws.amazon.com/cli/

### Verify Installation
```bash
aws --version
# Should output: aws-cli/2.x.x
```

---

## Step 2: Configure AWS Credentials

You have two options:

### Option A: Use Your Root Account (Quick Start)

**⚠️ Not recommended for production, but fine for getting started**

1. Go to AWS Console → Your name (top right) → Security credentials
2. Scroll to "Access keys" → "Create access key"
3. Choose "Command Line Interface (CLI)"
4. Download or copy the Access Key ID and Secret Access Key

Then configure:
```bash
aws configure
```

Enter:
- **AWS Access Key ID**: [paste your key]
- **AWS Secret Access Key**: [paste your secret]
- **Default region name**: `us-east-1` (or your preferred region)
- **Default output format**: `json`

### Option B: Create IAM User (Recommended)

1. **Create IAM User:**
   - Go to IAM → Users → Add users
   - Name: `whiskeybot-admin` (or your choice)
   - Access type: **"Access key - Programmatic access"**
   - Permissions: Attach **"AmazonDynamoDBFullAccess"** policy
   - Create user and **save the credentials**

2. **Configure AWS CLI:**
   ```bash
   aws configure
   ```
   - Use the IAM user's access key and secret key
   - Region: `us-east-1`
   - Output: `json`

3. **Test Configuration:**
   ```bash
   aws sts get-caller-identity
   ```
   Should return your user ARN.

---

## Step 3: Create Tables Using Scripts

### Quick Start: Essential Tables (10 tables)

```bash
# Create dev and prod tables (20 total)
./scripts/create-dynamodb-tables.sh all

# Or create only dev tables
./scripts/create-dynamodb-tables.sh dev

# Or create only prod tables
./scripts/create-dynamodb-tables.sh prod
```

### Full Setup: All Tables (40+ tables)

```bash
# Create all dev and prod tables (80+ total)
./scripts/create-all-tables.sh all
```

### What the Scripts Do

1. **Check AWS CLI is installed**
2. **Verify credentials are configured**
3. **Create tables** with:
   - Partition key: `id` (String)
   - Billing mode: **On-demand** (pay per request, free tier eligible)
   - Region: From your AWS config or `us-east-1` default
4. **Wait for tables to become active**
5. **Report success/failure** for each table

---

## Step 4: Verify Tables Were Created

### Using AWS CLI
```bash
# List all tables
aws dynamodb list-tables --region us-east-1

# Describe a specific table
aws dynamodb describe-table --table-name dev_warehouses --region us-east-1
```

### Using AWS Console
1. Go to [DynamoDB Console](https://console.aws.amazon.com/dynamodb/)
2. Click "Tables" in the left sidebar
3. You should see all your tables listed

---

## Step 5: Set Up Application Credentials

After tables are created, you still need to set up credentials for your **application** (separate from CLI credentials).

### For Local Development

1. Create IAM user for application:
   - IAM → Users → Add users
   - Name: `whiskeybot-dev`
   - Attach: `AmazonDynamoDBFullAccess` (or custom policy)
   - Save credentials

2. Add to `.env` file:
   ```env
   VITE_AWS_ACCESS_KEY_ID=<dev-access-key>
   VITE_AWS_SECRET_ACCESS_KEY=<dev-secret-key>
   VITE_AWS_REGION=us-east-1
   VITE_ENVIRONMENT=dev
   ```

### For Production (AWS Amplify)

1. Create IAM user for production:
   - IAM → Users → Add users
   - Name: `whiskeybot-prod`
   - Attach: `AmazonDynamoDBFullAccess` (or custom policy)
   - Save credentials

2. Add to Amplify environment variables:
   - Amplify Console → Your App → Environment variables
   - Add:
     ```
     VITE_ENVIRONMENT=prod
     VITE_AWS_REGION=us-east-1
     VITE_AWS_ACCESS_KEY_ID=<prod-access-key>
     VITE_AWS_SECRET_ACCESS_KEY=<prod-secret-key>
     ```

---

## Troubleshooting

### "AWS CLI not found"
- Install AWS CLI (see Step 1)
- Verify with: `aws --version`

### "Unable to locate credentials"
- Run: `aws configure`
- Enter your access key and secret key
- Test with: `aws sts get-caller-identity`

### "Access Denied" when creating tables
- Your IAM user needs `dynamodb:CreateTable` permission
- Attach `AmazonDynamoDBFullAccess` policy to your IAM user

### "Table already exists"
- Script will skip existing tables and continue
- This is normal if you run the script multiple times

### "Region mismatch"
- Set region: `export AWS_REGION=us-east-1`
- Or use: `aws configure` and set default region

### Script permission denied
```bash
chmod +x scripts/create-dynamodb-tables.sh
chmod +x scripts/create-all-tables.sh
```

---

## Manual Table Creation (Alternative)

If you prefer to create tables manually via CLI:

```bash
# Single table example
aws dynamodb create-table \
  --table-name dev_warehouses \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1

# Wait for table to be active
aws dynamodb wait table-exists \
  --table-name dev_warehouses \
  --region us-east-1
```

---

## Next Steps

1. ✅ Tables created
2. ✅ Verify in AWS Console
3. ✅ Set up IAM user for application
4. ✅ Add credentials to `.env` (local) and Amplify (prod)
5. ✅ Test connection in your app

See `DYNAMODB_QUICK_START.md` for testing the connection!

