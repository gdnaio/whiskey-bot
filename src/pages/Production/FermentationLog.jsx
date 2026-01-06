import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function FermentationLog() {
  const navigate = useNavigate()
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)

  // Sample fermentation log data from the image
  const fermentationLogs = [
    { id: 382698, timestamp: '11-05-2025 1:45:00 PM', cookNumber: 583, lotName: '', fermenter: 'F3', mashBill: 'Bourbon', gal: 3566.32, strippedDate: '11-10-2025 1:52:00 PM', totalDays: 5.00, totalHours: 120.1, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 382697, timestamp: '11-04-2025 1:45:00 PM', cookNumber: 582, lotName: '', fermenter: 'F2', mashBill: 'Bourbon', gal: 3566.32, strippedDate: '11-09-2025 1:51:00 PM', totalDays: 5.00, totalHours: 120.1, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 382695, timestamp: '11-03-2025 1:45:00 PM', cookNumber: 581, lotName: '', fermenter: 'F1', mashBill: 'Bourbon', gal: 3566.32, strippedDate: '11-08-2025 1:50:00 PM', totalDays: 5.00, totalHours: 120.1, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380381, timestamp: '09-03-2025 10:17:00 AM', cookNumber: 580, lotName: '', fermenter: 'F3', mashBill: 'Danko Rye', gal: 2377.55, strippedDate: '09-10-2025 10:19:00 AM', totalDays: 7.00, totalHours: 168.0, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380380, timestamp: '09-02-2025 10:17:00 AM', cookNumber: 579, lotName: '', fermenter: 'F2', mashBill: 'Danko Rye', gal: 2377.55, strippedDate: '09-09-2025 10:18:00 AM', totalDays: 7.00, totalHours: 168.0, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380379, timestamp: '09-01-2025 10:17:00 AM', cookNumber: 578, lotName: '', fermenter: 'F1', mashBill: 'Danko Rye', gal: 2377.55, strippedDate: '09-08-2025 10:18:00 AM', totalDays: 7.00, totalHours: 168.0, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380378, timestamp: '08-31-2025 10:17:00 AM', cookNumber: 577, lotName: '', fermenter: 'F3', mashBill: 'Vodka', gal: 3566.32, strippedDate: '09-03-2025 10:18:00 AM', totalDays: 3.08, totalHours: 73.9, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380377, timestamp: '08-30-2025 10:17:00 AM', cookNumber: 576, lotName: '', fermenter: 'F2', mashBill: 'Vodka', gal: 3566.32, strippedDate: '09-02-2025 10:18:00 AM', totalDays: 3.08, totalHours: 73.9, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380376, timestamp: '08-29-2025 10:17:00 AM', cookNumber: 575, lotName: '', fermenter: 'F1', mashBill: 'Vodka', gal: 3566.32, strippedDate: '09-01-2025 10:18:00 AM', totalDays: 3.08, totalHours: 73.9, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380375, timestamp: '08-28-2025 10:17:00 AM', cookNumber: 574, lotName: '', fermenter: 'F3', mashBill: 'Wheat whiskey', gal: 500.00, strippedDate: '09-01-2025 10:18:00 AM', totalDays: 4.00, totalHours: 96.0, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380374, timestamp: '08-27-2025 10:17:00 AM', cookNumber: 573, lotName: '', fermenter: 'F2', mashBill: 'Wheat whiskey', gal: 500.00, strippedDate: '08-31-2025 10:18:00 AM', totalDays: 4.00, totalHours: 96.0, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380373, timestamp: '08-26-2025 10:17:00 AM', cookNumber: 572, lotName: '', fermenter: 'F1', mashBill: 'Wheat whiskey', gal: 500.00, strippedDate: '08-30-2025 10:18:00 AM', totalDays: 4.00, totalHours: 96.0, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380372, timestamp: '08-25-2025 10:17:00 AM', cookNumber: 571, lotName: '', fermenter: 'F3', mashBill: 'Agave Spirit', gal: 3724.82, strippedDate: '09-08-2025 10:18:00 AM', totalDays: 9.82, totalHours: 235.6, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380371, timestamp: '08-24-2025 10:17:00 AM', cookNumber: 570, lotName: '', fermenter: 'F2', mashBill: 'Agave Spirit', gal: 3724.82, strippedDate: '09-07-2025 10:18:00 AM', totalDays: 9.82, totalHours: 235.6, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380370, timestamp: '08-23-2025 10:17:00 AM', cookNumber: 569, lotName: '', fermenter: 'F1', mashBill: 'Agave Spirit', gal: 3724.82, strippedDate: '09-06-2025 10:18:00 AM', totalDays: 9.82, totalHours: 235.6, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380369, timestamp: '08-22-2025 10:17:00 AM', cookNumber: 568, lotName: '', fermenter: 'F3', mashBill: 'Bourbon Barrel Gin', gal: 3566.32, strippedDate: '09-05-2025 10:18:00 AM', totalDays: 14.01, totalHours: 336.2, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380368, timestamp: '08-21-2025 10:17:00 AM', cookNumber: 567, lotName: '', fermenter: 'F2', mashBill: 'Bourbon Barrel Gin', gal: 3566.32, strippedDate: '09-04-2025 10:18:00 AM', totalDays: 14.01, totalHours: 336.2, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380367, timestamp: '08-20-2025 10:17:00 AM', cookNumber: 566, lotName: '', fermenter: 'F1', mashBill: 'Bourbon Barrel Gin', gal: 3566.32, strippedDate: '09-03-2025 10:18:00 AM', totalDays: 14.01, totalHours: 336.2, startSG: '', potential1: '', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'mitch@charlestondistill...', obs: true, fileArchive: '' },
    { id: 380366, timestamp: '08-19-2025 10:17:00 AM', cookNumber: 565, lotName: '', fermenter: 'F3', mashBill: 'Bourbon', gal: 3566.32, strippedDate: '08-24-2025 10:18:00 AM', totalDays: 5.00, totalHours: 120.1, startSG: '1.0568', potential1: '14.9', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'carl@charlestondistillin...', obs: true, fileArchive: '' },
    { id: 380365, timestamp: '08-18-2025 10:17:00 AM', cookNumber: 564, lotName: '', fermenter: 'F2', mashBill: 'Bourbon', gal: 3566.32, strippedDate: '08-23-2025 10:18:00 AM', totalDays: 5.00, totalHours: 120.1, startSG: '1.0463', potential1: '12.1', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'carl@charlestondistillin...', obs: true, fileArchive: '' },
    { id: 380364, timestamp: '08-17-2025 10:17:00 AM', cookNumber: 563, lotName: '', fermenter: 'F1', mashBill: 'Bourbon', gal: 3566.32, strippedDate: '08-22-2025 10:18:00 AM', totalDays: 5.00, totalHours: 120.1, startSG: '1.0442', potential1: '11.6', potential2: '', laborHours: 0.00, totalValue: 0.00, user: 'carl@charlestondistillin...', obs: true, fileArchive: '' },
    // Add more rows to reach 551 total items (simulating full dataset)
    ...Array.from({ length: 530 }, (_, i) => ({
      id: 380363 - i,
      timestamp: `08-${16 - Math.floor(i / 3)}-2025 10:17:00 AM`,
      cookNumber: 562 - i,
      lotName: '',
      fermenter: ['F1', 'F2', 'F3'][i % 3],
      mashBill: ['Bourbon', 'Vodka', 'Danko Rye', 'Gin', 'Rum'][i % 5],
      gal: [3566.32, 2377.55, 500.00, 3724.82][i % 4],
      strippedDate: `08-${21 - Math.floor(i / 3)}-2025 10:18:00 AM`,
      totalDays: [5.00, 7.00, 3.08, 4.00, 9.82, 14.01][i % 6],
      totalHours: [120.1, 168.0, 73.9, 96.0, 235.6, 336.2][i % 6],
      startSG: i % 10 === 0 ? '1.0568' : '',
      potential1: i % 10 === 0 ? '14.9' : '',
      potential2: '',
      laborHours: 0.00,
      totalValue: 0.00,
      user: i % 2 === 0 ? 'mitch@charlestondistill...' : 'carl@charlestondistillin...',
      obs: true,
      fileArchive: ''
    }))
  ]

  const totalItems = fermentationLogs.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = fermentationLogs.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const formatNumber = (num) => {
    if (num === '' || num === null || num === undefined) return ''
    return typeof num === 'number' ? num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : num
  }

  const formatCurrency = (num) => {
    if (num === '' || num === null || num === undefined) return '$0.00'
    return typeof num === 'number' ? `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : num
  }

  const handleDetails = (id) => {
    console.log('View details for:', id)
    // TODO: Navigate to details page
  }

  const handleEdit = (id) => {
    console.log('Edit:', id)
    // TODO: Navigate to edit page
  }

  const handleObs = (id) => {
    console.log('View observations for:', id)
    // TODO: Open observations modal/page
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fermentation log entry?')) {
      console.log('Delete:', id)
      // TODO: Implement delete functionality
    }
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 10
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) pages.push('...')
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-accent-gold">Fermentation Log</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/production/new-fermentation')}
            className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            ADD NEW COOK
          </button>
          <button className="px-4 py-2 bg-primary-DEFAULT border border-accent-blue text-gray-300 rounded hover:bg-primary-light transition-smooth font-medium">
            GRID ACTIONS...
            <svg className="inline-block ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-4 py-2 bg-primary-DEFAULT border border-accent-blue text-gray-300 rounded hover:bg-primary-light transition-smooth font-medium">
            EXPORT...
            <svg className="inline-block ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-primary-light rounded-lg border border-accent-blue shadow-lg overflow-hidden">
        <div className="overflow-x-auto main-content-scrollbar">
          <table className="min-w-full divide-y divide-accent-blue">
            <thead className="bg-primary-DEFAULT">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Commands
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Timestamp
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Cook Number
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Lot Name
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Fermenter
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Mash Bill
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Gal
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Stripped Date
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Total Days
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Total Hours
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Start SG
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Potential...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Potential...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Labor Hours
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Total Value
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    User
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Obs
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  File Archive
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light divide-y divide-accent-blue">
              {currentItems.map((log) => (
                <tr key={log.id} className="hover:bg-primary-DEFAULT/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDetails(log.id)}
                        className="text-accent-blue hover:text-accent-gold transition-colors"
                      >
                        Details
                      </button>
                      <span className="text-gray-500">|</span>
                      <button
                        onClick={() => handleEdit(log.id)}
                        className="text-accent-blue hover:text-accent-gold transition-colors"
                      >
                        Edit
                      </button>
                      <span className="text-gray-500">|</span>
                      <button
                        onClick={() => handleObs(log.id)}
                        className="text-accent-blue hover:text-accent-gold transition-colors"
                      >
                        Obs
                      </button>
                      <span className="text-gray-500">|</span>
                      <button
                        onClick={() => handleDelete(log.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.timestamp}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.cookNumber}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.lotName || ''}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.fermenter}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.mashBill}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.gal)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.strippedDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.totalDays)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.totalHours)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.startSG || ''}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.potential1 || ''}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.potential2 || ''}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.laborHours)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{formatCurrency(log.totalValue)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{log.user}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {log.obs && (
                      <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    <select className="bg-primary-dark border border-accent-blue/50 rounded text-gray-300 text-xs px-2 py-1 focus:outline-none focus:border-accent-gold">
                      <option>Select Option...</option>
                      <option>Archive</option>
                      <option>Download</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-primary-DEFAULT border-t border-accent-blue">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={typeof page !== 'number'}
                className={`px-3 py-1 rounded transition-colors ${
                  page === currentPage
                    ? 'bg-accent-gold text-primary-dark font-semibold'
                    : typeof page === 'number'
                    ? 'bg-accent-blue text-gray-300 hover:bg-accent-blue-light'
                    : 'text-gray-400 cursor-default'
                } ${typeof page !== 'number' ? 'cursor-default' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 text-gray-300 mb-2 sm:mb-0">
            <span>
              Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
            </span>
            <div className="flex items-center space-x-2">
              <span>Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-primary-light border border-accent-blue rounded text-gray-900 focus:outline-none focus:border-accent-gold px-2 py-1"
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <span className="font-semibold">
              {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FermentationLog
