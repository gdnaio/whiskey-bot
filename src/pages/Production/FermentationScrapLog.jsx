function FermentationScrapLog() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-accent-gold mb-6">Fermentation Scrap Log</h1>
      
      <div className="bg-primary-light rounded-lg border border-accent-blue overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent-blue">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-accent-gold">
                  Commands
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-accent-gold cursor-pointer hover:text-accent-gold-light">
                  Id <span className="text-xs">↓</span>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-accent-gold cursor-pointer hover:text-accent-gold-light">
                  Scrap Date
                  <svg className="inline-block ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-accent-gold cursor-pointer hover:text-accent-gold-light">
                  Cook Id
                  <svg className="inline-block ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-accent-gold cursor-pointer hover:text-accent-gold-light">
                  Fermenter
                  <svg className="inline-block ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-accent-gold cursor-pointer hover:text-accent-gold-light">
                  Gallons
                  <svg className="inline-block ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-accent-gold cursor-pointer hover:text-accent-gold-light">
                  Notes
                  <svg className="inline-block ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-accent-gold cursor-pointer hover:text-accent-gold-light">
                  Value
                  <svg className="inline-block ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent-blue">
              {/* Empty state - no data rows */}
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-400">
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-primary-DEFAULT border-t border-accent-blue px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 rounded text-gray-300 hover:bg-primary-light hover:text-accent-gold transition-smooth disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                &lt;&lt;
              </button>
              <button className="px-2 py-1 rounded text-gray-300 hover:bg-primary-light hover:text-accent-gold transition-smooth disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                &lt;
              </button>
              <input 
                type="text" 
                value="1" 
                readOnly
                className="w-12 px-2 py-1 text-center bg-primary-light border border-accent-blue rounded text-gray-300 focus:outline-none focus:border-accent-gold"
              />
              <button className="px-2 py-1 rounded text-gray-300 hover:bg-primary-light hover:text-accent-gold transition-smooth disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                &gt;
              </button>
              <button className="px-2 py-1 rounded text-gray-300 hover:bg-primary-light hover:text-accent-gold transition-smooth disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                &gt;&gt;
              </button>
            </div>
            
            <span className="text-gray-400 text-sm">Page 1 of 1</span>
            
            {/* Items per page */}
            <select className="px-2 py-1 bg-primary-light border border-accent-blue rounded text-gray-300 text-sm focus:outline-none focus:border-accent-gold">
              <option value="50">50 items per page</option>
              <option value="25">25 items per page</option>
              <option value="100">100 items per page</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">0 - 0 of 0 items</span>
            <button className="px-4 py-2 bg-accent-gold text-primary-dark rounded hover:bg-accent-gold-light transition-smooth font-medium">
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FermentationScrapLog
