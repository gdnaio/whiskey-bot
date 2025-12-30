function WhiskeyKinds() {
  const whiskeyKinds = [
    { id: 1, typeName: 'Bourbon', rowNumber: 1 },
    { id: 2, typeName: 'Corn', rowNumber: 2 },
    { id: 3, typeName: 'Rye', rowNumber: 3 },
    { id: 4, typeName: 'Light', rowNumber: 4 },
    { id: 5, typeName: 'Wheat', rowNumber: 5, hasActions: true },
    { id: 6, typeName: '—', rowNumber: 6, hasActions: true },
    { id: 7, typeName: '—', rowNumber: 7, hasActions: true },
    { id: 8, typeName: '—', rowNumber: 8, hasActions: true },
  ]

  const handleEdit = (id) => {
    console.log('Edit whiskey kind:', id)
    // TODO: Implement edit functionality
  }

  const handleDetails = (id) => {
    console.log('View details for whiskey kind:', id)
    // TODO: Implement details view
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
          Whiskey Kinds
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
                  Type Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Row Number
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light/50 divide-y divide-accent-blue/20">
              {whiskeyKinds.map((item) => (
                <tr key={item.id} className="hover:bg-primary-dark/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-100 font-medium">
                      {item.typeName === '—' ? (
                        <span className="text-gray-500">{item.typeName}</span>
                      ) : (
                        item.typeName
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-300">{item.rowNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.hasActions ? (
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="text-accent-gold hover:text-accent-gold-light transition-colors duration-200 font-medium"
                        >
                          Edit
                        </button>
                        <span className="text-gray-500">|</span>
                        <button
                          onClick={() => handleDetails(item.id)}
                          className="text-accent-gold hover:text-accent-gold-light transition-colors duration-200 font-medium"
                        >
                          Details
                        </button>
                      </div>
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

export default WhiskeyKinds
