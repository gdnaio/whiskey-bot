import { useState } from 'react'

function TTBMaterialKinds() {
  const [materialKinds, setMaterialKinds] = useState([
    // Grain and Grain Products
    { id: 1, rowNumber: 1, groupName: 'Grain and Grain Products', specificName: 'Corn' },
    { id: 2, rowNumber: 2, groupName: 'Grain and Grain Products', specificName: 'Rye' },
    { id: 3, rowNumber: 3, groupName: 'Grain and Grain Products', specificName: 'Malt' },
    { id: 4, rowNumber: 4, groupName: 'Grain and Grain Products', specificName: 'Wheat' },
    { id: 5, rowNumber: 5, groupName: 'Grain and Grain Products', specificName: 'Sorghum Grain' },
    { id: 6, rowNumber: 6, groupName: 'Grain and Grain Products', specificName: 'Barley' },
    { id: 7, rowNumber: 7, groupName: 'Grain and Grain Products', specificName: 'Yellow Field Corn#2' },
    { id: 8, rowNumber: 8, groupName: 'Grain and Grain Products', specificName: 'Wrens Abruzzi Rye' },
    // Fruit and Fruit Products
    { id: 9, rowNumber: 9, groupName: 'Fruit and Fruit Products', specificName: 'Grapes' },
    { id: 10, rowNumber: 10, groupName: 'Fruit and Fruit Products', specificName: '' },
    { id: 11, rowNumber: 11, groupName: 'Fruit and Fruit Products', specificName: 'Pears' },
    { id: 12, rowNumber: 12, groupName: 'Fruit and Fruit Products', specificName: '' },
    { id: 13, rowNumber: 13, groupName: 'Fruit and Fruit Products', specificName: '' },
    { id: 14, rowNumber: 14, groupName: 'Fruit and Fruit Products', specificName: '' },
    // Cane and Cane Products
    { id: 15, rowNumber: 15, groupName: 'Cane and Cane Products', specificName: 'Molasses' },
    { id: 16, rowNumber: 16, groupName: 'Cane and Cane Products', specificName: 'Cane Sugar' },
    { id: 17, rowNumber: 17, groupName: 'Cane and Cane Products', specificName: '' },
    { id: 18, rowNumber: 18, groupName: 'Cane and Cane Products', specificName: '' },
    // Other Materials
    { id: 19, rowNumber: 19, groupName: 'Other Materials', specificName: 'Ethyl Sulfate' },
    { id: 20, rowNumber: 20, groupName: 'Other Materials', specificName: 'Ethylene Gas' },
    { id: 21, rowNumber: 21, groupName: 'Other Materials', specificName: 'Sulfite Liquors' },
    { id: 22, rowNumber: 22, groupName: 'Other Materials', specificName: 'Butane Gas' },
    { id: 23, rowNumber: 23, groupName: 'Other Materials', specificName: 'Blue Agave' },
  ])

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-accent-gold mb-6">TTB Material Kinds</h1>

      <div className="bg-primary-light rounded-lg border border-accent-blue shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-accent-blue">
            <thead className="bg-primary-DEFAULT">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Row Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Group Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Specific Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light divide-y divide-accent-blue">
              {materialKinds.map((item) => (
                <tr key={item.id} className="hover:bg-primary-DEFAULT transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.rowNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.groupName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    <div className="flex items-center justify-between">
                      <span>{item.specificName || ''}</span>
                      {(item.rowNumber === 7 || item.rowNumber === 8 || item.rowNumber >= 10 || item.rowNumber === 16 || item.rowNumber === 23) && (
                        <button className="ml-4 text-accent-gold hover:text-accent-gold-light transition-colors">
                          Edit
                        </button>
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

export default TTBMaterialKinds
