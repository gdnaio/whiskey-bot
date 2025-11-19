import { useState } from 'react'

function SettingsRawMaterials() {
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)
  
  const [rawMaterials] = useState([
    { id: 1, name: '375 ml bottle white', hide: false, description: 'White Bottle', unit: 'Ea', materialClass: 'Packaging', ttbMaterial: 'NA', vend: 'NA' },
    { id: 2, name: '750 ml bottle White', hide: false, description: 'White Bottle', unit: 'Ea', materialClass: 'Packaging', ttbMaterial: 'NA', vend: 'Defau' },
    { id: 3, name: 'Angelica Root', hide: false, description: 'Botanical', unit: 'g', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 4, name: 'Anise Seed', hide: false, description: 'Botanical', unit: 'g', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 5, name: 'Blue Agave', hide: false, description: 'Blue Agave', unit: 'Lbs', materialClass: 'Fermentable', ttbMaterial: 'Blue Agave', vend: 'Interr' },
    { id: 6, name: 'Caramel Coloring', hide: false, description: '', unit: 'Lbs', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 7, name: 'Carbon Dioxide for Carbonation (lbs)', hide: false, description: '', unit: 'Lbs', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 8, name: 'Chocolate Extract', hide: false, description: '', unit: 'Lbs', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 9, name: 'Cinnamon Chips', hide: false, description: 'Botanical', unit: 'Lbs', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'Defau' },
    { id: 10, name: 'Cold Brew Coffee', hide: false, description: '', unit: 'Lbs', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 11, name: 'Coriander', hide: false, description: 'Botanical', unit: 'g', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 12, name: 'Corn', hide: false, description: 'Yellow Field Corn #2', unit: 'Lbs', materialClass: 'Fermentable', ttbMaterial: 'Corn', vend: 'Defau' },
    { id: 13, name: 'Danko Rye', hide: false, description: 'Pennsylvania Rye', unit: 'Lbs', materialClass: 'Fermentable', ttbMaterial: 'Rye', vend: 'NA' },
    { id: 14, name: 'Distillers Malt', hide: false, description: 'Distillers Malt', unit: 'Lbs', materialClass: 'Fermentable', ttbMaterial: 'Malt', vend: 'NA' },
    { id: 15, name: 'Enzyme', hide: false, description: 'Seb-Star', unit: 'mL', materialClass: 'Fermentation_S...', ttbMaterial: 'NA', vend: 'Defau' },
    { id: 16, name: 'Enzyme', hide: false, description: 'Seb-Amal', unit: 'mL', materialClass: 'Fermentation_S...', ttbMaterial: 'NA', vend: 'Defau' },
    { id: 17, name: 'Fennel', hide: false, description: 'Fennel', unit: 'g', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 18, name: 'Ginger Root', hide: false, description: 'Botanical', unit: 'Lbs', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'Defau' },
    { id: 19, name: 'Hyssop', hide: false, description: 'Hyssop', unit: 'g', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 20, name: 'Italian Juniper', hide: false, description: 'Botanical', unit: 'Lbs', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 21, name: 'Lemon Balm', hide: false, description: 'Lemon Balm', unit: 'g', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 22, name: 'Lime Peel', hide: false, description: 'Botanical', unit: 'Lbs', materialClass: 'Blending Ingred...', ttbMaterial: 'NA', vend: 'NA' },
    { id: 23, name: 'Molasses', hide: false, description: '', unit: 'Gal', materialClass: 'Fermentable', ttbMaterial: 'Molasses', vend: 'NA' },
    { id: 24, name: 'New 30 G', hide: false, description: '', unit: 'Ea', materialClass: 'Barrel', ttbMaterial: 'NA', vend: 'Defau' },
    { id: 25, name: 'New 53 #3 char Barrel', hide: false, description: 'New 53 gallon #3 char barrel', unit: 'Ea', materialClass: 'Barrel', ttbMaterial: 'NA', vend: 'Indep' },
    { id: 26, name: 'New 53 #4 char Barrel', hide: false, description: 'New 53 gallon #4 char barrel', unit: 'Ea', materialClass: 'Barrel', ttbMaterial: 'NA', vend: 'Indep' },
    { id: 27, name: 'New 53 G', hide: false, description: '', unit: 'Ea', materialClass: 'Barrel', ttbMaterial: 'NA', vend: 'Defau' },
    { id: 28, name: 'Ocean Spray Diet Cran', hide: false, description: '', unit: '', materialClass: '', ttbMaterial: '', vend: '' },
  ])

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

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-accent-gold">Raw Materials</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-accent-gold text-primary-dark rounded hover:bg-accent-gold-light transition-smooth font-medium">
            ADD NEW RAW MATERIAL
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
                  Commands
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Name
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Hide?
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Description
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Unit of Meas.
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Material Class
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    TTB Material...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Vend
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light divide-y divide-accent-blue">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-primary-DEFAULT transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex space-x-2">
                      <button className="text-accent-gold hover:text-accent-gold-light transition-colors">
                        Edit
                      </button>
                      <span className="text-gray-500">|</span>
                      <button className="text-accent-gold hover:text-accent-gold-light transition-colors">
                        BOM Materials
                      </button>
                      <span className="text-gray-500">|</span>
                      <button className="text-accent-gold hover:text-accent-gold-light transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.hide ? 'true' : 'false'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.description || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.unit || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.materialClass || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.ttbMaterial || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.vend || ''}
                  </td>
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
              of {totalPages}
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
          </div>

          <div className="text-gray-300 mb-2 sm:mb-0">
            {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} items
          </div>

          <button className="px-3 py-1 rounded bg-accent-blue text-gray-300 hover:bg-accent-blue-light transition-colors duration-200">
            Help
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsRawMaterials
