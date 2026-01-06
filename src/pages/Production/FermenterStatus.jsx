import { useState } from 'react'

function FermenterStatus() {
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)

  // Fermenter status data from the image
  const fermenters = [
    { id: 1, fermenter: 'F1', currentMashBill: 'Empty', fillGal: 0.00, cookNo: '', internalLotName: '', totalDays: 0.00, cookDate: '12-31-0000 7:03:58 PM', totalHours: 0.0, appAtte: '', totalValue: '' },
    { id: 2, fermenter: 'F2', currentMashBill: 'Empty', fillGal: 0.00, cookNo: '', internalLotName: '', totalDays: 0.00, cookDate: '12-31-0000 7:03:58 PM', totalHours: 0.0, appAtte: '', totalValue: '' },
    { id: 3, fermenter: 'F3', currentMashBill: 'Empty', fillGal: 0.00, cookNo: '', internalLotName: '', totalDays: 0.00, cookDate: '12-31-0000 7:03:58 PM', totalHours: 0.0, appAtte: '', totalValue: '' },
    { id: 4, fermenter: 'F4', currentMashBill: 'Empty', fillGal: 0.00, cookNo: '', internalLotName: '', totalDays: 0.00, cookDate: '12-31-0000 7:03:58 PM', totalHours: 0.0, appAtte: '', totalValue: '' },
    { id: 5, fermenter: 'F5', currentMashBill: 'Empty', fillGal: 0.00, cookNo: '', internalLotName: '', totalDays: 0.00, cookDate: '12-31-0000 7:03:58 PM', totalHours: 0.0, appAtte: '', totalValue: '' },
    { id: 6, fermenter: 'F6', currentMashBill: 'Empty', fillGal: 0.00, cookNo: '', internalLotName: '', totalDays: 0.00, cookDate: '12-31-0000 7:03:58 PM', totalHours: 0.0, appAtte: '', totalValue: '' },
  ]

  const totalItems = fermenters.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = fermenters.slice(startIndex, endIndex)

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
    if (num === '' || num === null || num === undefined) return ''
    return typeof num === 'number' ? `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : num
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-accent-gold">Fermenter Status</h1>
          <button className="px-4 py-2 bg-primary-DEFAULT border border-accent-blue text-gray-300 rounded hover:bg-primary-light transition-smooth font-medium">
            TILE VIEW...
          </button>
        </div>
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
                    Fermenter N...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Current Mash Bill
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Fill (Gal)
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Cook No.
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Internal Lot Na...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Total Days
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Cook Date
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Total Hours
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    App. Atte...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Total Value
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light divide-y divide-accent-blue">
              {currentItems.map((fermenter) => (
                <tr key={fermenter.id} className="hover:bg-primary-DEFAULT/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {/* Commands column - empty for now */}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 font-medium">{fermenter.fermenter}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{fermenter.currentMashBill}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(fermenter.fillGal)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{fermenter.cookNo || ''}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{fermenter.internalLotName || ''}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(fermenter.totalDays)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{fermenter.cookDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(fermenter.totalHours)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{fermenter.appAtte || ''}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{fermenter.totalValue || ''}</td>
                </tr>
              ))}
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
              {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
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

export default FermenterStatus
