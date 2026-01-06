import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewDistillation() {
  const navigate = useNavigate()

  // Internal spirit types from settings
  const internalSpiritTypes = [
    'Absinthe', 'Agave Spirit', 'Barrel Aged Rum', 'Bourbon', 'Bourbon Cream', 'Costa Gin',
    'Cream Base', 'Crosstown Bottle In Bond Rye', 'Crosstown Straight Rye M-1', 'Danko Rye',
    'Hard Seltzer Stono', 'High Rye Bourbon', "Jasper's Bourbon Barrel Gin", "Jasper's Gin",
    'Light Whiskey', 'M1 Bourbon', 'M1 C-70 Rye', 'M1 Rye', 'Mocha Cream', 'Peach Cream',
    'Pecan Liqueur', 'Reaper Vodka', "Reapers Temptation", "Reapers Temptation2", 'RS Rye',
    'Rum', 'Rum Rye', 'Single Malt Whiskey', 'Tolerance Liquor', 'Vodka', 'Wheat Whiskey'
  ]

  const [formData, setFormData] = useState({
    timestamp: new Date().toLocaleString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }),
    internalSpiritType: '',
    distillationNumber: '729',
    lotName: '',
    notes: ''
  })

  const [distillationInputs, setDistillationInputs] = useState({
    useFermenters: false,
    useProductionTanks: false,
    useStorageTanks: false,
    useProcessingTanks: false,
    useBotanicals: false
  })

  const [distillates, setDistillates] = useState({
    createHearts: { enabled: false, tankQty: 0 },
    createLowWines: { enabled: false, tankQty: 0 },
    createHeads: { enabled: false, tankQty: 0 },
    createTails: { enabled: false, tankQty: 0 },
    createFeints: { enabled: false, tankQty: 0 }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDistillationInputChange = (e) => {
    const { name, checked } = e.target
    setDistillationInputs(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleDistillateChange = (key, field, value) => {
    setDistillates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: field === 'enabled' ? value : Number(value)
      }
    }))
  }

  const handleTankQtyChange = (key, delta) => {
    setDistillates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        tankQty: Math.max(0, prev[key].tankQty + delta)
      }
    }))
  }

  const handleNext = (e) => {
    e.preventDefault()
    // TODO: Navigate to Step 2 of 4
    console.log('Form data:', { formData, distillationInputs, distillates })
    alert('Step 2 will be implemented next')
  }

  const handleCancel = () => {
    navigate('/production/distillation-log')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Distillation Run: Step 1 of 4
          </h1>
          <a href="#" className="text-accent-gold hover:text-accent-gold-light text-sm ml-4">
            Help
          </a>
        </div>
      </div>

      {/* Form Container - White Background */}
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <form onSubmit={handleNext} className="space-y-8">
          {/* General Information Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">General Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Timestamp */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Timestamp
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="timestamp"
                    value={formData.timestamp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Internal Spirit Type */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Internal Spirit Type
                </label>
                <select
                  name="internalSpiritType"
                  value={formData.internalSpiritType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="">Choose Type..</option>
                  {internalSpiritTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Distillation Number */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Distillation Number
                </label>
                <input
                  type="text"
                  name="distillationNumber"
                  value={formData.distillationNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              {/* Lot Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Lot Name
                </label>
                <input
                  type="text"
                  name="lotName"
                  value={formData.lotName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="mt-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 resize-y"
              />
            </div>
          </div>

          {/* Distillation Inputs Section */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Distillation Inputs</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="useFermenters"
                  checked={distillationInputs.useFermenters}
                  onChange={handleDistillationInputChange}
                  className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500/20 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">Use Fermenters</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="useProductionTanks"
                  checked={distillationInputs.useProductionTanks}
                  onChange={handleDistillationInputChange}
                  className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500/20 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">Use Production Tanks / Unfinished Spirits</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="useStorageTanks"
                  checked={distillationInputs.useStorageTanks}
                  onChange={handleDistillationInputChange}
                  className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500/20 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">Use Storage Tanks</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="useProcessingTanks"
                  checked={distillationInputs.useProcessingTanks}
                  onChange={handleDistillationInputChange}
                  className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500/20 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">Use Processing Tanks</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="useBotanicals"
                  checked={distillationInputs.useBotanicals}
                  onChange={handleDistillationInputChange}
                  className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500/20 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">Use Botanicals or other Blending Ingredients</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </label>
            </div>
          </div>

          {/* Distillates Section */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Distillates</h2>
            <p className="text-sm text-gray-600 mb-6">
              You can edit the number of collection tanks per selected sub-type.
            </p>
            <div className="space-y-4">
              {Object.entries(distillates).map(([key, value]) => {
                const labels = {
                  createHearts: 'Create Hearts',
                  createLowWines: 'Create Low Wines',
                  createHeads: 'Create Heads',
                  createTails: 'Create Tails',
                  createFeints: 'Create Feints'
                }
                return (
                  <div key={key} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={value.enabled}
                        onChange={(e) => handleDistillateChange(key, 'enabled', e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500/20 focus:ring-2"
                      />
                      <span className="text-gray-700 font-medium">{labels[key]}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Tank Qty</span>
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          type="button"
                          onClick={() => handleTankQtyChange(key, -1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <input
                          type="number"
                          value={value.tankQty}
                          onChange={(e) => handleDistillateChange(key, 'tankQty', e.target.value)}
                          min="0"
                          className="w-16 px-2 py-1 text-center border-0 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-gray-900"
                        />
                        <button
                          type="button"
                          onClick={() => handleTankQtyChange(key, 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Next
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Help Button - Bottom Right */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-gradient-to-br from-primary-dark to-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default NewDistillation
