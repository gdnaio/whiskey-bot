import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DistillationLog() {
  const navigate = useNavigate()
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)

  // Sample distillation log data from the image
  const distillationLogs = [
    { id: 545198, timestamp: '11-10-2025 1:52:00 PM', distillation: 728, lotName: '', internalSpiritType: 'Bourbon', pgFeints: 0.00, feintsAccount: 'NA', pgHeads: 0.00, headsAccount: 'NA', pgHearts: 0.00, heartsAccount: 'NA', pgTails: 0.00, tailsAccount: 'NA', pgLowWines: 463.87, lowWinesAccount: 'Production', inputPGProduc: 0.00, inputPGStorage: 0.00, inputPGProces: 0.00, totalLbsFermUsed: 6600.00 },
    { id: 545197, timestamp: '11-09-2025 1:51:00 PM', distillation: 727, lotName: '', internalSpiritType: 'Bourbon', pgFeints: 0.00, feintsAccount: 'NA', pgHeads: 0.00, headsAccount: 'NA', pgHearts: 0.00, heartsAccount: 'NA', pgTails: 0.00, tailsAccount: 'NA', pgLowWines: 463.87, lowWinesAccount: 'Production', inputPGProduc: 0.00, inputPGStorage: 0.00, inputPGProces: 0.00, totalLbsFermUsed: 6600.00 },
    { id: 545196, timestamp: '11-08-2025 1:50:00 PM', distillation: 726, lotName: '', internalSpiritType: 'Bourbon', pgFeints: 0.00, feintsAccount: 'NA', pgHeads: 0.00, headsAccount: 'NA', pgHearts: 0.00, heartsAccount: 'NA', pgTails: 0.00, tailsAccount: 'NA', pgLowWines: 463.87, lowWinesAccount: 'Production', inputPGProduc: 0.00, inputPGStorage: 0.00, inputPGProces: 0.00, totalLbsFermUsed: 6600.00 },
    { id: 542897, timestamp: '09-24-2025 5:14:00 PM', distillation: 725, lotName: '', internalSpiritType: 'Danko Rye', pgFeints: 0.00, feintsAccount: 'NA', pgHeads: 0.00, headsAccount: 'NA', pgHearts: 782.35, heartsAccount: 'Storage', pgTails: 0.00, tailsAccount: 'NA', pgLowWines: 0.00, lowWinesAccount: 'NA', inputPGProduc: 920.79, inputPGStorage: 0.00, inputPGProces: 0.00, totalLbsFermUsed: 6600.00 },
    { id: 542896, timestamp: '09-23-2025 5:13:00 PM', distillation: 724, lotName: '', internalSpiritType: 'Danko Rye', pgFeints: 0.00, feintsAccount: 'NA', pgHeads: 0.00, headsAccount: 'NA', pgHearts: 782.35, heartsAccount: 'Storage', pgTails: 0.00, tailsAccount: 'NA', pgLowWines: 0.00, lowWinesAccount: 'NA', inputPGProduc: 920.79, inputPGStorage: 0.00, inputPGProces: 0.00, totalLbsFermUsed: 6600.00 },
    { id: 542895, timestamp: '09-22-2025 5:12:00 PM', distillation: 723, lotName: '', internalSpiritType: 'Danko Rye', pgFeints: 0.00, feintsAccount: 'NA', pgHeads: 0.00, headsAccount: 'NA', pgHearts: 782.35, heartsAccount: 'Storage', pgTails: 0.00, tailsAccount: 'NA', pgLowWines: 0.00, lowWinesAccount: 'NA', inputPGProduc: 920.79, inputPGStorage: 0.00, inputPGProces: 0.00, totalLbsFermUsed: 6600.00 },
    { id: 541694, timestamp: '09-10-2025 10:19:00 AM', distillation: 722, lotName: '', internalSpiritType: 'Danko Rye', pgFeints: 0.00, feintsAccount: 'NA', pgHeads: 0.00, headsAccount: 'NA', pgHearts: 782.35, heartsAccount: 'Storage', pgTails: 0.00, tailsAccount: 'NA', pgLowWines: 0.00, lowWinesAccount: 'NA', inputPGProduc: 920.79, inputPGStorage: 0.00, inputPGProces: 0.00, totalLbsFermUsed: 4400.00 },
    { id: 541693, timestamp: '09-09-2025 10:18:00 AM', distillation: 721, lotName: '', internalSpiritType: 'Danko Rye', pgFeints: 0.00, feintsAccount: 'NA', pgHeads: 0.00, headsAccount: 'NA', pgHearts: 782.35, heartsAccount: 'Storage', pgTails: 0.00, tailsAccount: 'NA', pgLowWines: 0.00, lowWinesAccount: 'NA', inputPGProduc: 920.79, inputPGStorage: 0.00, inputPGProces: 0.00, totalLbsFermUsed: 4400.00 },
    { id: 541692, timestamp: '09-08-2025 10:18:00 AM', distillation: 720, lotName: '', internalSpiritType: 'Danko Rye', pgFeints: 0.00, feintsAccount: 'NA', pgHeads: 0.00, headsAccount: 'NA', pgHearts: 488.24, heartsAccount: 'Storage', pgTails: 0.00, tailsAccount: 'NA', pgLowWines: 0.00, lowWinesAccount: 'NA', inputPGProduc: 573.64, inputPGStorage: 0.00, inputPGProces: 0.00, totalLbsFermUsed: 0.00 },
    { id: 540694, timestamp: '08-11-2025 6:46:00 AM', distillation: 720, lotName: '', internalSpiritType: 'Danko Rye', pgFeints: 0.00, feintsAccount: 'NA', pgHeads: 0.00, headsAccount: 'NA', pgHearts: 488.24, heartsAccount: 'Storage', pgTails: 0.00, tailsAccount: 'NA', pgLowWines: 0.00, lowWinesAccount: 'NA', inputPGProduc: 573.64, inputPGStorage: 0.00, inputPGProces: 0.00, totalLbsFermUsed: 0.00 },
    // Add more rows to simulate 682 total items
    ...Array.from({ length: 672 }, (_, i) => {
      const baseId = 540693 - i
      const baseDistillation = 719 - Math.floor(i / 3)
      const spiritTypes = ['Bourbon', 'Danko Rye', 'Vodka', 'Gin', 'Rum', 'Wheat Whiskey']
      const accounts = ['NA', 'Storage', 'Production']
      return {
        id: baseId,
        timestamp: `08-${10 - Math.floor(i / 10)}-2025 ${6 + (i % 12)}:${(i * 3) % 60}:00 ${i % 2 === 0 ? 'AM' : 'PM'}`,
        distillation: baseDistillation,
        lotName: '',
        internalSpiritType: spiritTypes[i % spiritTypes.length],
        pgFeints: i % 5 === 0 ? 10.50 : 0.00,
        feintsAccount: i % 5 === 0 ? 'Storage' : 'NA',
        pgHeads: i % 7 === 0 ? 15.25 : 0.00,
        headsAccount: i % 7 === 0 ? 'Production' : 'NA',
        pgHearts: i % 3 === 0 ? [782.35, 488.24, 612.04][i % 3] : 0.00,
        heartsAccount: i % 3 === 0 ? accounts[i % 3] : 'NA',
        pgTails: i % 6 === 0 ? 5.75 : 0.00,
        tailsAccount: i % 6 === 0 ? 'Storage' : 'NA',
        pgLowWines: i % 4 === 0 ? [463.87, 524.18][i % 2] : 0.00,
        lowWinesAccount: i % 4 === 0 ? accounts[i % 3] : 'NA',
        inputPGProduc: i % 2 === 0 ? [920.79, 612.04, 573.64][i % 3] : 0.00,
        inputPGStorage: i % 8 === 0 ? 152.03 : 0.00,
        inputPGProces: i % 9 === 0 ? [152.03, 85.33][i % 2] : 0.00,
        totalLbsFermUsed: [6600.00, 4400.00, 375.00, 0.00][i % 4]
      }
    })
  ]

  const totalItems = distillationLogs.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = distillationLogs.slice(startIndex, endIndex)

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

  const handleDetails = (id) => {
    console.log('View details for:', id)
    // TODO: Navigate to details page
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this distillation run?')) {
      console.log('Delete:', id)
      // TODO: Implement delete functionality
    }
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-accent-gold">Distillation Run Log</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/production/new-distillation')}
            className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            NEW DISTILLATION RUN
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
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Commands
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Id
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Timestamp
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Distillatio...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Lot Name
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Internal Spirit Ty...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    PG Feints
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Feints Accou...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    PG Heads
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Heads Accou...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    PG Hearts
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Hearts Accou...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    PG Tails
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Tails Account
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    PG Low Wines
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Low Wines Acco...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Input PG Produc...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Input PG Storage
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Input PG Proces...
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-accent-gold transition-colors">
                  <div className="flex items-center">
                    Total Lbs Ferm. Used
                    <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-light divide-y divide-accent-blue">
              {currentItems.map((log) => (
                <tr key={log.id} className="hover:bg-primary-DEFAULT/50 transition-colors">
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDetails(log.id)}
                        className="text-accent-blue hover:text-accent-gold transition-colors"
                      >
                        Details
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
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.id.toLocaleString()}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.timestamp}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.distillation}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.lotName || ''}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.internalSpiritType}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.pgFeints)}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.feintsAccount}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.pgHeads)}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.headsAccount}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.pgHearts)}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.heartsAccount}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.pgTails)}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.tailsAccount}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.pgLowWines)}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.lowWinesAccount}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.inputPGProduc)}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.inputPGStorage)}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.inputPGProces)}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{formatNumber(log.totalLbsFermUsed)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-primary-DEFAULT border-t border-accent-blue">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-accent-blue text-gray-300 hover:bg-accent-blue-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              ««
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-accent-blue text-gray-300 hover:bg-accent-blue-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              «
            </button>
            <span className="text-gray-300">
              Page{' '}
              <input
                type="number"
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="w-12 text-center bg-primary-light border border-accent-blue rounded text-gray-900 focus:outline-none focus:border-accent-gold"
              />{' '}
              of {totalPages || 1}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-accent-blue text-gray-300 hover:bg-accent-blue-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              »
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-accent-blue text-gray-300 hover:bg-accent-blue-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              »»
            </button>
          </div>

          <div className="flex items-center space-x-4 text-gray-300 mb-2 sm:mb-0">
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

export default DistillationLog
