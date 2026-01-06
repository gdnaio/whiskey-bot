import { useState } from 'react'

function StartingTanks() {
  const [startMonth, setStartMonth] = useState('2016-03')
  const [tankData, setTankData] = useState({})

  // Tank names from the image
  const tankNames = [
    'Barrel Tank',
    'Blending Tank',
    'cream tote',
    'cream tote',
    'T1',
    'T10',
    'T11',
    'T12',
    'T13',
    'T131',
    'T14',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'T8',
    'T9',
    'Temporary Tank 73699425',
    'Tote 264'
  ]

  // Sample internal spirit types - in production, this would come from the database
  const internalSpiritTypes = [
    'Bourbon',
    'Rye',
    'Gin',
    'Vodka',
    'Rum',
    'Whiskey',
    'Light Whiskey',
    'Single Malt Whiskey'
  ]

  // Sample accounts - in production, this would come from the database
  const accounts = [
    'Account 1',
    'Account 2',
    'Account 3',
    'Default Account'
  ]

  // Sub-types
  const subTypes = [
    'Hearts_or_Finished',
    'Low_Wines',
    'Feints',
    'Heads',
    'Tails'
  ]

  const handleTankDataChange = (tankName, field, value) => {
    setTankData(prev => ({
      ...prev,
      [tankName]: {
        ...prev[tankName],
        [field]: value
      }
    }))
  }

  const getTankValue = (tankName, field) => {
    if (field === 'subType') {
      return tankData[tankName]?.[field] || 'Hearts_or_Finished'
    }
    return tankData[tankName]?.[field] || ''
  }

  const getToggleValue = (tankName, field) => {
    return tankData[tankName]?.[field] || false
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
            Starting Tank Inventory
          </h1>
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

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 shadow-2xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative overflow-x-auto">
          <table className="min-w-full divide-y divide-accent-blue/30">
            <thead className="bg-gradient-to-r from-primary-dark to-primary-light">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Tank Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Internal Spirit Type
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Concentration
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Account
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Sub-Type
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Value($)
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light/50 divide-y divide-accent-blue/20">
              {tankNames.map((tankName, index) => (
                <tr key={`${tankName}-${index}`} className="hover:bg-primary-dark/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100 font-medium">{tankName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={getTankValue(tankName, 'internalSpiritType')}
                      onChange={(e) => handleTankDataChange(tankName, 'internalSpiritType', e.target.value)}
                      className="w-48 px-3 py-2 bg-primary-dark border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 text-sm"
                    >
                      <option value="">Select...</option>
                      {internalSpiritTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={getTankValue(tankName, 'concentration')}
                        onChange={(e) => handleTankDataChange(tankName, 'concentration', e.target.value)}
                        className="w-24 px-3 py-2 bg-primary-dark border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 text-sm"
                        placeholder="0.00"
                      />
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={getToggleValue(tankName, 'concentrationToggle')}
                          onChange={(e) => handleTankDataChange(tankName, 'concentrationToggle', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-gold/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={getTankValue(tankName, 'amount')}
                        onChange={(e) => handleTankDataChange(tankName, 'amount', e.target.value)}
                        className="w-24 px-3 py-2 bg-primary-dark border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 text-sm"
                        placeholder="0.00"
                      />
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={getToggleValue(tankName, 'amountToggle')}
                          onChange={(e) => handleTankDataChange(tankName, 'amountToggle', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-gold/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={getTankValue(tankName, 'account')}
                      onChange={(e) => handleTankDataChange(tankName, 'account', e.target.value)}
                      className="w-40 px-3 py-2 bg-primary-dark border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 text-sm"
                    >
                      <option value="">Select...</option>
                      {accounts.map((account) => (
                        <option key={account} value={account}>
                          {account}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={getTankValue(tankName, 'subType')}
                      onChange={(e) => handleTankDataChange(tankName, 'subType', e.target.value)}
                      className="w-48 px-3 py-2 bg-primary-dark border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 text-sm"
                    >
                      {subTypes.map((subType) => (
                        <option key={subType} value={subType}>
                          {subType}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.01"
                      value={getTankValue(tankName, 'value')}
                      onChange={(e) => handleTankDataChange(tankName, 'value', e.target.value)}
                      className="w-32 px-3 py-2 bg-primary-dark border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Informational Text */}
        <div className="mt-8 pt-6 border-t border-accent-blue/50 p-6 bg-gradient-to-r from-primary-dark to-primary-light">
          <p className="text-gray-300 mb-6 leading-relaxed">
            Transactions have already been applied to this account. To setup starting transactions, all transactions must first be reset. Please use the reset feature in the Setup menu.
          </p>

          {/* Footer Status Messages */}
          <div className="flex flex-wrap gap-6 text-sm">
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
    </div>
  )
}

export default StartingTanks
