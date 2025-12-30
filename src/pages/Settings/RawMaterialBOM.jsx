import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function RawMaterialBOM() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the raw material data from location state, or use defaults
  const rawMaterial = location.state?.rawMaterial || {
    id: 1,
    name: '375 ml bottle white',
    materialClass: 'Packaging',
    unitOfMeas: 'Each'
  }

  const [bomItems, setBomItems] = useState([])

  // Check if a new BOM item was added from the create page
  useEffect(() => {
    if (location.state?.newBOMItem) {
      const newItem = {
        id: Date.now(),
        name: location.state.newBOMItem.rawMaterial || '',
        unitsPerCreatedUnit: location.state.newBOMItem.unitsPerCreatedUnit || ''
      }
      setBomItems(prev => [...prev, newItem])
      // Clear the state to avoid re-adding on re-render
      navigate(location.pathname, { replace: true, state: { rawMaterial } })
    }
  }, [location.state, navigate, location.pathname, rawMaterial])

  const handleAddNew = () => {
    navigate('/settings/create-bom-item', { state: { rawMaterial } })
  }

  const handleBOMItemChange = (id, field, value) => {
    setBomItems(bomItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleRemoveBOMItem = (id) => {
    setBomItems(bomItems.filter(item => item.id !== id))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-accent-gold to-transparent"></div>
          <span className="text-accent-gold/80 text-sm font-semibold uppercase tracking-wider">
            Settings
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent mb-4">
          Raw Material BOM
        </h1>
      </div>

      {/* Raw Material Details */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl mb-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
        <div className="relative">
          <h2 className="text-2xl font-bold text-white mb-6">Raw Material Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-accent-gold font-semibold mb-2">Name</label>
              <div className="text-gray-100 text-lg">{rawMaterial.name}</div>
            </div>
            <div>
              <label className="block text-accent-gold font-semibold mb-2">Material Class</label>
              <div className="text-gray-100 text-lg">{rawMaterial.materialClass}</div>
            </div>
            <div>
              <label className="block text-accent-gold font-semibold mb-2">Unit of Measure</label>
              <div className="text-gray-100 text-lg">{rawMaterial.unitOfMeas}</div>
            </div>
          </div>
        </div>
      </div>

      {/* BOM Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl mb-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">BOM, To Assemble 1 Unit</h2>
              <h3 className="text-lg font-semibold text-accent-gold">Bill of Materials</h3>
            </div>
            <button
              onClick={handleAddNew}
              className="px-5 py-2.5 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-xl hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold shadow-lg shadow-accent-gold/20 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New
            </button>
          </div>

          {bomItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-accent-blue/30">
                <thead className="bg-gradient-to-r from-primary-dark to-primary-light">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Units Per Created Unit
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-primary-dark/50 divide-y divide-accent-blue/20">
                  {bomItems.map((item) => (
                    <tr key={item.id} className="hover:bg-primary-dark/70 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleBOMItemChange(item.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-primary-light border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                          placeholder="Select material"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={item.unitsPerCreatedUnit}
                          onChange={(e) => handleBOMItemChange(item.id, 'unitsPerCreatedUnit', e.target.value)}
                          step="0.01"
                          className="w-full px-3 py-2 bg-primary-light border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleRemoveBOMItem(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-primary-dark/50 rounded-xl border border-accent-blue/30">
              <p className="text-gray-400">No BOM items added yet. Click "Add New" to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Back Link */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings/raw-materials')}
          className="text-accent-gold hover:text-accent-gold-light transition-colors duration-200 font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Raw Materials
        </button>
      </div>

      {/* Footer Status Messages */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-dark to-primary-light border border-accent-blue/30 p-6">
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
  )
}

export default RawMaterialBOM

