#!/bin/bash

# Create ALL DynamoDB Tables (Complete List)
# This creates all 40+ tables for the full application
#
# Usage:
#   ./scripts/create-all-tables.sh [dev|prod|all]

set -e

REGION=${AWS_REGION:-us-east-1}
ENV_ARG=${1:-all}

# Source the main script functions
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

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

# Import functions from main script
source "${SCRIPT_DIR}/create-dynamodb-tables.sh" 2>/dev/null || {
  # If sourcing fails, define function inline
  create_table() {
    local table_name=$1
    local env=$2
    
    echo "Creating ${env}_${table_name}..."
    
    aws dynamodb create-table \
      --table-name "${env}_${table_name}" \
      --attribute-definitions AttributeName=id,AttributeType=S \
      --key-schema AttributeName=id,KeyType=HASH \
      --billing-mode PAY_PER_REQUEST \
      --region "$REGION" \
      --no-cli-pager \
      > /dev/null 2>&1 || {
        if aws dynamodb describe-table --table-name "${env}_${table_name}" --region "$REGION" > /dev/null 2>&1; then
          echo "⚠ ${env}_${table_name} already exists"
        else
          echo "✗ Failed to create ${env}_${table_name}"
          return 1
        fi
      }
    
    aws dynamodb wait table-exists \
      --table-name "${env}_${table_name}" \
      --region "$REGION" \
      > /dev/null 2>&1
    
    echo "✓ ${env}_${table_name} is active"
  }
  
  create_tables_for_env() {
    local env=$1
    shift
    local tables=("$@")
    
    echo "========================================"
    echo "Creating ${env^^} tables (${#tables[@]} tables)"
    echo "========================================"
    
    for table in "${tables[@]}"; do
      create_table "$table" "$env"
      echo ""
    done
  }
}

# Main execution
case "$ENV_ARG" in
  dev)
    create_tables_for_env "dev" "${ALL_TABLES[@]}"
    ;;
  prod)
    create_tables_for_env "prod" "${ALL_TABLES[@]}"
    ;;
  all|*)
    create_tables_for_env "dev" "${ALL_TABLES[@]}"
    create_tables_for_env "prod" "${ALL_TABLES[@]}"
    ;;
esac

echo "========================================"
echo "All tables created!"
echo "========================================"


