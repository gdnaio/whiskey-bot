#!/bin/bash

# Fix AWS CLI Permission Issues and Update Credentials
# Run this script to fix common AWS CLI issues

echo "=========================================="
echo "AWS CLI Fix Script"
echo "=========================================="
echo ""

# Step 1: Fix permissions (requires sudo password)
echo "Step 1: Fixing AWS CLI permissions..."
echo "You'll be prompted for your Mac password"
sudo chown -R $(whoami) /usr/local/aws-cli
sudo chmod -R 755 /usr/local/aws-cli

if [ $? -eq 0 ]; then
    echo "✓ Permissions fixed"
else
    echo "⚠ Could not fix permissions automatically"
    echo "You may need to reinstall AWS CLI: brew install awscli"
fi

echo ""
echo "Step 2: Testing AWS CLI..."
if aws --version > /dev/null 2>&1; then
    echo "✓ AWS CLI is working"
    aws --version
else
    echo "✗ AWS CLI still has issues"
    echo "Try reinstalling: brew install awscli"
    exit 1
fi

echo ""
echo "Step 3: Testing credentials..."
if aws sts get-caller-identity > /dev/null 2>&1; then
    echo "✓ Credentials are valid"
    aws sts get-caller-identity
else
    echo "✗ Credentials are invalid or missing"
    echo ""
    echo "You need to update your credentials:"
    echo "1. Get new access keys from AWS Console → IAM → Users"
    echo "2. Run: aws configure"
    echo "   Or edit: ~/.aws/credentials"
fi

echo ""
echo "=========================================="
echo "Done!"
echo "=========================================="


