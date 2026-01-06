import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewFill() {
  const navigate = useNavigate()

  // Sample data
  const sourceTanks = [
    'Barrel Tank: Bourbon (1401.25 V)',
    'Storage Tank: Vodka (2000.00 V)',
    'Production Tank: Rye (1500.50 V)',
    'Processing Tank: Gin (800.75 V)'
  ]

  const emptyBarrelStock = [
    'New 30 G (-14 on-hand)',
    'Used 53 G (25 on-hand)',
    'New 53 G (10 on-hand)',
    'Used 30 G (5 on-hand)'
  ]

  const barrelTypes = ['New', 'Used', 'Refill']

  const warehouses = [
    'Default Warehouse',
    'Main Warehouse',
    'Secondary Warehouse',
    'Cold Storage'
  ]

  const owners = [
    'Owner 1',
    'Owner 2',
    'Owner 3'
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
    sourceTank: '',
    emptyBarrelStock: '',
    anticipatedUse: '',
    startBarrelNumber: '911',
    barrelQty: '0',
    lotIdentificationNo: '26A06',
    suffix: 'N/A',
    internalLotName: '',
    cooperageSize: '',
    cooperageUnit: 'gallons',
    typeOfBarrels: 'New',
    temperature: '60.0',
    temperatureUnit: 'F',
    observedPFABV: '',
    pfABVUnit: 'proof',
    location: '',
    assignRackhouseSlots: false,
    notes: '',
    gaugingMethod: 'volume',
    owner: ''
  })

  const [barrelAttributes, setBarrelAttributes] = useState({
    charred: false,
    recharred: false,
    plain: false,
    paraffined: false,
    glued: false,
    reused: false,
    steamedSoaked: false
  })

  const [consumableMaterials, setConsumableMaterials] = useState([])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleBarrelAttributeChange = (e) => {
    const { name, checked } = e.target
    setBarrelAttributes(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleSuffixClick = (suffix) => {
    setFormData(prev => ({
      ...prev,
      suffix
    }))
  }

  const handleNext = (e) => {
    e.preventDefault()
    // TODO: Navigate to Step 2
    console.log('Form data:', { formData, barrelAttributes, consumableMaterials })
    alert('Step 2 will be implemented next')
  }

  const handleCancel = () => {
    navigate('/barrels/fill-barrels')
  }

  const handleEnterReceipt = () => {
    // TODO: Open receipt entry modal/page
    alert('Enter Receipt functionality will be implemented')
  }

  const handleAddSelectedMaterial = () => {
    // TODO: Add selected material to consumable materials table
    alert('Add material functionality will be implemented')
  }

  const suffixOptions = ['N/A', 'OA', 'OB', 'OC', 'OD']

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Fill Barrels: Step 1
        </h1>
      </div>

      {/* Form Container - White Background */}
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <form onSubmit={handleNext} className="space-y-8">
          {/* Main Form Fields */}
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

            {/* Source Tank */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Source Tank
              </label>
              <div className="flex gap-2">
                <select
                  name="sourceTank"
                  value={formData.sourceTank}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="">Select source tank...</option>
                  {sourceTanks.map((tank) => (
                    <option key={tank} value={tank}>
                      {tank}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cut Proof
                </button>
              </div>
            </div>

            {/* Empty Barrel Stock */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Empty Barrel Stock
              </label>
              <select
                name="emptyBarrelStock"
                value={formData.emptyBarrelStock}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              >
                <option value="">Select barrel stock...</option>
                {emptyBarrelStock.map((stock) => (
                  <option key={stock} value={stock}>
                    {stock}
                  </option>
                ))}
              </select>
            </div>

            {/* Anticipated Use */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Anticipated Use
              </label>
              <input
                type="text"
                name="anticipatedUse"
                value={formData.anticipatedUse}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            {/* Start Barrel # */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Start Barrel #
              </label>
              <input
                type="text"
                name="startBarrelNumber"
                value={formData.startBarrelNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            {/* Barrel Qty */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Barrel Qty
              </label>
              <input
                type="number"
                name="barrelQty"
                value={formData.barrelQty}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            {/* Lot Identification No. */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Lot Identification No.
              </label>
              <input
                type="text"
                name="lotIdentificationNo"
                value={formData.lotIdentificationNo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
              <div className="mt-2 flex gap-2">
                <span className="text-sm text-gray-600">Suffix:</span>
                {suffixOptions.map((suffix) => (
                  <button
                    key={suffix}
                    type="button"
                    onClick={() => handleSuffixClick(suffix)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      formData.suffix === suffix
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {suffix}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Lot Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Internal Lot Name
              </label>
              <input
                type="text"
                name="internalLotName"
                value={formData.internalLotName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* Informational Text */}
          <p className="text-sm text-gray-600 italic">
            You will be able to enter specific fill levels on the next page.
          </p>

          {/* Cooperage Size */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Cooperage Size
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="cooperageSize"
                value={formData.cooperageSize}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, cooperageUnit: 'gallons' }))}
                  className={`px-4 py-3 transition-colors ${
                    formData.cooperageUnit === 'gallons'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Gallons
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, cooperageUnit: 'liters' }))}
                  className={`px-4 py-3 transition-colors ${
                    formData.cooperageUnit === 'liters'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Liters
                </button>
              </div>
            </div>
          </div>

          {/* Type Of Barrels */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Type Of Barrels
            </label>
            <select
              name="typeOfBarrels"
              value={formData.typeOfBarrels}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            >
              {barrelTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Barrel Attributes */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">
              Barrel Attributes
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(barrelAttributes).map(([key, value]) => {
                const labels = {
                  charred: 'Charred',
                  recharred: 'Recharred',
                  plain: 'Plain',
                  paraffined: 'Paraffined',
                  glued: 'Glued',
                  reused: 'Reused',
                  steamedSoaked: 'Steamed, Soaked'
                }
                return (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name={key}
                      checked={value}
                      onChange={handleBarrelAttributeChange}
                      className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500/20 focus:ring-2"
                    />
                    <span className="text-gray-700">{labels[key]}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Temperature
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                step="0.1"
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, temperatureUnit: 'F' }))}
                  className={`px-4 py-3 transition-colors ${
                    formData.temperatureUnit === 'F'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  °F
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, temperatureUnit: 'C' }))}
                  className={`px-4 py-3 transition-colors ${
                    formData.temperatureUnit === 'C'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  °C
                </button>
              </div>
            </div>
          </div>

          {/* Observed PF/ABV */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Observed PF/ABV
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="observedPFABV"
                value={formData.observedPFABV}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, pfABVUnit: 'proof' }))}
                  className={`px-4 py-3 transition-colors ${
                    formData.pfABVUnit === 'proof'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Proof
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, pfABVUnit: 'abv' }))}
                  className={`px-4 py-3 transition-colors ${
                    formData.pfABVUnit === 'abv'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  ABV
                </button>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {/* Assign Rackhouse Slots */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="assignRackhouseSlots"
                checked={formData.assignRackhouseSlots}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500/20 focus:ring-2"
              />
              <span className="text-gray-700 font-semibold">Assign Rackhouse Slots</span>
            </label>
          </div>

          {/* Notes */}
          <div>
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

          {/* Gauging Method */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Gauging Method?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gaugingMethod"
                  value="volume"
                  checked={formData.gaugingMethod === 'volume'}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-orange-500 focus:ring-orange-500/20 focus:ring-2"
                />
                <span className="text-gray-700">Volume</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gaugingMethod"
                  value="weight"
                  checked={formData.gaugingMethod === 'weight'}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-orange-500 focus:ring-orange-500/20 focus:ring-2"
                />
                <span className="text-gray-700">Weight</span>
              </label>
            </div>
          </div>

          {/* Owner */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Owner
            </label>
            <select
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="">Select owner...</option>
              {owners.map((owner) => (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              ))}
            </select>
          </div>

          {/* Consumable Materials Section */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Consumable Materials</h2>
            <p className="text-sm text-gray-600 mb-4">
              If 'Units Consumed' is red then you are consuming more units than are in inventory. This will impact cost accounting. You may use the 'Unit Multiplier' to quickly multiply all unit suggestions by a scale factor if required.
            </p>
            <div className="mb-4">
              <button
                type="button"
                onClick={handleEnterReceipt}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                + Enter Receipt
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Material</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Lot # / Exp Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Warehouse</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Measurement Unit</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Inventory Units</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Units Consumed</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Cost / Unit</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Total Cost</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {consumableMaterials.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-4 py-4 text-center text-gray-400">
                        No consumable materials added yet
                      </td>
                    </tr>
                  ) : (
                    consumableMaterials.map((material, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{material.material}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{material.lotNumber}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{material.warehouse}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{material.unit}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{material.inventoryUnits}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{material.unitsConsumed}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{material.costPerUnit}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{material.totalCost}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-2">
              <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-orange-500">
                <option>Select...</option>
                <option>Material 1</option>
                <option>Material 2</option>
              </select>
              <button
                type="button"
                onClick={handleAddSelectedMaterial}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Add Selected As Additional Material
              </button>
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

export default NewFill
