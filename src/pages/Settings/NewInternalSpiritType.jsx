import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewInternalSpiritType() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    internalSpiritType: '',
    quickbooksInternalSpiritType: '',
    skuPartNumber: '',
    reportingColumn: '',
    whiskeyKind: '',
    reportingLineProductionSectionIV: '',
    reportingLineProcessingSectionIV: '',
    reportingLineProductionSectionII: '',
    importedSpirit: false,
    bottledAsImported: false,
    reportingLineProcessingSectionIII: '',
    treatAsWineInProcessingBulk: false,
    sortOrder: '1',
    defaultHeartsAccount: 'Storage'
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement actual submission logic
    console.log('Form submitted:', formData)
    navigate('/settings/internal-spirit-types')
  }

  const handleCancel = () => {
    navigate('/settings/internal-spirit-types')
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
          Create Internal Spirit Type
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Description Section */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-dark to-primary-light border border-accent-blue/30 p-6">
            <p className="text-gray-300 leading-relaxed">
              Spirit Types are any Spirit or Alcohol Liquids in your distillery including spirits created off the still, 
              redistilled spirits, spirits transferred in bond, or blended or flavored spirits that are made with other spirits 
              in your distillery. Be as specific as possible to differentiate the different liquid spirit types in your distillery. 
              Examples are 'Bourbon', 'Vodka', 'Gin', 'GNS', 'Cherry Moonshine', 'Apple Flavored Vodka', etc.
            </p>
          </div>

          {/* Protection/Validation Info */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-dark to-primary-light border border-accent-blue/30 p-6">
            <h3 className="text-white font-semibold mb-3">Spirit Type Setup Protections/Validations</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              If you choose a Reporting Column of "Whiskey160AndOver" or "WhiskeyOver160", you must choose a "Whiskey Kind (If Whiskey)". 
              If you choose a Reporting Column of "Brandy170AndUnder" or "BrandyOver170", you must choose a "Reporting Line: Production Section IV (If Brandy)". 
              You can only choose a "Reporting Line: Production Section II (If Neutral Spirit >190 PF)" if your Reporting Column is "Spirits190AndOver". 
              You can only choose a "Reporting Line: Processing Section III (Line 48 Imported Spirits Category)" if your Reporting Column is "Rum".
            </p>
          </div>

          {/* Basic Information */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
            <div className="relative space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
              
              <div>
                <label className="block text-white font-semibold mb-3">
                  Internal Spirit Type <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="internalSpiritType"
                  value={formData.internalSpiritType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  placeholder="e.g., Bourbon, Vodka, Gin"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">
                  Quickbooks Internal Spirit Type
                </label>
                <select
                  name="quickbooksInternalSpiritType"
                  value={formData.quickbooksInternalSpiritType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                >
                  <option value="">Select...</option>
                  <option value="1">Spirit Type 1</option>
                  <option value="2">Spirit Type 2</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">
                  SKU/Part#
                </label>
                <input
                  type="text"
                  name="skuPartNumber"
                  value={formData.skuPartNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  placeholder="Enter SKU or Part Number"
                />
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
          </div>

          {/* Reporting Information */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
            <div className="relative space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Reporting Information</h2>
              
              <div>
                <label className="block text-white font-semibold mb-3">
                  Reporting Column
                </label>
                <div className="flex items-center gap-2">
                  <select
                    name="reportingColumn"
                    value={formData.reportingColumn}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  >
                    <option value="">Select...</option>
                    <option value="Whiskey160AndUnder">Whiskey160AndUnder</option>
                    <option value="WhiskeyOver160">WhiskeyOver160</option>
                    <option value="Whiskey160AndOver">Whiskey160AndOver</option>
                    <option value="Brandy170AndUnder">Brandy170AndUnder</option>
                    <option value="BrandyOver170">BrandyOver170</option>
                    <option value="Rum">Rum</option>
                    <option value="Gin">Gin</option>
                    <option value="Vodka">Vodka</option>
                    <option value="Spirits190AndOver">Spirits190AndOver</option>
                    <option value="SpiritsUnder190">SpiritsUnder190</option>
                    <option value="Other">Other</option>
                    <option value="Wine">Wine</option>
                  </select>
                  <button
                    type="button"
                    className="p-3 text-gray-400 hover:text-accent-gold transition-colors"
                    title="Information"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {(formData.reportingColumn === 'Whiskey160AndOver' || formData.reportingColumn === 'WhiskeyOver160') && (
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Whiskey Kind (If Whiskey)
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      name="whiskeyKind"
                      value={formData.whiskeyKind}
                      onChange={handleInputChange}
                      required
                      className="flex-1 px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                    >
                      <option value="">Select...</option>
                      <option value="Bourbon">Bourbon</option>
                      <option value="Corn">Corn</option>
                      <option value="Rye">Rye</option>
                      <option value="Light">Light</option>
                      <option value="Wheat">Wheat</option>
                      <option value="BlendedStraightWhiskey">BlendedStraightWhiskey</option>
                      <option value="BlendedWhiskeyWNeutralSpirits">BlendedWhiskeyWNeutralSpirits</option>
                      <option value="BlendedWhiskeyWLightWhiskey">BlendedWhiskeyWLightWhiskey</option>
                      <option value="BlendedLightWhiskey">BlendedLightWhiskey</option>
                      <option value="AnyOtherWhiskeyBlends">AnyOtherWhiskeyBlends</option>
                      <option value="ImportedWhiskeyScotch">ImportedWhiskeyScotch</option>
                      <option value="ImportedWhiskeyCanadian">ImportedWhiskeyCanadian</option>
                      <option value="ImportedWhiskeyIrishOthers">ImportedWhiskeyIrishOthers</option>
                      <option value="DomesticWhiskey160AndUnder">DomesticWhiskey160AndUnder</option>
                      <option value="DomesticWhiskeyOver160">DomesticWhiskeyOver160</option>
                      <option value="Brandy170AndUnder">Brandy170AndUnder</option>
                      <option value="BrandyOver170">BrandyOver170</option>
                      <option value="RumPuertoRican">RumPuertoRican</option>
                      <option value="RumVirginIslands">RumVirginIslands</option>
                      <option value="RumDomestic">RumDomestic</option>
                      <option value="RumOther">RumOther</option>
                      <option value="Gin">Gin</option>
                      <option value="Vodka">Vodka</option>
                      <option value="CordialsLiqueursSpecialties">CordialsLiqueursSpecialties</option>
                      <option value="Cocktails">Cocktails</option>
                      <option value="Tequila">Tequila</option>
                      <option value="Other">Other</option>
                      <option value="Wine">Wine</option>
                      <option value="NeutralSpiritsNonVodka">NeutralSpiritsNonVodka</option>
                      <option value="GrapeBrandy">GrapeBrandy</option>
                      <option value="AllOtherBrandy">AllOtherBrandy</option>
                      <option value="NeutralGrapeBrandy">NeutralGrapeBrandy</option>
                      <option value="AllOtherNeutralBrandy">AllOtherNeutralBrandy</option>
                    </select>
                    <button
                      type="button"
                      className="px-4 py-3 bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 text-gray-300 rounded-xl hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-200 font-medium"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              )}

              {(formData.reportingColumn === 'Brandy170AndUnder' || formData.reportingColumn === 'BrandyOver170') && (
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Reporting Line: Production Section IV (If Brandy)
                  </label>
                  <select
                    name="reportingLineProductionSectionIV"
                    value={formData.reportingLineProductionSectionIV}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  >
                    <option value="">Select...</option>
                    <option value="GrapeBrandy">GrapeBrandy</option>
                    <option value="AllOtherBrandy">AllOtherBrandy</option>
                    <option value="NeutralGrapeBrandy">NeutralGrapeBrandy</option>
                    <option value="AllOtherNeutralBrandy">AllOtherNeutralBrandy</option>
                  </select>
                </div>
              )}

              {formData.reportingColumn === 'Spirits190AndOver' && (
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Reporting Line: Production Section II (If Neutral Spirit >190 PF)
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      name="reportingLineProductionSectionII"
                      value={formData.reportingLineProductionSectionII}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                    >
                      <option value="">Select...</option>
                      <option value="NeutralSpiritsNonVodka">NeutralSpiritsNonVodka</option>
                      <option value="Vodka">Vodka</option>
                    </select>
                    <button
                      type="button"
                      className="p-3 text-gray-400 hover:text-accent-gold transition-colors"
                      title="Information"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-white font-semibold mb-3">
                  Reporting Line: Processing Section IV (Spirit Type Dumped or Created for Bottling)
                </label>
                <select
                  name="reportingLineProcessingSectionIV"
                  value={formData.reportingLineProcessingSectionIV}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                >
                  <option value="">Select...</option>
                  <option value="1">Processing Option 1</option>
                  <option value="2">Processing Option 2</option>
                </select>
              </div>
            </div>
          </div>

          {/* Imported Spirit Options */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
            <div className="relative space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Imported Spirit Options</h2>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="importedSpirit"
                  name="importedSpirit"
                  checked={formData.importedSpirit}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded text-accent-gold focus:ring-accent-gold"
                />
                <div className="flex items-center gap-2 flex-1">
                  <label htmlFor="importedSpirit" className="text-white font-semibold cursor-pointer">
                    Imported Spirit
                  </label>
                  <button
                    type="button"
                    className="p-1 text-gray-400 hover:text-accent-gold transition-colors"
                    title="Information"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="bottledAsImported"
                  name="bottledAsImported"
                  checked={formData.bottledAsImported}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded text-accent-gold focus:ring-accent-gold"
                />
                <div className="flex items-center gap-2 flex-1">
                  <label htmlFor="bottledAsImported" className="text-white font-semibold cursor-pointer">
                    Bottled as Imported
                  </label>
                  <button
                    type="button"
                    className="p-1 text-gray-400 hover:text-accent-gold transition-colors"
                    title="Information"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {formData.reportingColumn === 'Rum' && (
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Reporting Line: Processing Section III (Line 48 Imported Spirits Category)
                  </label>
                  <select
                    name="reportingLineProcessingSectionIII"
                    value={formData.reportingLineProcessingSectionIII}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  >
                    <option value="">Select...</option>
                    <option value="PuertoRicanSpirits">PuertoRicanSpirits</option>
                    <option value="VirginislandsSpirits">VirginislandsSpirits</option>
                    <option value="OtherimportedRum">OtherimportedRum</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Additional Options */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
            <div className="relative space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Additional Options</h2>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="treatAsWineInProcessingBulk"
                  name="treatAsWineInProcessingBulk"
                  checked={formData.treatAsWineInProcessingBulk}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded text-accent-gold focus:ring-accent-gold"
                />
                <label htmlFor="treatAsWineInProcessingBulk" className="text-white font-semibold cursor-pointer">
                  Treat as wine in processing bulk
                </label>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">
                  Default Hearts Account
                </label>
                <select
                  name="defaultHeartsAccount"
                  value={formData.defaultHeartsAccount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                >
                  <option value="Storage">Storage</option>
                  <option value="Processing Bulk">Processing Bulk</option>
                  <option value="Production">Production</option>
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
    </div>
  )
}

export default NewInternalSpiritType

