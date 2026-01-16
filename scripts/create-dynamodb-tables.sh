#!/bin/bash

# DynamoDB Table Creation Script
# Creates both dev and prod tables for WhiskeyBot application
#
# Usage:
#   ./scripts/create-dynamodb-tables.sh [dev|prod|all]
#
# Prerequisites:
#   1. AWS CLI installed and configured
#   2. AWS credentials configured (aws configure)
#   3. Appropriate IAM permissions for DynamoDB

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default region (can be overridden with AWS_REGION env var)
REGION=${AWS_REGION:-us-east-1}

# Get environment argument
ENV_ARG=${1:-all}

# Essential tables (recommended to start with)
ESSENTIAL_TABLES=(
  "warehouses"
  "mash_bills"
  "internal_spirit_types"
  "raw_materials"
  "fermentation_logs"
  "distillation_logs"
  "barrels"
  "tanks"
  "customers"
  "vendors"
)

# All tables (complete list)
ALL_TABLES=(
  # Core Settings
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
  # Production
  "fermentation_logs"
  "fermentation_cooks"
  "fermenter_status"
  "fermenter_moves"
  "fermentation_scrap_logs"
  "distillation_logs"
  "distillation_runs"
  # Barrels
  "barrels"
  "barrel_fill_logs"
  "barrel_history"
  "onsite_barrels"
  "offsite_barrels"
  "barrel_dumps"
  "rackhouse_inventory"
  # Starting Inventory
  "starting_raw_materials"
  "starting_finished_goods"
  "starting_tanks"
  "starting_onsite_barrels"
  "starting_offsite_barrels"
)

# Function to create a single table
create_table() {
  local table_name=$1
  local env=$2
  
  echo -e "${BLUE}Creating ${env}_${table_name}...${NC}"
  
  aws dynamodb create-table \
    --table-name "${env}_${table_name}" \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region "$REGION" \
    --no-cli-pager \
    > /dev/null 2>&1
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Created ${env}_${table_name}${NC}"
  else
    # Check if table already exists
    if aws dynamodb describe-table --table-name "${env}_${table_name}" --region "$REGION" > /dev/null 2>&1; then
      echo -e "${YELLOW}⚠ ${env}_${table_name} already exists${NC}"
    else
      echo -e "${RED}✗ Failed to create ${env}_${table_name}${NC}"
      return 1
    fi
  fi
  
  # Wait for table to be active
  echo -e "${BLUE}  Waiting for table to become active...${NC}"
  aws dynamodb wait table-exists \
    --table-name "${env}_${table_name}" \
    --region "$REGION" \
    > /dev/null 2>&1
  
  echo -e "${GREEN}  ✓ ${env}_${table_name} is active${NC}"
}

# Function to create tables for an environment
create_tables_for_env() {
  local env=$1
  local tables=("${@:2}")
  
  echo -e "\n${YELLOW}========================================${NC}"
  echo -e "${YELLOW}Creating ${env^^} tables${NC}"
  echo -e "${YELLOW}========================================${NC}\n"
  
  local success_count=0
  local skip_count=0
  local fail_count=0
  
  for table in "${tables[@]}"; do
    if create_table "$table" "$env"; then
      ((success_count++))
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
  echo -e "${GREEN}${env^^} Summary:${NC}"
  echo -e "${GREEN}  Created: ${success_count}${NC}"
  echo -e "${YELLOW}  Skipped (exists): ${skip_count}${NC}"
  echo -e "${RED}  Failed: ${fail_count}${NC}"
  echo -e "${GREEN}========================================${NC}\n"
}

# Main execution
main() {
  echo -e "${BLUE}========================================${NC}"
  echo -e "${BLUE}DynamoDB Table Creation Script${NC}"
  echo -e "${BLUE}Region: ${REGION}${NC}"
  echo -e "${BLUE}========================================${NC}\n"
  
  # Check AWS CLI
  if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed${NC}"
    echo "Install it from: https://aws.amazon.com/cli/"
    exit 1
  fi
  
  # Check AWS credentials
  if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo -e "${RED}Error: AWS credentials not configured${NC}"
    echo "Run: aws configure"
    exit 1
  fi
  
  # Determine which tables to create
  case "$ENV_ARG" in
    dev)
      create_tables_for_env "dev" "${ESSENTIAL_TABLES[@]}"
      ;;
    prod)
      create_tables_for_env "prod" "${ESSENTIAL_TABLES[@]}"
      ;;
    all|*)
      # Create essential tables for both environments
      create_tables_for_env "dev" "${ESSENTIAL_TABLES[@]}"
      create_tables_for_env "prod" "${ESSENTIAL_TABLES[@]}"
      ;;
  esac
  
  echo -e "${GREEN}========================================${NC}"
  echo -e "${GREEN}All done!${NC}"
  echo -e "${GREEN}========================================${NC}\n"
  
  echo -e "${BLUE}Next steps:${NC}"
  echo "1. Verify tables in AWS Console: https://console.aws.amazon.com/dynamodb/"
  echo "2. Set up IAM user and access keys for your application"
  echo "3. Add credentials to .env file for local development"
  echo "4. Add credentials to AWS Amplify environment variables for production"
}

# Run main function
main

