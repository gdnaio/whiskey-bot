import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function CreateBOMItem() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the raw material data from location state
  const rawMaterial = location.state?.rawMaterial || {
    id: 1,
    name: '375 ml bottle white',
    materialClass: 'Packaging',
    unitOfMeas: 'Each'
  }

  const [formData, setFormData] = useState({
    unitsPerCreatedUnit: '0.00',
    rawMaterial: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Get the selected material name
    const selectedMaterial = availableMaterials.find(m => m.id.toString() === formData.rawMaterial)
    const materialName = selectedMaterial ? `${selectedMaterial.name} [${selectedMaterial.unit}]` : formData.rawMaterial
    
    // TODO: Implement actual submission logic
    console.log('BOM Item submitted:', { rawMaterial, formData, materialName })
    // Navigate back to BOM page with the new item
    navigate('/settings/raw-material-bom', { 
      state: { 
        rawMaterial,
        newBOMItem: {
          ...formData,
          name: materialName
        } 
      } 
    })
  }

  const handleCancel = () => {
    navigate('/settings/raw-material-bom', { state: { rawMaterial } })
  }

  // Mock list of available raw materials for the dropdown
  const availableMaterials = [
    { id: 1, name: '375 ml bottle white', unit: 'Each' },
    { id: 2, name: '750 mL bottle White', unit: 'Each' },
    { id: 3, name: 'Corn', unit: 'lb' },
    { id: 4, name: 'Rye', unit: 'lb' },
    { id: 5, name: 'Malt', unit: 'lb' },
  ]

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
          Create BOM Item
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Raw Material Details (Read-only) */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-6">Raw Material Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-accent-gold font-semibold mb-3">Created Raw Material</label>
                  <div className="px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100">
                    {rawMaterial.name}
                  </div>
                </div>
                <div>
                  <label className="block text-accent-gold font-semibold mb-3">Material Class</label>
                  <div className="px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100">
                    {rawMaterial.materialClass}
                  </div>
                </div>
                <div>
                  <label className="block text-accent-gold font-semibold mb-3">Unit of Measure</label>
                  <div className="px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100">
                    {rawMaterial.unitOfMeas}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOM Item Form */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
            <div className="relative space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">BOM Item Details</h2>
              
              <div>
                <label className="block text-white font-semibold mb-3">
                  Units Per Created Unit <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="unitsPerCreatedUnit"
                  value={formData.unitsPerCreatedUnit}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">
                  Raw Material <span className="text-red-400">*</span>
                </label>
                <select
                  name="rawMaterial"
                  value={formData.rawMaterial}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                >
                  <option value="">Select...</option>
                  {availableMaterials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name} [{material.unit}]
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-semibold shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-xl hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold shadow-lg shadow-accent-gold/20"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Footer Status Messages */}
      <div className="mt-8 relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-dark to-primary-light border border-accent-blue/30 p-6">
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

export default CreateBOMItem

