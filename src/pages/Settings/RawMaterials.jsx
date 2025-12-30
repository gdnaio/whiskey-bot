import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SettingsRawMaterials() {
  const navigate = useNavigate()
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)
  
  const rawMaterials = [
    { id: 1, name: '375 ml bottle white', description: 'White Bottle', unitOfMeas: 'Ea', materialClass: 'Packaging', ttbMaterial: '', vendors: '', hide: false },
    { id: 2, name: '750 mL bottle White', description: 'White Bottle', unitOfMeas: 'Ea', materialClass: 'Packaging', ttbMaterial: '', vendors: 'Default Vendor', hide: false },
    { id: 3, name: 'Angelica Root', description: 'Botanical', unitOfMeas: 'g', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 4, name: 'Anise Seed', description: 'Botanical', unitOfMeas: 'g', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: 'NA', hide: false },
    { id: 5, name: 'Blue Agave', description: '', unitOfMeas: '', materialClass: 'Fermentable', ttbMaterial: 'Blue Agave', vendors: 'International Molasses', hide: false },
    { id: 6, name: 'Caramel Coloring', description: '', unitOfMeas: '', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 7, name: 'Carbon Dioxide for Carbonation (lbs)', description: '', unitOfMeas: '', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 8, name: 'Chocolate Extract', description: '', unitOfMeas: '', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 9, name: 'Cinnamon Chips', description: 'Botanical', unitOfMeas: '', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: 'Default Vendor', hide: false },
    { id: 10, name: 'Cold Brew Coffee', description: '', unitOfMeas: '', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 11, name: 'Coriander', description: 'Botanical', unitOfMeas: 'g', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 12, name: 'Corn', description: 'Yellow Field Corn #2', unitOfMeas: '', materialClass: 'Fermentable', ttbMaterial: 'Corn', vendors: 'Default Vendor', hide: false },
    { id: 13, name: 'Danko Rye', description: 'Pennsylvania Rye', unitOfMeas: '', materialClass: 'Fermentable', ttbMaterial: 'Rye', vendors: '', hide: false },
    { id: 14, name: 'Distillers Malt', description: 'Distillers Malt', unitOfMeas: '', materialClass: 'Fermentable', ttbMaterial: 'Malt', vendors: '', hide: false },
    { id: 15, name: 'Enzyme', description: 'Seb-Star', unitOfMeas: 'mL', materialClass: 'Fermentation_S...', ttbMaterial: '', vendors: 'Default Vendor', hide: false },
    { id: 16, name: 'Enzyme', description: 'Seb-Amal', unitOfMeas: 'mL', materialClass: 'Fermentation_S...', ttbMaterial: '', vendors: 'Default Vendor', hide: false },
    { id: 17, name: 'Fennel', description: 'Fennel', unitOfMeas: 'g', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 18, name: 'Ginger Root', description: 'Botanical', unitOfMeas: '', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: 'Default Vendor', hide: false },
    { id: 19, name: 'Hyssop', description: 'Hyssop', unitOfMeas: 'g', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 20, name: 'Italian Juniper', description: 'Botanical', unitOfMeas: '', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 21, name: 'Lemon Balm', description: 'Lemon Balm', unitOfMeas: '', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 22, name: 'Lime Peel', description: 'Botanical', unitOfMeas: '', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 23, name: 'Molasses', description: '', unitOfMeas: '', materialClass: 'Fermentable', ttbMaterial: 'Molasses', vendors: '', hide: false },
    { id: 24, name: 'New 30 G', description: '', unitOfMeas: '', materialClass: 'Barrel', ttbMaterial: '', vendors: '', hide: false },
    { id: 25, name: 'New 53 #3 char Barrel', description: 'New 53 gallon #3 char barrel', unitOfMeas: '', materialClass: 'Barrel', ttbMaterial: '', vendors: 'Independent Stave', hide: false },
    { id: 26, name: 'New 53 #4 char Barrel', description: 'New 53 gallon #4 char barrel', unitOfMeas: '', materialClass: 'Barrel', ttbMaterial: '', vendors: 'Independent Stave', hide: false },
    { id: 27, name: 'New 53 G', description: '', unitOfMeas: '', materialClass: 'Barrel', ttbMaterial: '', vendors: 'Default Vendor', hide: false },
    { id: 28, name: 'Ocean Spray Diet Cran-Mango (gal)', description: '', unitOfMeas: '', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
    { id: 29, name: 'Orange Peel', description: 'Botanical', unitOfMeas: '', materialClass: 'Blending_Ingred...', ttbMaterial: '', vendors: '', hide: false },
  ]

  const totalItems = rawMaterials.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = rawMaterials.slice(startIndex, endIndex)

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
    console.log('Edit raw material:', id)
    // TODO: Implement edit functionality
  }

  const handleBOM = (id) => {
    const material = rawMaterials.find(item => item.id === id)
    navigate('/settings/raw-material-bom', { state: { rawMaterial: material } })
  }

  const handleDelete = (id) => {
    console.log('Delete raw material:', id)
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
            Raw Materials
          </h1>
          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-xl hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/30 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              ADD NEW RAW MATERIAL
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
                    Name
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
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
                    Description
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Unit of Meas.
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Material Class
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    TTB Material...
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-accent-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors group">
                  <div className="flex items-center gap-2">
                    Vendors
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
                  <td colSpan="9" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-4 rounded-full bg-accent-gold/10 mb-4">
                        <svg className="w-8 h-8 text-accent-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-lg font-medium">No items to display</p>
                      <p className="text-gray-500 text-sm mt-1">Add your first raw material to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-primary-dark/50 transition-colors duration-200">
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
                          onClick={() => handleBOM(item.id)}
                          className="text-accent-gold hover:text-accent-gold-light transition-colors duration-200 font-medium"
                        >
                          BOM Materials
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
                      <div className="text-gray-300">{item.hide ? 'true' : 'false'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{item.description || '—'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{item.unitOfMeas || '—'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{item.materialClass || '—'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{item.ttbMaterial || '—'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{item.vendors || '—'}</div>
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

export default SettingsRawMaterials
