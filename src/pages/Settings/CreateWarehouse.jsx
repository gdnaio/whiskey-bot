import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import dynamoDBService from '../../services/dynamodb'
import useUserId from '../../hooks/useUserId'

function CreateWarehouse() {
  const navigate = useNavigate()
  const location = useLocation()
  const editData = location.state?.edit
  const userId = useUserId()
  
  const [formData, setFormData] = useState({
    // Warehouse Section
    name: '',
    taxPaid: false,
    sortOrder: '1',
    // Address Section
    addressName: '',
    contact: '',
    email: '',
    url: '',
    address1: '',
    address2: '',
    city: '',
    stateRegion: '',
    zipCode: '',
    country: '',
    phone: '',
    fax: '',
    note: ''
  })

  // Load edit data if available
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        taxPaid: editData.taxPaid || false,
        sortOrder: editData.sortOrder?.toString() || '1',
        addressName: editData.addressName || '',
        contact: editData.contact || '',
        email: editData.email || '',
        url: editData.url || '',
        address1: editData.address1 || '',
        address2: editData.address2 || '',
        city: editData.city || '',
        stateRegion: editData.stateRegion || '',
        zipCode: editData.zipCode || '',
        country: editData.country || '',
        phone: editData.phone || '',
        fax: editData.fax || '',
        note: editData.note || ''
      })
    }
  }, [editData])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const warehouseData = {
        id: editData?.id || crypto.randomUUID(), // Generate unique ID
        name: formData.name,
        taxPaid: formData.taxPaid,
        sortOrder: Number(formData.sortOrder) || 1,
        // Address fields
        addressName: formData.addressName || '',
        contact: formData.contact || '',
        email: formData.email || '',
        url: formData.url || '',
        address1: formData.address1 || '',
        address2: formData.address2 || '',
        city: formData.city || '',
        stateRegion: formData.stateRegion || '',
        zipCode: formData.zipCode || '',
        country: formData.country || '',
        phone: formData.phone || '',
        fax: formData.fax || '',
        note: formData.note || '',
        // Metadata
        updatedAt: new Date().toISOString(),
      }
      
      if (!editData) {
        warehouseData.createdAt = new Date().toISOString()
      }
      
      if (!userId) {
        alert('You must be signed in to save warehouses.')
        return
      }
      await dynamoDBService.putItem('warehouses', warehouseData, userId)
      
      // Navigate back to warehouses list
      navigate('/settings/warehouses')
    } catch (error) {
      console.error('Error saving warehouse:', error)
      alert(`Failed to save warehouse: ${error.message}`)
    }
  }

  const handleCancel = () => {
    navigate('/settings/warehouses')
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
          Create Warehouse
        </h1>
      </div>

      {/* Form Container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 shadow-2xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Warehouse Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Warehouse</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-3">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Enter warehouse name"
                  />
                </div>

                <div>
                  <label htmlFor="sortOrder" className="block text-white font-semibold mb-3">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    id="sortOrder"
                    name="sortOrder"
                    value={formData.sortOrder}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="taxPaid"
                      name="taxPaid"
                      checked={formData.taxPaid}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-accent-blue/50 bg-primary-dark text-accent-gold focus:ring-accent-gold/20 focus:ring-2"
                    />
                    <span className="text-white font-semibold">Tax Paid</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="pt-6 border-t border-accent-blue/30">
              <h2 className="text-2xl font-bold text-white mb-6">Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="addressName" className="block text-white font-semibold mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="addressName"
                    name="addressName"
                    value={formData.addressName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="contact" className="block text-white font-semibold mb-3">
                    Contact
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="url" className="block text-white font-semibold mb-3">
                    URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="address1" className="block text-white font-semibold mb-3">
                    Address1
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="address2" className="block text-white font-semibold mb-3">
                    Address2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-white font-semibold mb-3">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="stateRegion" className="block text-white font-semibold mb-3">
                    State/Region
                  </label>
                  <input
                    type="text"
                    id="stateRegion"
                    name="stateRegion"
                    value={formData.stateRegion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-white font-semibold mb-3">
                    ZipCode
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-white font-semibold mb-3">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-semibold mb-3">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="fax" className="block text-white font-semibold mb-3">
                    Fax
                  </label>
                  <input
                    type="tel"
                    id="fax"
                    name="fax"
                    value={formData.fax}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
                    placeholder="Optional"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="note" className="block text-white font-semibold mb-3">
                    Note
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200 resize-none"
                    placeholder="Optional"
                  />
                </div>
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
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Footer Status Messages */}
        <div className="mt-8 pt-6 border-t border-accent-blue/50 flex flex-wrap gap-6 text-sm px-6 pb-6 bg-gradient-to-r from-primary-dark to-primary-light">
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

export default CreateWarehouse


