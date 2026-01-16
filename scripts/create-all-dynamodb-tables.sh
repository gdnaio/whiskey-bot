#!/bin/bash

# Create ALL DynamoDB Tables for WhiskeyBot Application
# Creates both dev and prod versions of all 40+ tables
#
# Usage:
#   ./scripts/create-all-dynamodb-tables.sh
#
# Prerequisites:
#   1. AWS CLI installed and configured (aws configure)
#   2. IAM user with DynamoDB permissions
#   3. AWS credentials configured

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Default region
REGION=${AWS_REGION:-us-east-1}

# All tables organized by category
declare -a CORE_SETTINGS=(
  "warehouses"
  "rackhouses"
  "mash_bills"
  "internal_spirit_types"
  "recipes"
  "product_lines"
  "product_masters"
  "mixed_product_masters"
  "raw_materials"
  "raw_material_bom"
  "ttb_material_kinds"
  "tanks"
  "fermenters"
  "whiskey_kinds"
  "base_tax_rates"
  "customers"
  "vendors"
  "contacts"
  "dsps"
  "owners"
  "linked_distilleries"
)

declare -a PRODUCTION=(
  "fermentation_logs"
  "fermentation_cooks"
  "fermenter_status"
  "fermenter_moves"
  "fermentation_scrap_logs"
  "distillation_logs"
  "distillation_runs"
  "production_reports"
)

declare -a BARRELS=(
  "barrels"
  "barrel_fill_logs"
  "barrel_history"
  "onsite_barrels"
  "offsite_barrels"
  "barrel_dumps"
  "rackhouse_inventory"
)

declare -a STARTING_INVENTORY=(
  "starting_raw_materials"
  "starting_finished_goods"
  "starting_tanks"
  "starting_onsite_barrels"
  "starting_offsite_barrels"
)

# Combine all tables
ALL_TABLES=(
  "${CORE_SETTINGS[@]}"
  "${PRODUCTION[@]}"
  "${BARRELS[@]}"
  "${STARTING_INVENTORY[@]}"
)

# Function to create a single table
create_table() {
  local table_name=$1
  local env=$2
  
  local full_table_name="${env}_${table_name}"
  
  # Check if table already exists
  if aws dynamodb describe-table --table-name "$full_table_name" --region "$REGION" > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠ ${full_table_name} already exists${NC}"
    return 0
  fi
  
  echo -e "${BLUE}Creating ${full_table_name}...${NC}"
  
  # Create table
  aws dynamodb create-table \
    --table-name "$full_table_name" \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region "$REGION" \
    --no-cli-pager \
    > /dev/null 2>&1
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Created ${full_table_name}${NC}"
    
    # Wait for table to be active
    echo -e "${CYAN}  Waiting for table to become active...${NC}"
    aws dynamodb wait table-exists \
      --table-name "$full_table_name" \
      --region "$REGION" \
      > /dev/null 2>&1
    
    echo -e "${GREEN}  ✓ ${full_table_name} is active${NC}"
    return 0
  else
    echo -e "${RED}✗ Failed to create ${full_table_name}${NC}"
    return 1
  fi
}

# Function to create tables for an environment
create_tables_for_env() {
  local env=$1
  shift
  local tables=("$@")
  
  echo -e "\n${YELLOW}========================================${NC}"
  echo -e "${YELLOW}Creating ${env^^} Environment Tables${NC}"
  echo -e "${YELLOW}Total: ${#tables[@]} tables${NC}"
  echo -e "${YELLOW}========================================${NC}\n"
  
  local success_count=0
  local skip_count=0
  local fail_count=0
  local total=${#tables[@]}
  local current=0
  
  for table in "${tables[@]}"; do
    ((current++))
    echo -e "${CYAN}[${current}/${total}]${NC} Processing ${table}..."
    
    if create_table "$table" "$env"; then
      if aws dynamodb describe-table --table-name "${env}_${table}" --region "$REGION" > /dev/null 2>&1; then
        if [ $skip_count -eq 0 ] || [ $((current - 1)) -gt $skip_count ]; then
          ((success_count++))
        else
          ((skip_count++))
        fi
      else
        ((success_count++))
      fi
    else
      if aws dynamodb describe-table --table-name "${env}_${table}" --region "$REGION" > /dev/null 2>&1; then
        ((skip_count++))
      else
        ((fail_count++))
      fi
    fi
    echo ""  # Blank line for readability
  done
  
  echo -e "${GREEN}========================================${NC}"
  echo -e "${GREEN}${env^^} Environment Summary:${NC}"
  echo -e "${GREEN}  ✓ Created: ${success_count}${NC}"
  echo -e "${YELLOW}  ⚠ Skipped (exists): ${skip_count}${NC}"
  echo -e "${RED}  ✗ Failed: ${fail_count}${NC}"
  echo -e "${GREEN}========================================${NC}\n"
}

# Main execution
main() {
  echo -e "${BLUE}========================================${NC}"
  echo -e "${BLUE}WhiskeyBot DynamoDB Table Creation${NC}"
  echo -e "${BLUE}========================================${NC}"
  echo -e "${CYAN}Region: ${REGION}${NC}"
  echo -e "${CYAN}Total Tables: ${#ALL_TABLES[@]}${NC}"
  echo -e "${CYAN}Environments: dev + prod${NC}"
  echo -e "${CYAN}Total Tables to Create: $((${#ALL_TABLES[@]} * 2))${NC}"
  echo -e "${BLUE}========================================${NC}\n"
  
  # Check AWS CLI
  if ! command -v aws &> /dev/null; then
    echo -e "${RED}✗ Error: AWS CLI is not installed${NC}"
    echo "Install it from: https://aws.amazon.com/cli/"
    echo "Or on macOS: brew install awscli"
    exit 1
  fi
  
  echo -e "${GREEN}✓ AWS CLI found: $(aws --version)${NC}\n"
  
  # Check AWS credentials
  echo -e "${CYAN}Checking AWS credentials...${NC}"
  if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo -e "${RED}✗ Error: AWS credentials not configured${NC}"
    echo "Run: aws configure"
    echo "Enter your Access Key ID, Secret Access Key, and Region"
    exit 1
  fi
  
  local aws_account=$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "unknown")
  local aws_user=$(aws sts get-caller-identity --query Arn --output text 2>/dev/null || echo "unknown")
  
  echo -e "${GREEN}✓ AWS credentials valid${NC}"
  echo -e "${CYAN}  Account: ${aws_account}${NC}"
  echo -e "${CYAN}  User: ${aws_user}${NC}\n"
  
  # Confirm before proceeding
  echo -e "${YELLOW}This will create $((${#ALL_TABLES[@]} * 2)) tables (${#ALL_TABLES[@]} dev + ${#ALL_TABLES[@]} prod)${NC}"
  echo -e "${YELLOW}Press Ctrl+C to cancel, or Enter to continue...${NC}"
  read -r
  
  # Create dev tables
  create_tables_for_env "dev" "${ALL_TABLES[@]}"
  
  # Create prod tables
  create_tables_for_env "prod" "${ALL_TABLES[@]}"
  
  # Final summary
  echo -e "${BLUE}========================================${NC}"
  echo -e "${BLUE}Creation Complete!${NC}"
  echo -e "${BLUE}========================================${NC}\n"
  
  echo -e "${GREEN}Next steps:${NC}"
  echo "1. Verify tables in AWS Console:"
  echo "   https://console.aws.amazon.com/dynamodb/home?region=${REGION}#tables:"
  echo ""
  echo "2. Create IAM user for your application:"
  echo "   - IAM → Users → Add users"
  echo "   - Name: whiskeybot-app-dev (and whiskeybot-app-prod)"
  echo "   - Access key type: 'Application running outside AWS'"
  echo "   - Attach: AmazonDynamoDBFullAccess policy"
  echo ""
  echo "3. Add credentials to .env file (local dev):"
  echo "   VITE_ENVIRONMENT=dev"
  echo "   VITE_AWS_REGION=${REGION}"
  echo "   VITE_AWS_ACCESS_KEY_ID=<your-dev-key>"
  echo "   VITE_AWS_SECRET_ACCESS_KEY=<your-dev-secret>"
  echo ""
  echo "4. Add credentials to AWS Amplify (production):"
  echo "   - Amplify Console → Environment variables"
  echo "   - Add the same variables with VITE_ENVIRONMENT=prod"
  echo ""
  echo -e "${GREEN}All done! Your tables are ready to use.${NC}\n"
}

# Run main function
main

