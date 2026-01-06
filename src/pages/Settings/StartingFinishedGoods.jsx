import { useState } from 'react'

function StartingFinishedGoods() {
  const [selectedWarehouse, setSelectedWarehouse] = useState('Default Warehouse')
  const [startMonth, setStartMonth] = useState('')
  const [inventoryData, setInventoryData] = useState({})

  // Product master names from the image
  const productMasters = [
    'Aged Rum',
    'Barrel Aged Gin',
    'Barrel Aged Bourbon',
    'Barrel Proof Bourbon',
    'Barrel Proof Bourbon (100)',
    'Barrel Proof Bourbon (120)',
    'Barrel Proof Bourbon (Vintage)',
    'Barrel Proof Corn Whiskey',
    'Barrel Proof Cream Bourbon',
    'Blue 80',
    'Blue 80 Gin',
    'Blue 80 Rye',
    'Blue 80 Vodka',
    'Bourbon',
    'Bourbon 375',
    'Bourbon Cream',
    'Cask Gin',
    'Cask Rye',
    'Cinnamon Spirits in Barrel Gin',
    'Classic Straight Rye M-1',
    'Corn Whiskey',
    'Dry Gin',
    'Gin',
    'Honey Spirit',
    'Liqueur Bourbon Barrel Gin',
    'Liqueur Gin',
    'Liqueur Gin 375',
    'MD Bourbon - Tetra Pak',
    'MD C-70 Rye',
    'MD Gin',
    'MD Rye',
    'Mocha Cream',
    'Peach Cream',
    'Pecan',
    'Pecan 375',
    'Seaport Vodka',
    'Seaport Vodka 375',
    'Seaport Temptation',
    'SG Gin',
    'Slum',
    'Sour Mash',
    'Sour Mash 100',
    'Sour Mash 120',
    'Spirits Not In New Barrels',
    'Single Malt 40',
    'Single Malt Bourbon',
    'Sweetwater Liqueur',
    'Whiskey Single Barrel Straight Bourbon',
    'Vodka',
    'Vodka 375',
    'Wheat 40 Whiskey',
    'White Peach Vodka',
    'Wildcat Rum',
    'Wine Barrel Aged Gin'
  ]

  // Sample warehouses
  const warehouses = [
    'Default Warehouse',
    'Main Warehouse',
    'Secondary Warehouse',
    'Cold Storage'
  ]

  const handleInventoryChange = (productName, field, value) => {
    setInventoryData(prev => ({
      ...prev,
      [productName]: {
        ...prev[productName],
        [field]: value
      }
    }))
  }

  const getInventoryValue = (productName, field) => {
    return inventoryData[productName]?.[field] || (field === 'value' ? '0.00' : '')
  }

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

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
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent mb-2">
              Starting Finished Goods Inventory
            </h1>
            <p className="text-gray-400 text-sm">Date: {currentDate}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-300 mr-2">Start Month:</label>
            <input
              type="month"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              className="px-4 py-2 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 shadow-2xl p-8">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative">
          {/* Warehouse Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Warehouse Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  This Type Warehouse
                </label>
                <select
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                >
                  {warehouses.map((warehouse) => (
                    <option key={warehouse} value={warehouse}>
                      {warehouse}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Default Warehouse
                </label>
                <select
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                >
                  {warehouses.map((warehouse) => (
                    <option key={warehouse} value={warehouse}>
                      {warehouse}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Warehouse Inventory Table - Show when Default Warehouse is selected */}
          {selectedWarehouse === 'Default Warehouse' && (
            <div className="mb-8">
              <div className="overflow-x-auto rounded-xl border border-accent-blue/50">
                <table className="min-w-full divide-y divide-accent-blue/30">
                  <thead className="bg-gradient-to-r from-primary-dark to-primary-light">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Product Master Name
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Starting Quantity/Gallons
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Starting Barrels
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Value ($)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-primary-light/50 divide-y divide-accent-blue/20">
                    {productMasters.map((product) => (
                      <tr key={product} className="hover:bg-primary-dark/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-100 font-medium">{product}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            step="0.01"
                            value={getInventoryValue(product, 'quantity')}
                            onChange={(e) => handleInventoryChange(product, 'quantity', e.target.value)}
                            className="w-32 px-3 py-2 bg-primary-dark border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 text-sm"
                            placeholder="0.00"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            step="0.01"
                            value={getInventoryValue(product, 'barrels')}
                            onChange={(e) => handleInventoryChange(product, 'barrels', e.target.value)}
                            className="w-32 px-3 py-2 bg-primary-dark border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 text-sm"
                            placeholder="0.00"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            step="0.01"
                            value={getInventoryValue(product, 'value')}
                            onChange={(e) => handleInventoryChange(product, 'value', e.target.value)}
                            className="w-32 px-3 py-2 bg-primary-dark border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 text-sm"
                            placeholder="0.00"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <p className="text-yellow-300 text-sm">
                  Transactions have already been applied to this account's starting inventory/gallons. All transactions must follow in order. Please use the reset feature in the Setup menu.
                </p>
              </div>
            </div>
          )}

          {/* Footer Status Messages */}
          <div className="mt-8 pt-6 border-t border-accent-blue/50 flex flex-wrap gap-6 text-sm">
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
              <span className="text-gray-400">Open for editing as not processed yet.</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-400">Open for editing but processed.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartingFinishedGoods
