#!/usr/bin/env node

/**
 * Create DynamoDB Tables using AWS SDK
 * CommonJS version - works with any Node.js setup
 */

const { DynamoDBClient, CreateTableCommand, DescribeTableCommand, waitUntilTableExists } = require('@aws-sdk/client-dynamodb');
const { STSClient, GetCallerIdentityCommand } = require('@aws-sdk/client-sts');
const readline = require('readline');

// AWS credentials from environment variables
// Set these before running: export AWS_ACCESS_KEY_ID=your-key && export AWS_SECRET_ACCESS_KEY=your-secret
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

// All tables
const ALL_TABLES = [
  // Core Settings
  'warehouses', 'rackhouses', 'mash_bills', 'internal_spirit_types', 'recipes',
  'product_lines', 'product_masters', 'mixed_product_masters', 'raw_materials',
  'raw_material_bom', 'ttb_material_kinds', 'tanks', 'fermenters', 'whiskey_kinds',
  'base_tax_rates', 'customers', 'vendors', 'contacts', 'dsps', 'owners', 'linked_distilleries',
  // Production
  'fermentation_logs', 'fermentation_cooks', 'fermenter_status', 'fermenter_moves',
  'fermentation_scrap_logs', 'distillation_logs', 'distillation_runs', 'production_reports',
  // Barrels
  'barrels', 'barrel_fill_logs', 'barrel_history', 'onsite_barrels', 'offsite_barrels',
  'barrel_dumps', 'rackhouse_inventory',
  // Starting Inventory
  'starting_raw_materials', 'starting_finished_goods', 'starting_tanks',
  'starting_onsite_barrels', 'starting_offsite_barrels',
];

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// Colors
const colors = {
  reset: '\x1b[0m', red: '\x1b[31m', green: '\x1b[32m',
  yellow: '\x1b[33m', blue: '\x1b[34m', cyan: '\x1b[36m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

// Check if table exists
async function tableExists(tableName) {
  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }));
    return true;
  } catch (error) {
    if (error.name === 'ResourceNotFoundException') return false;
    throw error;
  }
}

// Create a single table
async function createTable(tableName) {
  try {
    if (await tableExists(tableName)) {
      log(`⚠ ${tableName} already exists`, 'yellow');
      return { success: true, skipped: true };
    }

    log(`Creating ${tableName}...`, 'blue');
    await client.send(new CreateTableCommand({
      TableName: tableName,
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      BillingMode: 'PAY_PER_REQUEST',
    }));

    log(`✓ Created ${tableName}`, 'green');
    log(`  Waiting for table to become active...`, 'cyan');
    await waitUntilTableExists({ client, maxWaitTime: 300 }, { TableName: tableName });
    log(`  ✓ ${tableName} is active`, 'green');
    return { success: true, skipped: false };
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      log(`⚠ ${tableName} already exists`, 'yellow');
      return { success: true, skipped: true };
    }
    log(`✗ Failed to create ${tableName}: ${error.message}`, 'red');
    return { success: false, skipped: false };
  }
}

// Create tables for an environment
async function createTablesForEnv(env, tables) {
  log(`\n========================================`, 'yellow');
  log(`Creating ${env.toUpperCase()} Environment Tables`, 'yellow');
  log(`Total: ${tables.length} tables`, 'yellow');
  log(`========================================\n`, 'yellow');

  let successCount = 0, skipCount = 0, failCount = 0;

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const fullTableName = `${env}_${table}`;
    log(`[${i + 1}/${tables.length}] Processing ${table}...`, 'cyan');
    const result = await createTable(fullTableName);
    if (result.success) {
      result.skipped ? skipCount++ : successCount++;
    } else {
      failCount++;
    }
    console.log('');
  }

  log(`========================================`, 'green');
  log(`${env.toUpperCase()} Summary:`, 'green');
  log(`  ✓ Created: ${successCount}`, 'green');
  log(`  ⚠ Skipped: ${skipCount}`, 'yellow');
  log(`  ✗ Failed: ${failCount}`, 'red');
  log(`========================================\n`, 'green');
}

// Test credentials
async function testCredentials() {
  try {
    const stsClient = new STSClient({
      region: AWS_REGION,
      credentials: { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
    });
    const response = await stsClient.send(new GetCallerIdentityCommand({}));
    log(`✓ AWS credentials valid`, 'green');
    log(`  Account: ${response.Account}`, 'cyan');
    log(`  User: ${response.Arn}`, 'cyan');
    return true;
  } catch (error) {
    log(`✗ Invalid credentials: ${error.message}`, 'red');
    return false;
  }
}

// Main
async function main() {
  log(`========================================`, 'blue');
  log(`WhiskeyBot DynamoDB Table Creation`, 'blue');
  log(`========================================`, 'blue');
  log(`Region: ${AWS_REGION}`, 'cyan');
  log(`Total Tables: ${ALL_TABLES.length}`, 'cyan');
  log(`Environments: dev + prod`, 'cyan');
  log(`Total to Create: ${ALL_TABLES.length * 2}`, 'cyan');
  log(`========================================\n`, 'blue');

  log(`Testing AWS credentials...`, 'cyan');
  if (!(await testCredentials())) process.exit(1);
  console.log('');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`This will create ${ALL_TABLES.length * 2} tables (${ALL_TABLES.length} dev + ${ALL_TABLES.length} prod)\nPress Ctrl+C to cancel, or Enter to continue...\n`, async () => {
      rl.close();
      await createTablesForEnv('dev', ALL_TABLES);
      await createTablesForEnv('prod', ALL_TABLES);
      log(`========================================`, 'blue');
      log(`Creation Complete!`, 'blue');
      log(`========================================\n`, 'blue');
      log(`Next steps:`, 'green');
      console.log(`1. Verify: https://console.aws.amazon.com/dynamodb/home?region=${AWS_REGION}#tables:`);
      console.log('2. Create IAM user for your application');
      console.log('3. Add credentials to .env (dev) and Amplify (prod)');
      log(`\nAll done! Tables are ready.`, 'green');
      resolve();
    });
  });
}

main().catch((error) => {
  log(`\n✗ Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});

