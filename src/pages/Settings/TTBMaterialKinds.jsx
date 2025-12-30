function TTBMaterialKinds() {
  const materialKinds = [
    { id: 1, rowNumber: 1, groupName: 'Grain and Grain Products', specificName: 'Corn' },
    { id: 2, rowNumber: 2, groupName: 'Grain and Grain Products', specificName: 'Rye' },
    { id: 3, rowNumber: 3, groupName: 'Grain and Grain Products', specificName: 'Malt' },
    { id: 4, rowNumber: 4, groupName: 'Grain and Grain Products', specificName: 'Wheat' },
    { id: 5, rowNumber: 5, groupName: 'Grain and Grain Products', specificName: 'Sorghum Grain' },
    { id: 6, rowNumber: 6, groupName: 'Grain and Grain Products', specificName: 'Barley' },
    { id: 7, rowNumber: 7, groupName: 'Grain And Grain Products', specificName: 'Yellow Field Corn#2', hasEdit: true },
    { id: 8, rowNumber: 8, groupName: 'Grain And Grain Products', specificName: 'Wrens Abruzzi Rye', hasEdit: true },
    { id: 9, rowNumber: 9, groupName: 'Fruit and Fruit Products', specificName: 'Grapes' },
    { id: 10, rowNumber: 10, groupName: 'Fruit and Fruit Products', specificName: '—', hasEdit: true },
    { id: 11, rowNumber: 11, groupName: 'Fruit and Fruit Products', specificName: 'Pears' },
    { id: 12, rowNumber: 12, groupName: 'Fruit and Fruit Products', specificName: '—', hasEdit: true },
    { id: 13, rowNumber: 13, groupName: 'Fruit and Fruit Products', specificName: '—', hasEdit: true },
    { id: 14, rowNumber: 14, groupName: 'Fruit and Fruit Products', specificName: '—', hasEdit: true },
    { id: 15, rowNumber: 15, groupName: 'Cane and Cane Products', specificName: 'Molasses' },
    { id: 16, rowNumber: 16, groupName: 'Cane and Cane Products', specificName: 'Cane Sugar', hasEdit: true },
    { id: 17, rowNumber: 17, groupName: 'Cane and Cane Products', specificName: '—', hasEdit: true },
    { id: 18, rowNumber: 18, groupName: 'Cane and Cane Products', specificName: '—', hasEdit: true },
    { id: 19, rowNumber: 19, groupName: 'Other Materials', specificName: 'Ethyl Sulfate' },
    { id: 20, rowNumber: 20, groupName: 'Other Materials', specificName: 'Ethylene Gas' },
    { id: 21, rowNumber: 21, groupName: 'Other Materials', specificName: 'Sulfite Liquors' },
    { id: 22, rowNumber: 22, groupName: 'Other Materials', specificName: 'Butane Gas' },
    { id: 23, rowNumber: 23, groupName: 'Other Materials', specificName: 'Blue Agave', hasEdit: true },
  ]

  const handleEdit = (id) => {
    console.log('Edit material kind:', id)
    // TODO: Implement edit functionality
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
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent">
          TTB Material Kinds
        </h1>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 shadow-2xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative overflow-x-auto">
          <table className="min-w-full divide-y divide-accent-blue/30">
            <thead className="bg-gradient-to-r from-primary-dark to-primary-light">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Row Number
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Group Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Specific Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light/50 divide-y divide-accent-blue/20">
              {materialKinds.map((item) => (
                <tr key={item.id} className="hover:bg-primary-dark/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-300">{item.rowNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-100 font-medium">{item.groupName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-100">
                      {item.specificName === '—' ? (
                        <span className="text-gray-500">{item.specificName}</span>
                      ) : (
                        item.specificName
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.hasEdit ? (
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-accent-gold hover:text-accent-gold-light transition-colors duration-200 font-medium"
                      >
                        Edit
                      </button>
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default TTBMaterialKinds
