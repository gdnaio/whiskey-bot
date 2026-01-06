import { useState } from 'react'

function FermentationScrapLog() {
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)

  // Fermentation scrap log data from the image
  const scrapLogs = [
    { 
      id: 740, 
      scrapDate: '06-29-2018', 
      cookId: 153670, 
      fermenter: 'F2', 
      gallons: 500.00, 
      notes: 'Wrong date', 
      value: 0.00 
    },
    { 
      id: 184, 
      scrapDate: '01-19-2017', 
      cookId: 90992, 
      fermenter: 'F4', 
      gallons: 500.00, 
      notes: '', 
      value: 0.00 
    }
  ]

  const totalItems = scrapLogs.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = scrapLogs.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const formatNumber = (num) => {
    if (num === '' || num === null || num === undefined) return ''
    return typeof num === 'number' ? num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : num
  }

  const formatCurrency = (num) => {
    if (num === '' || num === null || num === undefined) return '$0.00'
    return typeof num === 'number' ? `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : num
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fermentation scrap log entry?')) {
      console.log('Delete:', id)
      // TODO: Implement delete functionality
    }
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-accent-gold">Fermentation Scrap Log</h1>
        <div className="flex gap-3">
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
        <div className="overflow-x-auto main-content-scrollbar">
          <table className="min-w-full divide-y divide-accent-blue">
            <thead className="bg-primary-DEFAULT">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Commands
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Id
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Scrap Date
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Cook Id
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Fermenter
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Gallons
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Notes
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Value
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light divide-y divide-accent-blue">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-gray-400">
                    No items to display
                  </td>
                </tr>
              ) : (
                currentItems.map((log) => (
                  <tr key={log.id} className="hover:bg-primary-DEFAULT/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      <button
                        onClick={() => handleDelete(log.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.scrapDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.cookId.toLocaleString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 font-medium">{log.fermenter}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.gallons)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.notes || ''}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{formatCurrency(log.value)}</td>
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

          <div className="flex items-center space-x-4 text-gray-300 mb-2 sm:mb-0">
            <div className="flex items-center space-x-2">
              <span>Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-primary-light border border-accent-blue rounded text-gray-900 focus:outline-none focus:border-accent-gold px-2 py-1"
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <span className="font-semibold">
              {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} items
            </span>
          </div>
        </div>
      </div>

      {/* Help Button - Bottom Right */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-gradient-to-br from-primary-dark to-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FermentationScrapLog
