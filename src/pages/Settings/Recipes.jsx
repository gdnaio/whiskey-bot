import { useState } from 'react'

function Recipes() {
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)

  const recipes = [
    { id: 1, name: 'Absinthe Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 2, name: 'Agave Spirit Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 3, name: 'Barrel Aged Rum Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 4, name: 'Bourbon Cream Default Recipe', standardBatchSize: 156.40, sortOrder: 1 },
    { id: 5, name: 'Bourbon Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 6, name: 'Costa Gin Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 7, name: 'Cream Base Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 8, name: 'Crosstown Bottle in Bond Rye Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 9, name: 'Crosstown Straight Rye M-1 Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 10, name: 'Danko Rye Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 11, name: 'Hard Seltzer Stono Default Recipe', standardBatchSize: 450.00, sortOrder: 1 },
    { id: 12, name: 'High Rye Bourbon Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 13, name: "Jasper's Bourbon Barrel Gin Default Recipe", standardBatchSize: 1.00, sortOrder: 1 },
    { id: 14, name: "Jasper's Gin Default Recipe", standardBatchSize: 1.00, sortOrder: 1 },
    { id: 15, name: 'Light Whiskey Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 16, name: 'M1 Bourbon Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 17, name: 'M1 C-70 Rye Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 18, name: 'M1 Rye Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 19, name: 'Mocha Cream Default Recipe', standardBatchSize: 167.40, sortOrder: 1 },
    { id: 20, name: 'Peach Cream Default Recipe', standardBatchSize: 297.66, sortOrder: 1 },
    { id: 21, name: 'Pecan Liqueur Default Recipe', standardBatchSize: 0.40, sortOrder: 1 },
    { id: 22, name: 'Reaper Vodka Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 23, name: 'Reapers Temptation Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 24, name: 'Reapers Temptation2 Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 25, name: 'RS Rye Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 26, name: 'Rum Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 27, name: 'Rum Rye Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 28, name: 'Single Malt Whiskey Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 29, name: 'Tolerance Liquor Default Recipe', standardBatchSize: 75.00, sortOrder: 1 },
    { id: 30, name: 'Vodka 190 Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 31, name: 'Vodka Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
    { id: 32, name: 'Wheat Whiskey Default Recipe', standardBatchSize: 1.00, sortOrder: 1 },
  ]

  const totalItems = recipes.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = recipes.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const handleEdit = (id) => {
    console.log('Edit recipe:', id)
    // TODO: Implement edit functionality
  }

  const handleDelete = (id) => {
    console.log('Delete recipe:', id)
    // TODO: Implement delete functionality
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
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent mb-6">
          Recipes
        </h1>
      </div>

      {/* Informational Text */}
      <div className="bg-gradient-to-br from-primary-light via-primary-light to-primary-dark rounded-xl border border-accent-blue/50 p-6 mb-8 shadow-lg">
        <p className="text-gray-300 mb-4 leading-relaxed">
          Recipes are needed for every Internal Spirit Type. Create a new Recipe by Creating a New Internal Spirit Type in Setup.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          If the spirit going into the bottle is just the distilled or aged spirit and water, DO NOT edit the default recipe. If the Internal Spirit Type is created by blending other spirits together with other Blending Ingredients (example, combining CNS with apple flavoring to create Apple Moonshine), Edit the recipe below to add the Standard Batch Size, Other Internal Spirit Types Used in the Batch, and the Standard Proof Gallons used of those Internal Spirit Types to make a Batch.
        </p>
        <p className="text-gray-300 font-semibold leading-relaxed">
          Important Note: Redistilling one spirit to create another spirit (example, Vodka re-distilled into Gin) is NOT managed via a Recipe. Use the New Distillation Run tool for re-distilling spirits.
        </p>
      </div>

      {/* Recipes Table */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 shadow-2xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative overflow-x-auto">
          <table className="min-w-full divide-y divide-accent-blue/30">
            <thead className="bg-gradient-to-r from-primary-dark to-primary-light">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Recipe Name
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Standard Batch Size
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Sort Order
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light/50 divide-y divide-accent-blue/20">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-4 rounded-full bg-accent-gold/10 mb-4">
                        <svg className="w-8 h-8 text-accent-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-lg font-medium">No data available</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-primary-dark/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="text-gray-100 font-medium">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300">{item.standardBatchSize.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-gold/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{item.sortOrder}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(item.id)}
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

export default Recipes
