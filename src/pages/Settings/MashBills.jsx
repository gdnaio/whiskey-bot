import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import dynamoDBService from '../../services/dynamodb'
import useUserId from '../../hooks/useUserId'

function MashBills() {
  const navigate = useNavigate()
  const userId = useUserId()
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)
  const [mashBills, setMashBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load mash bills from DynamoDB
  useEffect(() => {
    loadMashBills()
  }, [])

  const loadMashBills = async () => {
    if (!userId) {
      setError('You must be signed in to load mash bills.')
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      setError(null)
      const items = await dynamoDBService.scanTable('mash_bills', userId)
      // Sort by sortOrder, then by name
      items.sort((a, b) => {
        const orderA = a.sortOrder || 999
        const orderB = b.sortOrder || 999
        if (orderA !== orderB) return orderA - orderB
        return (a.mashBillName || '').localeCompare(b.mashBillName || '')
      })
      setMashBills(items)
    } catch (err) {
      console.error('Error loading mash bills:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!userId) {
      alert('You must be signed in to delete mash bills.')
      return
    }
    if (!window.confirm('Are you sure you want to delete this mash bill?')) {
      return
    }
    try {
      await dynamoDBService.deleteItem('mash_bills', { id }, userId)
      loadMashBills()
    } catch (err) {
      console.error('Error deleting mash bill:', err)
      alert(`Failed to delete mash bill: ${err.message}`)
    }
  }

  const totalItems = mashBills.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = mashBills.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const handleEdit = (mashBill) => {
    navigate('/settings/new-mash-bill', { state: { edit: mashBill } })
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-accent-gold to-transparent"></div>
          <span className="text-accent-gold/80 text-sm font-semibold uppercase tracking-wider">
            Settings
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent">
            Mash Bills
          </h1>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => navigate('/settings/new-mash-bill')}
              className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              ADD NEW MASH BILL
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2">
              GRID ACTIONS
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2">
              EXPORT
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 shadow-2xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative overflow-x-auto">
          <table className="min-w-full divide-y divide-accent-blue/30">
            <thead className="bg-gradient-to-r from-primary-dark to-primary-light">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Commands
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Mash Bill
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Total Vol (Gal)
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Internal Spir...
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    PG Yield
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    PG Hearts Yi...
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light/50 divide-y divide-accent-blue/20">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-400">Loading mash bills...</div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-red-400">Error: {error}</div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-4 rounded-full bg-accent-gold/10 mb-4">
                        <svg className="w-8 h-8 text-accent-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-lg font-medium">No mash bills found. Create your first mash bill!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-primary-dark/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-accent-gold hover:text-accent-gold-light transition-colors duration-200 font-medium"
                        >
                          Edit
                        </button>
                        <span className="text-gray-500">|</span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-100 font-medium">{item.mashBillName || 'Unnamed Mash Bill'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">
                        {item.batchSize ? item.batchSize.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{item.internalSpiritTypeID || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{item.pgYield.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{item.pgHeartsYield.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gradient-to-r from-primary-dark to-primary-light border-t border-accent-blue/50">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-gradient-to-br from-accent-blue to-accent-blue-light text-gray-300 hover:from-accent-blue-light hover:to-accent-blue disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:hover:shadow-md"
            >
              ««
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-gradient-to-br from-accent-blue to-accent-blue-light text-gray-300 hover:from-accent-blue-light hover:to-accent-blue disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:hover:shadow-md"
            >
              «
            </button>
            <span className="text-gray-300 px-4">
              Page{' '}
              <input
                type="number"
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                min="1"
                max={totalPages || 1}
                className="w-14 text-center bg-primary-light border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 py-1"
              />{' '}
              of <span className="font-semibold text-accent-gold">{totalPages || 1}</span>
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-gradient-to-br from-accent-blue to-accent-blue-light text-gray-300 hover:from-accent-blue-light hover:to-accent-blue disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:hover:shadow-md"
            >
              »
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-gradient-to-br from-accent-blue to-accent-blue-light text-gray-300 hover:from-accent-blue-light hover:to-accent-blue disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:hover:shadow-md"
            >
              »»
            </button>
          </div>

          <div className="flex items-center gap-3 text-gray-300 mb-4 sm:mb-0">
            <span className="text-sm">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-primary-light border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 py-1.5 px-3 cursor-pointer"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <div className="text-gray-300 mb-4 sm:mb-0">
            {totalItems === 0 ? (
              '0 - 0 of 0 items'
            ) : (
              <span>
                <span className="font-semibold text-accent-gold">{startIndex + 1}</span> - <span className="font-semibold text-accent-gold">{Math.min(endIndex, totalItems)}</span> of <span className="font-semibold text-accent-gold">{totalItems}</span> items
              </span>
            )}
          </div>

          <button className="px-4 py-2 rounded-lg bg-gradient-to-br from-accent-blue to-accent-blue-light text-gray-300 hover:from-accent-blue-light hover:to-accent-blue transition-all duration-200 font-medium shadow-md hover:shadow-lg">
            Help
          </button>
        </div>

        {/* Footer Status Messages */}
        <div className="mt-8 pt-6 border-t border-accent-blue/50 flex flex-wrap gap-6 text-sm px-6 pb-6 bg-gradient-to-r from-primary-dark to-primary-light">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-gray-400">Locked due to incomplete prerequisites.</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-gray-400">Open for editing and not populated.</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-400">Open for editing but populated.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MashBills
