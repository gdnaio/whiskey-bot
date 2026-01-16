#!/bin/bash

# Create DynamoDB Tables with Hardcoded Credentials
# This script sets credentials as environment variables and creates all tables

set -e

# Set AWS credentials as environment variables
# AWS credentials should be set as environment variables
# Example: export AWS_ACCESS_KEY_ID="your-key" && export AWS_SECRET_ACCESS_KEY="your-secret"
# If not set, the script will use AWS CLI default credentials
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "Warning: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY not set. Using AWS CLI default credentials."
fi
export AWS_DEFAULT_REGION="us-east-1"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

REGION=${AWS_REGION:-us-east-1}

# All tables
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
  if AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
     aws dynamodb describe-table --table-name "$full_table_name" --region "$REGION" > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠ ${full_table_name} already exists${NC}"
    return 0
  fi
  
  echo -e "${BLUE}Creating ${full_table_name}...${NC}"
  
  # Create table
  AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
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
    AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
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
      if AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
         aws dynamodb describe-table --table-name "${env}_${table}" --region "$REGION" > /dev/null 2>&1; then
        ((success_count++))
      else
        ((skip_count++))
      fi
    else
      if AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
         aws dynamodb describe-table --table-name "${env}_${table}" --region "$REGION" > /dev/null 2>&1; then
        ((skip_count++))
      else
        ((fail_count++))
      fi
    fi
    echo ""
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
    echo "Install it: brew install awscli"
    exit 1
  fi
  
  echo -e "${GREEN}✓ AWS CLI found${NC}\n"
  
  # Test credentials
  echo -e "${CYAN}Testing AWS credentials...${NC}"
  if AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
     aws sts get-caller-identity > /dev/null 2>&1; then
    local aws_account=$(AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
                       aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "unknown")
    echo -e "${GREEN}✓ AWS credentials valid${NC}"
    echo -e "${CYAN}  Account: ${aws_account}${NC}\n"
  else
    echo -e "${RED}✗ Error: Invalid AWS credentials${NC}"
    echo "Please check your access keys"
    exit 1
  fi
  
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
  echo "2. Create IAM user for your application (separate from CLI user):"
  echo "   - IAM → Users → Add users"
  echo "   - Name: whiskeybot-app-dev"
  echo "   - Access key type: 'Application running outside AWS'"
  echo "   - Attach: AmazonDynamoDBFullAccess policy"
  echo ""
  echo "3. Add app credentials to .env file (local dev)"
  echo "4. Add app credentials to AWS Amplify (production)"
  echo ""
  echo -e "${GREEN}All done! Your tables are ready to use.${NC}\n"
}

# Run main function
main

