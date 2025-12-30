import { useState } from 'react'

function ProductMasters() {
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)

  const productMasters = [
    { id: 1, name: 'Absinthe', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Absinthe Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 109.0 },
    { id: 2, name: 'aged rum', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Rum Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 104.6 },
    { id: 3, name: 'Barrel Aged Rum', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Barrel Aged Rum Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 80.0 },
    { id: 4, name: 'Barrel Proof Bourbon', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Bourbon Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 131.1 },
    { id: 5, name: 'Barrel Proof Bourbon', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Bourbon Default Recipe', btlSize: '375 mL', btlPerCS: 24, proof: 122.0 },
    { id: 6, name: 'Barrel Proof Bourbon', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Bourbon Default Recipe', btlSize: '750 mL', btlPerCS: 6, proof: 123.9 },
    { id: 7, name: 'Blue 80', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Bourbon Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 118.4 },
    { id: 8, name: 'Bourbon', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Bourbon Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 127.0 },
    { id: 9, name: 'Bourbon', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Bourbon Default Recipe', btlSize: '375 mL', btlPerCS: 24, proof: 119.1 },
    { id: 10, name: 'Bourbon Cream', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Bourbon Cream Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 114.7 },
    { id: 11, name: 'Costa Gin', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Costa Gin Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 120.7 },
    { id: 12, name: 'Crosstown Bottle in Bond Rye', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Crosstown Bottle In Bond Rye Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 115.9 },
    { id: 13, name: 'Hard Seltzer Stono', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Hard Seltzer Stono Default Recipe', btlSize: '355 mL', btlPerCS: 24, proof: 94.0 },
    { id: 14, name: 'Holy Spirit', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Vodka 190 Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 34.0 },
    { id: 15, name: "Jasper's Bourbon Barrel Gin", standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: "Jasper's Bourbon Barrel Gin Default Recipe", btlSize: '750 mL', btlPerCS: 12, proof: 100.0 },
    { id: 16, name: "Jasper's Gin", standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: "Jasper's Gin Default Recipe", btlSize: '750 mL', btlPerCS: 12, proof: 10.0 },
    { id: 17, name: 'Light Whiskey', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Light Whiskey Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 190.0 },
    { id: 18, name: 'M1 Bourbon', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'M1 Bourbon Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 109.0 },
    { id: 19, name: 'M1 C-70 Rye', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'M1 C-70 Rye Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 104.6 },
    { id: 20, name: 'M1 Rye', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'M1 Rye Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 80.0 },
    { id: 21, name: 'Mocha Cream', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Mocha Cream Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 131.1 },
    { id: 22, name: 'Peach Cream', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Peach Cream Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 122.0 },
    { id: 23, name: 'Pecan Liqueur', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Pecan Liqueur Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 123.9 },
    { id: 24, name: 'Reaper Vodka', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Reaper Vodka Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 118.4 },
    { id: 25, name: 'RS Rye', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'RS Rye Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 127.0 },
    { id: 26, name: 'Rum', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Rum Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 119.1 },
    { id: 27, name: 'Single Malt Whiskey', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Single Malt Whiskey Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 114.7 },
    { id: 28, name: 'Tolerance Liquor', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Tolerance Liquor Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 120.7 },
    { id: 29, name: 'Wheat Whiskey', standardFOB: 0.000000, standardCost: '', hide: false, sortOrder: 1, recipe: 'Wheat Whiskey Default Recipe', btlSize: '750 mL', btlPerCS: 12, proof: 115.9 },
  ]

  const totalItems = productMasters.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = productMasters.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const handleAddPackaging = (id) => {
    console.log('Add packaging for product master:', id)
    // TODO: Implement add packaging functionality
  }

  const handleEdit = (id) => {
    console.log('Edit product master:', id)
    // TODO: Implement edit functionality
  }

  const handleCopy = (id) => {
    console.log('Copy product master:', id)
    // TODO: Implement copy functionality
  }

  const handleManageTaxRates = (id) => {
    console.log('Manage tax rates for product master:', id)
    // TODO: Implement manage tax rates functionality
  }

  const handleDelete = (id) => {
    console.log('Delete product master:', id)
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent">
            Product Masters
          </h1>
          <button className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="px-4 py-2 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg">
          Save Layout
        </button>
        <button className="px-4 py-2 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg">
          Reset Grid
        </button>
        <button className="px-4 py-2 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg">
          Export to Excel
        </button>
        <button className="px-4 py-2 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg">
          Export to PDF
        </button>
        <button className="px-4 py-2 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg">
          Cancel Changes
        </button>
        <button className="px-4 py-2 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg">
          Save Changes
        </button>
      </div>

      {/* Grouping Instruction */}
      <div className="bg-gradient-to-br from-primary-light via-primary-light to-primary-dark rounded-xl border border-accent-blue/50 p-4 mb-6 shadow-md">
        <p className="text-gray-300 text-sm">
          Drag a column header and drop it here to group by that column
        </p>
      </div>

      {/* Data Table */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 shadow-2xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative overflow-x-auto">
          <table className="min-w-full divide-y divide-accent-blue/30">
            <thead className="bg-gradient-to-r from-primary-dark to-primary-light">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Img
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Commands
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Name
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Standard FOB $/CS
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Standard Cost $/CS
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Hide?
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
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Recipe
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Btl Size
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Btl/CS
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Proof
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light/50 divide-y divide-accent-blue/20">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="11" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-4 rounded-full bg-accent-gold/10 mb-4">
                        <svg className="w-8 h-8 text-accent-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-lg font-medium">No items to display</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-primary-dark/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-8 h-8 bg-accent-blue/20 rounded flex items-center justify-center">
                        <svg className="w-5 h-5 text-accent-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <button
                          onClick={() => handleAddPackaging(item.id)}
                          className="text-accent-gold hover:text-accent-gold-light transition-colors duration-200 font-medium"
                        >
                          Add Packaging
                        </button>
                        <span className="text-gray-500">|</span>
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="text-accent-gold hover:text-accent-gold-light transition-colors duration-200 font-medium"
                        >
                          Edit
                        </button>
                        <span className="text-gray-500">|</span>
                        <button
                          onClick={() => handleCopy(item.id)}
                          className="text-accent-gold hover:text-accent-gold-light transition-colors duration-200 font-medium"
                        >
                          Copy
                        </button>
                        <span className="text-gray-500">|</span>
                        <button
                          onClick={() => handleManageTaxRates(item.id)}
                          className="text-accent-gold hover:text-accent-gold-light transition-colors duration-200 font-medium"
                        >
                          Manage Tax Rates
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
                      <div className="text-gray-100 font-medium">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{item.standardFOB.toFixed(6)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{item.standardCost || '—'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={item.hide}
                        readOnly
                        className="w-4 h-4 rounded border-accent-blue/50 bg-primary-dark text-accent-gold focus:ring-accent-gold/20"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{item.sortOrder}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{item.recipe}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{item.btlSize}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{item.btlPerCS}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{item.proof.toFixed(1)}</div>
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
      </div>
    </div>
  )
}

export default ProductMasters
