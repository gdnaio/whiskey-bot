import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NewFermentation() {
  const navigate = useNavigate()
  
  // Mash bills from settings
  const mashBills = [
    { id: 1, name: 'Agave Spirit', totalVol: 3724.82 },
    { id: 2, name: 'Bourbon', totalVol: 3566.322675 },
    { id: 3, name: 'Bourbon Barrel Gin', totalVol: 3566.322675 },
    { id: 4, name: 'Danko Rye', totalVol: 3566.322675 },
    { id: 5, name: 'Gin', totalVol: 3566.322675 },
    { id: 6, name: 'M1 Rye', totalVol: 500 },
    { id: 7, name: 'Reaper Vodka', totalVol: 3566.322675 },
    { id: 8, name: 'RS Rye', totalVol: 3566.322675 },
    { id: 9, name: 'Rum', totalVol: 3566.5 },
    { id: 10, name: 'Single Malt Whiskey', totalVol: 1188.774225 },
    { id: 11, name: 'Tolerance', totalVol: 3566.322675 },
    { id: 12, name: 'Vodka', totalVol: 3566.322675 },
    { id: 13, name: 'Vodka corn +wheat', totalVol: 1585.0323 },
    { id: 14, name: 'Wheat whiskey', totalVol: 500 },
  ]

  // Sample fermenters
  const fermenters = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8']

  const [formData, setFormData] = useState({
    timestamp: new Date().toLocaleString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }),
    mashBill: '',
    totalBatchSize: '0.00',
    batchSizeUnit: 'Gallons',
    startingSG: '0.00',
    startingBrix: '0.00',
    lotName: '',
    cookNumber: '584',
    laborHours: ''
  })

  const [fermenterAllocations, setFermenterAllocations] = useState([
    { fermenter: 'F1', volume: '0.00', enabled: true }
  ])

  const [selectedMashBill, setSelectedMashBill] = useState(null)

  useEffect(() => {
    if (formData.mashBill) {
      const mashBill = mashBills.find(mb => mb.id.toString() === formData.mashBill)
      setSelectedMashBill(mashBill)
    } else {
      setSelectedMashBill(null)
    }
  }, [formData.mashBill])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUnitToggle = () => {
    setFormData(prev => ({
      ...prev,
      batchSizeUnit: prev.batchSizeUnit === 'Gallons' ? 'Liters' : 'Gallons'
    }))
  }

  const handleFermenterChange = (index, field, value) => {
    const updated = [...fermenterAllocations]
    if (field === 'enabled') {
      updated[index].enabled = value
    } else {
      updated[index][field] = value
    }
    setFermenterAllocations(updated)
  }

  const handleAddFermenter = () => {
    const availableFermenters = fermenters.filter(f => 
      !fermenterAllocations.some(fa => fa.fermenter === f && fa.enabled)
    )
    if (availableFermenters.length > 0) {
      setFermenterAllocations([
        ...fermenterAllocations,
        { fermenter: availableFermenters[0], volume: '0.00', enabled: true }
      ])
    }
  }

  const handleRemoveFermenter = (index) => {
    if (fermenterAllocations.length > 1) {
      setFermenterAllocations(fermenterAllocations.filter((_, i) => i !== index))
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    // TODO: Navigate to Step 2 of 2
    console.log('Form data:', { ...formData, fermenterAllocations })
    // For now, just log - will navigate to step 2 when implemented
    alert('Step 2 will be implemented next')
  }

  const handleCancel = () => {
    navigate('/production/fermentation-log')
  }

  const handleAdvancedObservations = () => {
    // TODO: Open advanced observations modal/page
    alert('Advanced/Starting Observations will be implemented')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Create Cook: Step 1 of 2
        </h1>
      </div>

      {/* Form Container - White Background */}
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <form onSubmit={handleNext} className="space-y-6">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
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
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Mash Bill */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Mash Bill
                </label>
                <select
                  name="mashBill"
                  value={formData.mashBill}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="">Choose mash bill...</option>
                  {mashBills.map(mb => (
                    <option key={mb.id} value={mb.id}>
                      {mb.name}
                    </option>
                  ))}
                </select>
                {selectedMashBill && (
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    The above Gallon value is the standard mash size entered and managed in Setup - Mash Bill Setup. You can enter any gallon quantity into your fermenter below and the system will scale the estimated raw material usage on the next screen according to the Mash Bill Ingredients.
                  </p>
                )}
              </div>

              {/* Total Batch Size */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Total Batch Size
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="totalBatchSize"
                    value={formData.totalBatchSize}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                  <select
                    name="batchSizeUnit"
                    value={formData.batchSizeUnit}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  >
                    <option value="Gallons">Gallons</option>
                    <option value="Liters">Liters</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleUnitToggle}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      formData.batchSizeUnit === 'Gallons'
                        ? 'bg-green-500 border-green-600 text-white'
                        : 'bg-gray-200 border-gray-300 text-gray-700'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Starting SG/Brix */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Starting SG/Brix
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="number"
                      name="startingSG"
                      value={formData.startingSG}
                      onChange={handleInputChange}
                      step="0.0001"
                      min="0"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                    <label className="block text-xs text-gray-500 mt-1">SG</label>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="startingBrix"
                      value={formData.startingBrix}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                    <label className="block text-xs text-gray-500 mt-1">Brix</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
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

              {/* Cook Number */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Cook Number
                </label>
                <input
                  type="text"
                  name="cookNumber"
                  value={formData.cookNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              {/* Labor Hours */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Labor Hours
                </label>
                <input
                  type="number"
                  name="laborHours"
                  value={formData.laborHours}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>
          </div>

          {/* Fermenter(s) To Fill */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-gray-700 font-semibold">
                Fermenter(s) To Fill
              </label>
              <button
                type="button"
                onClick={handleAddFermenter}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                + Add Fermenter
              </button>
            </div>
            <div className="space-y-3">
              {fermenterAllocations.map((allocation, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <select
                    value={allocation.fermenter}
                    onChange={(e) => handleFermenterChange(index, 'fermenter', e.target.value)}
                    className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  >
                    <option value="">Select fermenter...</option>
                    {fermenters.map(f => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Volume</label>
                    <input
                      type="number"
                      value={allocation.volume}
                      onChange={(e) => handleFermenterChange(index, 'volume', e.target.value)}
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFermenterChange(index, 'enabled', !allocation.enabled)}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      allocation.enabled
                        ? 'bg-green-500 border-green-600'
                        : 'bg-gray-200 border-gray-300'
                    }`}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {fermenterAllocations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFermenter(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Advanced/Starting Observations Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleAdvancedObservations}
              className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Advanced/Starting Observations...
            </button>
          </div>

          {/* Navigation Buttons */}
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
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Help Button - Bottom Right */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all duration-200 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default NewFermentation
