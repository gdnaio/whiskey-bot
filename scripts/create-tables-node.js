#!/usr/bin/env node

/**
 * Create DynamoDB Tables using AWS SDK (bypasses AWS CLI)
 * This script creates all tables for WhiskeyBot application
 */

// Use dynamic import for ES modules compatibility
let DynamoDBClient, CreateTableCommand, DescribeTableCommand, waitUntilTableExists;
let STSClient, GetCallerIdentityCommand;
let readline;

// Load modules
(async () => {
  const dynamodb = await import('@aws-sdk/client-dynamodb');
  const sts = await import('@aws-sdk/client-sts');
  const readlineModule = await import('readline');
  
  DynamoDBClient = dynamodb.DynamoDBClient;
  CreateTableCommand = dynamodb.CreateTableCommand;
  DescribeTableCommand = dynamodb.DescribeTableCommand;
  waitUntilTableExists = dynamodb.waitUntilTableExists;
  
  STSClient = sts.STSClient;
  GetCallerIdentityCommand = sts.GetCallerIdentityCommand;
  
  readline = readlineModule.default;
  
  // Run main after modules are loaded
  main().catch((error) => {
    log(`\n✗ Fatal error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  });
})();

// Hardcoded credentials (as requested)
// AWS credentials from environment variables
// Set these before running: export AWS_ACCESS_KEY_ID=your-key && export AWS_SECRET_ACCESS_KEY=your-secret
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
const AWS_REGION = 'us-east-1';

// All tables
const ALL_TABLES = [
  // Core Settings
  'warehouses',
  'rackhouses',
  'mash_bills',
  'internal_spirit_types',
  'recipes',
  'product_lines',
  'product_masters',
  'mixed_product_masters',
  'raw_materials',
  'raw_material_bom',
  'ttb_material_kinds',
  'tanks',
  'fermenters',
  'whiskey_kinds',
  'base_tax_rates',
  'customers',
  'vendors',
  'contacts',
  'dsps',
  'owners',
  'linked_distilleries',
  // Production
  'fermentation_logs',
  'fermentation_cooks',
  'fermenter_status',
  'fermenter_moves',
  'fermentation_scrap_logs',
  'distillation_logs',
  'distillation_runs',
  'production_reports',
  // Barrels
  'barrels',
  'barrel_fill_logs',
  'barrel_history',
  'onsite_barrels',
  'offsite_barrels',
  'barrel_dumps',
  'rackhouse_inventory',
  // Starting Inventory
  'starting_raw_materials',
  'starting_finished_goods',
  'starting_tanks',
  'starting_onsite_barrels',
  'starting_offsite_barrels',
];

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Check if table exists
async function tableExists(tableName) {
  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }));
    return true;
  } catch (error) {
    if (error.name === 'ResourceNotFoundException') {
      return false;
    }
    throw error;
  }
}

// Create a single table
async function createTable(tableName) {
  try {
    // Check if table already exists
    if (await tableExists(tableName)) {
      log(`⚠ ${tableName} already exists`, 'yellow');
      return { success: true, skipped: true };
    }

    log(`Creating ${tableName}...`, 'blue');

    const command = new CreateTableCommand({
      TableName: tableName,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    });

    await client.send(command);

    log(`✓ Created ${tableName}`, 'green');
    log(`  Waiting for table to become active...`, 'cyan');

    // Wait for table to be active
    await waitUntilTableExists(
      { client, maxWaitTime: 300 },
      { TableName: tableName }
    );

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

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const fullTableName = `${env}_${table}`;
    
    log(`[${i + 1}/${tables.length}] Processing ${table}...`, 'cyan');
    
    const result = await createTable(fullTableName);
    
    if (result.success) {
      if (result.skipped) {
        skipCount++;
      } else {
        successCount++;
      }
    } else {
      failCount++;
    }
    
    console.log(''); // Blank line
  }

  log(`========================================`, 'green');
  log(`${env.toUpperCase()} Environment Summary:`, 'green');
  log(`  ✓ Created: ${successCount}`, 'green');
  log(`  ⚠ Skipped (exists): ${skipCount}`, 'yellow');
  log(`  ✗ Failed: ${failCount}`, 'red');
  log(`========================================\n`, 'green');
}

// Test credentials
async function testCredentials() {
  try {
    const stsClient = new STSClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
    
    const response = await stsClient.send(new GetCallerIdentityCommand({}));
    log(`✓ AWS credentials valid`, 'green');
    log(`  Account: ${response.Account}`, 'cyan');
    log(`  User: ${response.Arn}`, 'cyan');
    return true;
  } catch (error) {
    log(`✗ Error: Invalid AWS credentials`, 'red');
    log(`  ${error.message}`, 'red');
    return false;
  }
}

// Main execution
async function main() {
  log(`========================================`, 'blue');
  log(`WhiskeyBot DynamoDB Table Creation`, 'blue');
  log(`========================================`, 'blue');
  log(`Region: ${AWS_REGION}`, 'cyan');
  log(`Total Tables: ${ALL_TABLES.length}`, 'cyan');
  log(`Environments: dev + prod`, 'cyan');
  log(`Total Tables to Create: ${ALL_TABLES.length * 2}`, 'cyan');
  log(`========================================\n`, 'blue');

  // Test credentials
  log(`Testing AWS credentials...`, 'cyan');
  const credentialsValid = await testCredentials();
  
  if (!credentialsValid) {
    process.exit(1);
  }
  
  console.log('');

  // Confirm before proceeding
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      `This will create ${ALL_TABLES.length * 2} tables (${ALL_TABLES.length} dev + ${ALL_TABLES.length} prod)\nPress Ctrl+C to cancel, or Enter to continue...\n`,
      async () => {
        rl.close();

        // Create dev tables
        await createTablesForEnv('dev', ALL_TABLES);

        // Create prod tables
        await createTablesForEnv('prod', ALL_TABLES);

        // Final summary
        log(`========================================`, 'blue');
        log(`Creation Complete!`, 'blue');
        log(`========================================\n`, 'blue');

        log(`Next steps:`, 'green');
        console.log('1. Verify tables in AWS Console:');
        console.log(`   https://console.aws.amazon.com/dynamodb/home?region=${AWS_REGION}#tables:`);
        console.log('');
        console.log('2. Create IAM user for your application (separate from CLI user)');
        console.log('3. Add app credentials to .env file (local dev)');
        console.log('4. Add app credentials to AWS Amplify (production)');
        console.log('');
        log(`All done! Your tables are ready to use.`, 'green');
        console.log('');

        resolve();
      }
    );
  });
}

// Main function is called after modules load (see top of file)

