import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateInventoryItem() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    units: '0.00',
    rawMaterial: '',
    lotNumber: '',
    firstReceiptDate: '',
    expirationDate: '',
    costPerUnit: '0.000000',
    lotCost: '0.00',
    warehouse: 'Default Warehouse'
  })

  // Sample raw materials - in production, this would come from the database
  const rawMaterials = [
    '375 ml bottle white',
    '750 ml bottle clear',
    'Cork',
    'Label',
    'Box',
    'Grain',
    'Yeast',
    'Water'
  ]

  // Sample warehouses - in production, this would come from the database
  const warehouses = [
    'Default Warehouse',
    'Main Warehouse',
    'Secondary Warehouse',
    'Cold Storage'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Example: Save to DynamoDB
      // Uncomment and configure when ready:
      /*
      import dynamoDBService from '../../services/dynamodb'
      
      const inventoryItemData = {
        id: crypto.randomUUID(), // Generate unique ID
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      await dynamoDBService.putItem(
        import.meta.env.VITE_TABLE_STARTING_RAW_MATERIALS || 'starting-raw-materials',
        inventoryItemData
      )
      */
      
      console.log('Form submitted:', formData)
      navigate('/settings/starting-raw-materials')
    } catch (error) {
      console.error('Error saving inventory item:', error)
      alert('Failed to save inventory item. Please try again.')
    }
  }

  const handleCancel = () => {
    navigate('/settings/starting-raw-materials')
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
          Create Inventory Item
        </h1>
      </div>

      {/* Form Container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 shadow-2xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Units Field */}
              <div>
                <label htmlFor="units" className="block text-white font-semibold mb-3">
                  Units
                </label>
                <input
                  type="number"
                  id="units"
                  name="units"
                  value={formData.units}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                  placeholder="0.00"
                />
              </div>

              {/* Raw Material Field */}
              <div>
                <label htmlFor="rawMaterial" className="block text-white font-semibold mb-3">
                  Raw Material <span className="text-red-400">*</span>
                </label>
                <select
                  id="rawMaterial"
                  name="rawMaterial"
                  value={formData.rawMaterial}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                >
                  <option value="">Select a Raw Material</option>
                  {rawMaterials.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lot Number Field */}
              <div>
                <label htmlFor="lotNumber" className="block text-white font-semibold mb-3">
                  Lot Number
                </label>
                <input
                  type="text"
                  id="lotNumber"
                  name="lotNumber"
                  value={formData.lotNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                  placeholder="Enter lot number"
                />
              </div>

              {/* First Receipt Date Field */}
              <div>
                <label htmlFor="firstReceiptDate" className="block text-white font-semibold mb-3">
                  First Receipt Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="firstReceiptDate"
                    name="firstReceiptDate"
                    value={formData.firstReceiptDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200 pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-accent-gold transition-colors"
                      onClick={() => setFormData(prev => ({ ...prev, firstReceiptDate: new Date().toISOString().split('T')[0] }))}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Expiration Date Field */}
              <div>
                <label htmlFor="expirationDate" className="block text-white font-semibold mb-3">
                  Expiration Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200 pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-accent-gold transition-colors"
                      onClick={() => setFormData(prev => ({ ...prev, expirationDate: new Date().toISOString().split('T')[0] }))}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Cost Per Unit Field */}
              <div>
                <label htmlFor="costPerUnit" className="block text-white font-semibold mb-3">
                  CostPerUnit
                </label>
                <input
                  type="number"
                  id="costPerUnit"
                  name="costPerUnit"
                  value={formData.costPerUnit}
                  onChange={handleInputChange}
                  step="0.000001"
                  min="0"
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                  placeholder="0.000000"
                />
              </div>

              {/* Lot Cost Field */}
              <div>
                <label htmlFor="lotCost" className="block text-white font-semibold mb-3">
                  Lot Cost
                </label>
                <input
                  type="number"
                  id="lotCost"
                  name="lotCost"
                  value={formData.lotCost}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                  placeholder="0.00"
                />
              </div>

              {/* Warehouse Field */}
              <div>
                <label htmlFor="warehouse" className="block text-white font-semibold mb-3">
                  Warehouse
                </label>
                <select
                  id="warehouse"
                  name="warehouse"
                  value={formData.warehouse}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                >
                  {warehouses.map((warehouse) => (
                    <option key={warehouse} value={warehouse}>
                      {warehouse}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-accent-blue/30">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-xl hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateInventoryItem



