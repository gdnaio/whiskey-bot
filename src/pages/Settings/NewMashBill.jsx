import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import dynamoDBService from '../../services/dynamodb'

function NewMashBill() {
  const navigate = useNavigate()
  const location = useLocation()
  const editData = location.state?.edit
  
  const [formData, setFormData] = useState({
    mashBillName: '',
    batchSize: '',
    unit: 'gallons', // 'gallons' or 'liters'
    targetStartSG: '1.0698',
    targetStartBrix: '17.00',
    targetEndSG: '1.0000',
    targetEndBrix: '0.00',
    internalSpiritTypeID: '',
    sortOrder: '1'
  })
  const [ingredients, setIngredients] = useState([])

  // Load edit data if available
  useEffect(() => {
    if (editData) {
      setFormData({
        mashBillName: editData.mashBillName || '',
        batchSize: editData.batchSize?.toString() || '',
        unit: editData.unit || 'gallons',
        targetStartSG: editData.targetStartSG?.toString() || '1.0698',
        targetStartBrix: editData.targetStartBrix?.toString() || '17.00',
        targetEndSG: editData.targetEndSG?.toString() || '1.0000',
        targetEndBrix: editData.targetEndBrix?.toString() || '0.00',
        internalSpiritTypeID: editData.internalSpiritTypeID || '',
        sortOrder: editData.sortOrder?.toString() || '1'
      })
      setIngredients(editData.ingredients || [])
    }
  }, [editData])

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
      unit: prev.unit === 'gallons' ? 'liters' : 'gallons'
    }))
  }

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { rawMaterial: '', unitsInBatch: '' }])
  }

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients]
    updated[index][field] = value
    setIngredients(updated)
  }

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const mashBillData = {
        id: editData?.id || crypto.randomUUID(),
        mashBillName: formData.mashBillName,
        batchSize: Number(formData.batchSize) || 0,
        unit: formData.unit,
        targetStartSG: Number(formData.targetStartSG) || 0,
        targetStartBrix: Number(formData.targetStartBrix) || 0,
        targetEndSG: Number(formData.targetEndSG) || 0,
        targetEndBrix: Number(formData.targetEndBrix) || 0,
        internalSpiritTypeID: formData.internalSpiritTypeID || '',
        sortOrder: Number(formData.sortOrder) || 1,
        ingredients: ingredients.map(ing => ({
          rawMaterial: ing.rawMaterial,
          unitsInBatch: Number(ing.unitsInBatch) || 0
        })),
        updatedAt: new Date().toISOString(),
      }
      
      if (!editData) {
        mashBillData.createdAt = new Date().toISOString()
      }
      
      await dynamoDBService.putItem('mash_bills', mashBillData)
      navigate('/settings/mash-bills')
    } catch (error) {
      console.error('Error saving mash bill:', error)
      alert(`Failed to save mash bill: ${error.message}`)
    }
  }

  const handleCancel = () => {
    navigate('/settings/mash-bills')
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
          Create Mash Bill
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Mash Bill Name */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <label className="block text-white font-semibold mb-3">
                Mash Bill Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="mashBillName"
                value={formData.mashBillName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                placeholder="Enter mash bill name"
              />
            </div>
          </div>

          {/* Batch Size */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <label className="block text-white font-semibold mb-3">
                Batch Size
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  name="batchSize"
                  value={formData.batchSize}
                  onChange={handleInputChange}
                  step="0.01"
                  className="flex-1 px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  placeholder="0.00"
                />
                <div className="flex items-center gap-2 bg-primary-dark border border-accent-blue/50 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={handleUnitToggle}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      formData.unit === 'gallons'
                        ? 'bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark'
                        : 'text-gray-300 hover:text-accent-gold'
                    }`}
                  >
                    Gallons
                  </button>
                  <button
                    type="button"
                    onClick={handleUnitToggle}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      formData.unit === 'liters'
                        ? 'bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark'
                        : 'text-gray-300 hover:text-accent-gold'
                    }`}
                  >
                    Liters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Yield Calculations Info */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-dark to-primary-light border border-accent-blue/30 p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-accent-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-gray-300 font-medium mb-1">Estimated Yield Calculations</p>
                <p className="text-gray-400 text-sm">
                  Enter the below to enable estimated yield calculations. Yield efficiency is configured in Setup under Advanced Settings.
                </p>
              </div>
            </div>
          </div>

          {/* Target Start SG/Brix */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <label className="block text-white font-semibold mb-4">
                Target Start SG/Brix
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">SG</label>
                  <input
                    type="number"
                    name="targetStartSG"
                    value={formData.targetStartSG}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  />
                </div>
                <div className="flex items-end">
                  <span className="text-gray-400 mb-3">Or</span>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Brix</label>
                  <input
                    type="number"
                    name="targetStartBrix"
                    value={formData.targetStartBrix}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Target End SG/Brix */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <label className="block text-white font-semibold mb-4">
                Target End SG/Brix
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">SG</label>
                  <input
                    type="number"
                    name="targetEndSG"
                    value={formData.targetEndSG}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  />
                </div>
                <div className="flex items-end">
                  <span className="text-gray-400 mb-3">Or</span>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Brix</label>
                  <input
                    type="number"
                    name="targetEndBrix"
                    value={formData.targetEndBrix}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Internal SpiritTypeID */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Internal SpiritTypeID
                  </label>
                  <select
                    name="internalSpiritTypeID"
                    value={formData.internalSpiritTypeID}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  >
                    <option value="">Select...</option>
                    <option value="1">Whiskey</option>
                    <option value="2">Bourbon</option>
                    <option value="3">Rye</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    name="sortOrder"
                    value={formData.sortOrder}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  />
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Internal Spirit Types are flexible and can be used to represent different types of spirits, 
                fermentation types, or any other categorization that makes sense for your operation. 
                You can create and manage these in Settings under Internal Spirit Types.
              </p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Ingredients</h2>
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="px-5 py-2.5 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-xl hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold shadow-lg shadow-accent-gold/20 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New
                </button>
              </div>

              {ingredients.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-accent-blue/30">
                    <thead className="bg-gradient-to-r from-primary-dark to-primary-light">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                          Raw Material
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                          Units in Batch
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-primary-dark/50 divide-y divide-accent-blue/20">
                      {ingredients.map((ingredient, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={ingredient.rawMaterial}
                              onChange={(e) => handleIngredientChange(index, 'rawMaterial', e.target.value)}
                              className="w-full px-3 py-2 bg-primary-light border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                              placeholder="Select raw material"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={ingredient.unitsInBatch}
                              onChange={(e) => handleIngredientChange(index, 'unitsInBatch', e.target.value)}
                              step="0.01"
                              className="w-full px-3 py-2 bg-primary-light border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                              placeholder="0.00"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              onClick={() => handleRemoveIngredient(index)}
                              className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
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
                  <p className="text-gray-400">No ingredients added yet. Click "Add New" to get started.</p>
                </div>
              )}
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
    </div>
  )
}

export default NewMashBill

