# AWS Credentials Setup Guide

## Issue 1: Permission Denied Error

The permission error suggests AWS CLI might have installation issues. Let's fix it:

### Option A: Reinstall AWS CLI (Recommended)

```bash
# Remove old installation
sudo rm -rf /usr/local/aws-cli
sudo rm -rf /usr/local/bin/aws
sudo rm -rf /usr/local/bin/aws_completer

# Install using Homebrew (cleanest method)
brew install awscli

# Verify installation
aws --version
```

### Option B: Fix Permissions

```bash
# Fix permissions on AWS CLI directory
sudo chown -R $(whoami) /usr/local/aws-cli
sudo chmod -R 755 /usr/local/aws-cli
```

---

## Issue 2: Invalid Security Token

This means your credentials aren't configured correctly. Here's how to fix it:

### Step 1: Get Your Access Keys

1. Go to **AWS Console** → **IAM** → **Users**
2. Click on your user (or create a new one)
3. Go to **"Security credentials"** tab
4. Scroll to **"Access keys"** section
5. Click **"Create access key"**
6. Choose **"Command Line Interface (CLI)"** as the use case
7. **IMPORTANT**: Copy both:
   - **Access Key ID** (starts with `AKIA...`)
   - **Secret Access Key** (long string - you can only see it once!)

### Step 2: Configure AWS CLI

Run this command:

```bash
aws configure
```

You'll be prompted for 4 things:

1. **AWS Access Key ID**: Paste your Access Key ID
   ```
   AKIAIOSFODNN7EXAMPLE
   ```

2. **AWS Secret Access Key**: Paste your Secret Access Key
   ```
   wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   ```

3. **Default region name**: Enter your region
   ```
   us-east-1
   ```
   (or `us-west-2`, `eu-west-1`, etc.)

4. **Default output format**: Enter
   ```
   json
   ```

### Step 3: Verify Configuration

Test that it works:

```bash
aws sts get-caller-identity
```

You should see output like:
```json
{
    "UserId": "AIDAEXAMPLE",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/your-username"
}
```

If you see this, you're all set! ✅

---

## Alternative: Manual Credential File Setup

If `aws configure` doesn't work, you can create the files manually:

### Create credentials file:

```bash
mkdir -p ~/.aws
nano ~/.aws/credentials
```

Add this content (replace with your actual keys):

```ini
[default]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

Save and exit (Ctrl+X, then Y, then Enter)

### Create config file:

```bash
nano ~/.aws/config
```

Add this content:

```ini
[default]
region = us-east-1
output = json
```

Save and exit.

### Set proper permissions:

```bash
chmod 600 ~/.aws/credentials
chmod 600 ~/.aws/config
```

### Test again:

```bash
aws sts get-caller-identity
```

---

## Troubleshooting

### "InvalidClientTokenId" Error

**Causes:**
- Wrong Access Key ID
- Wrong Secret Access Key
- Keys copied with extra spaces
- Keys are for a different AWS account

**Solutions:**
1. Double-check you copied the keys correctly (no spaces)
2. Make sure you're using the right keys for the right AWS account
3. Try creating new access keys
4. Verify the keys are active in IAM console

### "Access Denied" Error

**Causes:**
- IAM user doesn't have permissions
- Access keys are disabled

**Solutions:**
1. Check IAM user has `dynamodb:*` permissions
2. Attach `AmazonDynamoDBFullAccess` policy to your IAM user
3. Verify access keys are active in IAM console

### Permission Denied on AWS CLI

**Causes:**
- AWS CLI installed incorrectly
- Permission issues with installation directory

**Solutions:**
1. Reinstall AWS CLI using Homebrew: `brew install awscli`
2. Or use the official AWS installer
3. Check file permissions: `ls -la /usr/local/aws-cli`

---

## Quick Checklist

- [ ] AWS CLI installed (`aws --version` works)
- [ ] IAM user created with access keys
- [ ] Access keys copied (Access Key ID + Secret Access Key)
- [ ] Ran `aws configure` and entered all 4 values
- [ ] Tested with `aws sts get-caller-identity` (should show your account info)
- [ ] Ready to run table creation script!

---

## Next Steps

Once `aws sts get-caller-identity` works:

```bash
# Run the table creation script
./scripts/create-all-dynamodb-tables.sh
```

The script will:
- Verify your credentials
- Show your AWS account info
- Create all 82 tables (41 dev + 41 prod)


