import { useState } from 'react'

function WhiskeyKinds() {
  const [whiskeyKinds, setWhiskeyKinds] = useState([
    { id: 1, typeName: 'Bourbon', rowNumber: 1 },
    { id: 2, typeName: 'Corn', rowNumber: 2 },
    { id: 3, typeName: 'Rye', rowNumber: 3 },
    { id: 4, typeName: 'Light', rowNumber: 4 },
    { id: 5, typeName: 'Wheat', rowNumber: 5 },
    { id: 6, typeName: '', rowNumber: 6 },
    { id: 7, typeName: '', rowNumber: 7 },
    { id: 8, typeName: '', rowNumber: 8 },
  ])

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-accent-gold mb-6">Whiskey Kinds</h1>

      <div className="bg-primary-light rounded-lg border border-accent-blue shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-accent-blue">
            <thead className="bg-primary-DEFAULT">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Row Number
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light divide-y divide-accent-blue">
              {whiskeyKinds.map((item) => (
                <tr key={item.id} className="hover:bg-primary-DEFAULT transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.typeName || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex items-center justify-between">
                      <span>{item.rowNumber}</span>
                      {item.rowNumber >= 5 && (
                        <div className="flex space-x-2">
                          <button className="text-accent-gold hover:text-accent-gold-light transition-colors">
                            Edit
                          </button>
                          <span className="text-gray-500">|</span>
                          <button className="text-accent-gold hover:text-accent-gold-light transition-colors">
                            Details
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Status Messages */}
        <div className="mt-8 pt-6 border-t border-accent-blue flex flex-wrap gap-6 text-sm px-6 pb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-gray-400">Locked due to incomplete prerequisites.</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-gray-400">Open for editing and not populated.</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
