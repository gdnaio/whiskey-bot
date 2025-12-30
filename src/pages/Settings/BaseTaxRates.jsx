function BaseTaxRates() {
  const taxRates = [
    {
      id: 1,
      startDate: '01-01-1991',
      rate1: '$13.5000',
      rate1Ceiling: '0.00',
      rate2: '$13.5000',
      rate2Ceiling: '0.00',
      rate3: '$13.5000',
      pfCeiling: '200.00',
      type: 'Spirits',
      taxAuthority: 'TTB',
      createdBy: 'WS Setup',
    },
    {
      id: 2,
      startDate: '01-01-2018',
      rate1: '$2.7000',
      rate1Ceiling: '100,000.00',
      rate2: '$13.3400',
      rate2Ceiling: '22,230,000.00',
      rate3: '$13.5000',
      pfCeiling: '200.00',
      type: 'Spirits',
      taxAuthority: 'TTB',
      createdBy: 'WS Setup',
    },
  ]

  const handleDelete = (id) => {
    console.log('Delete tax rate:', id)
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
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent mb-4">
          Manage Base Tax Rates
        </h1>
      </div>

      {/* Informational Text */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-dark to-primary-light border border-accent-blue/30 p-6 mb-6">
        <div className="space-y-3">
          <p className="text-gray-300 leading-relaxed">
            Base rates are applied to ALL spirits unless a custom rate is set. Changing these rates will have a profound impact on tax calculations! The rate with the most recent Start Date is the default rate in use today.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Edits are NOT retroactive to previously calculated tax accruals. To apply a changed rate, you must unship and reship an order, or re-enter tax paid TIBs, taxable losses, etc.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Start dates begin at 12:00 AM, and the previous rate is considered active until this time. Please DO NOT DELETE or MODIFY rates added by WS Setup unless advised by support.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="px-5 py-2.5 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg">
          Export to Excel
        </button>
        <button className="px-5 py-2.5 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg">
          Export to PDF
        </button>
        <button className="px-5 py-2.5 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-xl hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/30">
          Add New
        </button>
        <button className="px-5 py-2.5 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg">
          Cancel Changes
        </button>
        <button className="px-5 py-2.5 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-xl hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/30">
          Save Changes
        </button>
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
                  Start Date
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Rate 1
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Rate 1 Ceiling
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Rate 2
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Rate 2 Ceiling
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Rate 3
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  PF Ceiling
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Tax Authority
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Created By
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light/50 divide-y divide-accent-blue/20">
              {taxRates.map((rate) => (
                <tr key={rate.id} className="hover:bg-primary-dark/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100 font-medium">{rate.startDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100">{rate.rate1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100">{rate.rate1Ceiling}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100">{rate.rate2}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100">{rate.rate2Ceiling}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100">{rate.rate3}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100">{rate.pfCeiling}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100">{rate.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100">{rate.taxAuthority}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100">{rate.createdBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(rate.id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200 font-medium flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BaseTaxRates
