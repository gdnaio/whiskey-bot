# Quick Fix for AWS CLI Issues

## Your Current Situation

1. ✅ AWS CLI is installed
2. ✅ Credentials file exists at `~/.aws/credentials`
3. ❌ Permission error on AWS CLI
4. ❌ Invalid security token (credentials are wrong/expired)

## Quick Fix Steps

### Step 1: Fix Permissions

Run this command (you'll need your Mac password):

```bash
sudo chown -R $(whoami) /usr/local/aws-cli
sudo chmod -R 755 /usr/local/aws-cli
```

**OR** reinstall AWS CLI cleanly:

```bash
brew install awscli
```

### Step 2: Update Your Credentials

You have old/invalid credentials. You need to update them with your new CLI access keys.

#### Option A: Use `aws configure` (Easiest)

```bash
aws configure
```

Enter:
1. **AWS Access Key ID**: Your new CLI access key (starts with `AKIA...`)
2. **AWS Secret Access Key**: Your new secret key
3. **Default region**: `us-east-1`
4. **Default output format**: `json`

#### Option B: Edit File Manually

```bash
nano ~/.aws/credentials
```

Replace the content with:

```ini
[default]
aws_access_key_id = YOUR_NEW_ACCESS_KEY_ID_HERE
aws_secret_access_key = YOUR_NEW_SECRET_ACCESS_KEY_HERE
```

Save: `Ctrl+X`, then `Y`, then `Enter`

### Step 3: Test It Works

```bash
aws sts get-caller-identity
```

You should see your AWS account info. If you do, you're ready!

### Step 4: Run Table Creation Script

```bash
./scripts/create-all-dynamodb-tables.sh
```

---

## Where to Get Your Access Keys

1. Go to: **AWS Console** → **IAM** → **Users**
2. Click on your user (or create new one)
3. **Security credentials** tab
4. **Access keys** section → **Create access key**
5. Choose: **"Command Line Interface (CLI)"**
6. Copy both keys immediately (secret key only shown once!)

---

## Still Having Issues?

### If permission error persists:

```bash
# Reinstall AWS CLI
brew uninstall awscli
brew install awscli
```

### If "InvalidClientTokenId" persists:

1. Double-check you copied the keys correctly (no spaces)
2. Make sure keys are for the right AWS account
3. Verify keys are active in IAM console
4. Try creating brand new access keys

### Test credentials file:

```bash
# Check file exists and has correct format
cat ~/.aws/credentials

# Should show:
# [default]
# aws_access_key_id = AKIA...
# aws_secret_access_key = ...
```

---

## Quick Test Script

I've created a fix script you can run:

```bash
chmod +x scripts/fix-aws-cli.sh
./scripts/fix-aws-cli.sh
```

This will:
- Fix permissions
- Test AWS CLI
- Test credentials
- Tell you what to do next


