import { useState, useEffect } from 'react'
import dynamoDBService from '../services/dynamodb'
import useUserId from '../hooks/useUserId'

function TestDynamoDB() {
  const userId = useUserId()
  const [status, setStatus] = useState('Testing connection...')
  const [testResult, setTestResult] = useState(null)
  const [warehouses, setWarehouses] = useState([])
  const [loading, setLoading] = useState(false)

  // Test connection on mount
  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    if (!userId) {
      setStatus('❌ You must be signed in to test DynamoDB connection')
      setTestResult({
        success: false,
        message: 'Authentication required'
      })
      return
    }
    try {
      setStatus('Testing AWS credentials...')
      
      // Test 1: Write a test item
      const testId = 'test-' + Date.now()
      const testData = {
        id: testId,
        name: 'Test Warehouse - ' + new Date().toLocaleTimeString(),
        createdAt: new Date().toISOString(),
        test: true
      }
      
      setStatus('Writing test item to DynamoDB...')
      await dynamoDBService.putItem('warehouses', testData, userId)
      
      // Test 2: Read it back
      setStatus('Reading test item from DynamoDB...')
      const retrieved = await dynamoDBService.getItem('warehouses', { id: testId }, userId)
      
      if (retrieved && retrieved.id === testId) {
        setStatus('✅ Connection successful!')
        setTestResult({
          success: true,
          message: 'Successfully wrote and read from DynamoDB',
          testItem: retrieved
        })
      } else {
        setStatus('⚠️ Connection works but item not found')
        setTestResult({
          success: false,
          message: 'Write succeeded but read failed'
        })
      }
    } catch (error) {
      setStatus('❌ Connection failed')
      setTestResult({
        success: false,
        message: error.message,
        error: error
      })
      console.error('DynamoDB Test Error:', error)
    }
  }

  const loadWarehouses = async () => {
    if (!userId) {
      setStatus('❌ You must be signed in to load warehouses')
      return
    }
    try {
      setLoading(true)
      setStatus('Loading warehouses from DynamoDB...')
      const items = await dynamoDBService.scanTable('warehouses', userId)
      setWarehouses(items)
      setStatus(`✅ Loaded ${items.length} warehouse(s)`)
      setLoading(false)
    } catch (error) {
      setStatus(`❌ Error loading warehouses: ${error.message}`)
      setLoading(false)
      console.error('Error:', error)
    }
  }

  const deleteTestItem = async (id) => {
    if (!userId) {
      setStatus('❌ You must be signed in to delete items')
      return
    }
    try {
      await dynamoDBService.deleteItem('warehouses', { id }, userId)
      setStatus(`✅ Deleted test item: ${id}`)
      loadWarehouses() // Reload list
    } catch (error) {
      setStatus(`❌ Error deleting: ${error.message}`)
      console.error('Error:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-accent-gold mb-2">DynamoDB Connection Test</h1>
        <p className="text-gray-400">Verify your app is connected to DynamoDB</p>
      </div>

      {/* Connection Status */}
      <div className="bg-primary-light rounded-lg border border-accent-blue shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Connection Status</h2>
        <div className="mb-4">
          <p className={`text-lg font-semibold ${
            status.includes('✅') ? 'text-green-400' : 
            status.includes('❌') ? 'text-red-400' : 
            'text-yellow-400'
          }`}>
            {status}
          </p>
        </div>

        {testResult && (
          <div className={`p-4 rounded-lg ${
            testResult.success ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'
          }`}>
            <p className="text-white font-medium mb-2">{testResult.message}</p>
            {testResult.error && (
              <pre className="text-red-300 text-sm mt-2 overflow-auto">
                {JSON.stringify(testResult.error, null, 2)}
              </pre>
            )}
            {testResult.testItem && (
              <div className="mt-4">
                <p className="text-gray-300 text-sm mb-2">Test Item Created:</p>
                <pre className="text-gray-200 text-xs bg-primary-dark p-3 rounded overflow-auto">
                  {JSON.stringify(testResult.testItem, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex gap-3">
          <button
            onClick={testConnection}
            className="px-4 py-2 bg-accent-blue text-white rounded hover:bg-accent-blue-light transition-colors"
          >
            Test Again
          </button>
          <button
            onClick={loadWarehouses}
            disabled={loading}
            className="px-4 py-2 bg-accent-gold text-primary-dark rounded hover:bg-accent-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load All Warehouses'}
          </button>
        </div>
      </div>

      {/* Environment Info */}
      <div className="bg-primary-light rounded-lg border border-accent-blue shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Environment Info</h2>
        <div className="space-y-2 text-gray-300">
          <p><span className="font-semibold">Environment:</span> {import.meta.env.VITE_ENVIRONMENT || 'not set'}</p>
          <p><span className="font-semibold">AWS Region:</span> {import.meta.env.VITE_AWS_REGION || 'not set'}</p>
          <p><span className="font-semibold">Access Key ID:</span> {import.meta.env.VITE_AWS_ACCESS_KEY_ID ? import.meta.env.VITE_AWS_ACCESS_KEY_ID.substring(0, 8) + '...' : 'not set'}</p>
          <p><span className="font-semibold">Table Prefix:</span> {import.meta.env.VITE_ENVIRONMENT === 'prod' ? 'prod_' : 'dev_'}</p>
          <p><span className="font-semibold">Using Table:</span> {(import.meta.env.VITE_ENVIRONMENT === 'prod' ? 'prod_' : 'dev_') + 'warehouses'}</p>
        </div>
      </div>

      {/* Warehouses List */}
      {warehouses.length > 0 && (
        <div className="bg-primary-light rounded-lg border border-accent-blue shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Warehouses in DynamoDB ({warehouses.length})
          </h2>
          <div className="space-y-3">
            {warehouses.map((warehouse) => (
              <div
                key={warehouse.id}
                className="bg-primary-dark rounded-lg p-4 border border-accent-blue/50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{warehouse.name || 'Unnamed Warehouse'}</h3>
                    <p className="text-gray-400 text-sm">ID: {warehouse.id}</p>
                    {warehouse.createdAt && (
                      <p className="text-gray-500 text-xs">Created: {new Date(warehouse.createdAt).toLocaleString()}</p>
                    )}
                    {warehouse.test && (
                      <span className="inline-block mt-2 px-2 py-1 bg-yellow-900 text-yellow-200 text-xs rounded">
                        Test Item
                      </span>
                    )}
                  </div>
                  {warehouse.test && (
                    <button
                      onClick={() => deleteTestItem(warehouse.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                    >
                      Delete Test
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TestDynamoDB


