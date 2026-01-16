import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import dynamoDBService from '../../services/dynamodb'

function Warehouses() {
  const navigate = useNavigate()
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)
  const [warehouses, setWarehouses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load warehouses from DynamoDB
  useEffect(() => {
    loadWarehouses()
  }, [])

  const loadWarehouses = async () => {
    try {
      setLoading(true)
      setError(null)
      const items = await dynamoDBService.scanTable('warehouses')
      // Sort by sortOrder, then by name
      items.sort((a, b) => {
        const orderA = a.sortOrder || 999
        const orderB = b.sortOrder || 999
        if (orderA !== orderB) return orderA - orderB
        return (a.name || '').localeCompare(b.name || '')
      })
      setWarehouses(items)
    } catch (err) {
      console.error('Error loading warehouses:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this warehouse?')) {
      return
    }
    try {
      await dynamoDBService.deleteItem('warehouses', { id })
      // Reload warehouses
      loadWarehouses()
    } catch (err) {
      console.error('Error deleting warehouse:', err)
      alert(`Failed to delete warehouse: ${err.message}`)
    }
  }

  const totalItems = warehouses.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = warehouses.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-accent-gold">Warehouses</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/settings/create-warehouse')}
            className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            ADD NEW WAREHOUSE
          </button>
          <button className="px-4 py-2 bg-primary-DEFAULT border border-accent-blue text-gray-300 rounded hover:bg-primary-light transition-smooth font-medium">
            GRID ACTIONS...
            <svg className="inline-block ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-4 py-2 bg-primary-DEFAULT border border-accent-blue text-gray-300 rounded hover:bg-primary-light transition-smooth font-medium">
            EXPORT...
            <svg className="inline-block ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-primary-light rounded-lg border border-accent-blue shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-accent-blue">
            <thead className="bg-primary-DEFAULT">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Comman...
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Name
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Tax Paid
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Hide?!
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light divide-y divide-accent-blue">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-400">
                    Loading warehouses...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-red-400">
                    Error: {error}
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-400">
                    No warehouses found. Create your first warehouse!
                  </td>
                </tr>
              ) : (
                currentItems.map((warehouse) => (
                  <tr key={warehouse.id} className="hover:bg-primary-DEFAULT/50 transition-colors">
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/settings/create-warehouse`, { state: { edit: warehouse } })}
                          className="text-accent-blue hover:text-accent-gold transition-colors"
                        >
                          Edit
                        </button>
                        <span className="text-gray-500">|</span>
                        <button
                          onClick={() => handleDelete(warehouse.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-300 font-medium">
                      {warehouse.name || 'Unnamed Warehouse'}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-300">
                      {warehouse.taxPaid ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-300">
                      {warehouse.hide ? 'Yes' : 'No'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-primary-DEFAULT border-t border-accent-blue">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-accent-blue text-gray-300 hover:bg-accent-blue-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              ««
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-accent-blue text-gray-300 hover:bg-accent-blue-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              «
            </button>
            <span className="text-gray-300">
              Page{' '}
              <input
                type="number"
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="w-12 text-center bg-primary-light border border-accent-blue rounded text-gray-900 focus:outline-none focus:border-accent-gold"
              />{' '}
              of {totalPages || 1}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-accent-blue text-gray-300 hover:bg-accent-blue-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              »
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-accent-blue text-gray-300 hover:bg-accent-blue-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              »»
            </button>
          </div>

          <div className="flex items-center space-x-2 text-gray-300 mb-2 sm:mb-0">
            <span>Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-primary-light border border-accent-blue rounded text-gray-900 focus:outline-none focus:border-accent-gold"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="ml-4">
              {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Warehouses
