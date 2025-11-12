import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Navigation structure with categories and subcategories
const navigation = [
  {
    name: 'Raw Materials',
    path: '/raw-materials',
    subcategories: [
      { name: 'Receipts', path: '/raw-materials/receipts' },
      { name: 'Inventory', path: '/raw-materials/inventory' },
      { name: 'Transactions', path: '/raw-materials/transactions' },
      { name: 'Conversions', path: '/raw-materials/conversions' },
      { name: 'Logs', path: '/raw-materials/logs' },
    ]
  },
  {
    name: 'Production',
    path: '/production',
    subcategories: [
      { name: 'Fermentation', path: '/production/fermentation' },
      { name: 'Fermentation Scrap Log', path: '/production/fermentation-scrap-log' },
      { name: 'Fermentation Log', path: '/production/fermentation-log' },
      { name: 'Fermentation Cooks', path: '/production/fermentation-cooks' },
      { name: 'Fermenter Status', path: '/production/fermenter-status' },
      { name: 'Fermentation Reports', path: '/production/fermentation-reports' },
      { name: 'Distillation', path: '/production/distillation' },
    ]
  },
  {
    name: 'Barrels',
    path: '/barrels',
    subcategories: [
      { name: 'Fill Barrels', path: '/barrels/fill-barrels' },
      { name: 'Rackhouse Inventory', path: '/barrels/rackhouse-inventory' },
      { name: 'Dump Barrels', path: '/barrels/dump-barrels' },
      { name: 'Manage Barrels', path: '/barrels/manage-barrels' },
    ]
  },
  {
    name: 'Processing',
    path: '/processing',
    subcategories: [
      { name: 'Batching', path: '/processing/batching' },
      { name: 'Bottling', path: '/processing/bottling' },
      { name: 'Mixed Cases', path: '/processing/mixed-cases' },
      { name: 'Dumped Cases', path: '/processing/dumped-cases' },
      { name: 'Recasing', path: '/processing/recasing' },
      { name: 'Case and CSC Labels', path: '/processing/case-and-csc-labels' },
    ]
  },
  {
    name: 'Transfer In Bond',
    path: '/transfer-in-bond',
    subcategories: [
      { name: 'Inbound', path: '/transfer-in-bond/inbound' },
      { name: 'Outbound', path: '/transfer-in-bond/outbound' },
    ]
  },
  {
    name: 'Finished Products',
    path: '/finished-products',
    subcategories: [
      { name: 'Finished Goods Inventory', path: '/finished-products/finished-goods-inventory' },
      { name: 'Finished Goods Transfers', path: '/finished-products/finished-goods-transfers' },
      { name: 'Sales Orders', path: '/finished-products/sales-orders' },
      { name: 'Sales Interactions', path: '/finished-products/sales-interactions' },
      { name: 'Price Lists', path: '/finished-products/price-lists' },
      { name: 'Bailments and Depletions', path: '/finished-products/bailments-and-depletions' },
    ]
  },
  {
    name: 'Tanks',
    path: '/tanks',
    subcategories: [
      { name: 'Tank Status', path: '/tanks/tank-status' },
      { name: 'Logs', path: '/tanks/logs' },
    ]
  },
  {
    name: 'Logs and Reports',
    path: '/logs-and-reports',
    subcategories: [
      { name: 'TTB Reports', path: '/logs-and-reports/ttb-reports' },
      { name: 'Financial Reports', path: '/logs-and-reports/financial-reports' },
      { name: 'Whiskey System Reports', path: '/logs-and-reports/whiskey-system-reports' },
      { name: 'State Reports', path: '/logs-and-reports/state-reports' },
      { name: 'Printable Worksheets', path: '/logs-and-reports/printable-worksheets' },
      { name: 'Physical Inventory', path: '/logs-and-reports/physical-inventory' },
      { name: 'Whiskey System Logs', path: '/logs-and-reports/whiskey-system-logs' },
      { name: 'Daily Logs', path: '/logs-and-reports/daily-logs' },
      { name: 'Data Archive', path: '/logs-and-reports/data-archive' },
    ]
  },
  {
    name: 'Administrator',
    path: '/administrator',
    subcategories: [
      { name: 'Delete Transactions', path: '/administrator/delete-transactions' },
      { name: 'QuickBooks Export', path: '/administrator/quickbooks-export' },
      { name: 'Payment Settings', path: '/administrator/payment-settings' },
      { name: 'Queued Jobs', path: '/administrator/queued-jobs' },
      { name: 'Manage Users', path: '/administrator/manage-users' },
      { name: 'Reset Account', path: '/administrator/reset-account' },
    ]
  },
  {
    name: 'Calculator',
    path: '/calculator',
    subcategories: [
      { name: 'Proof Gallons', path: '/calculator/proof-gallons' },
      { name: 'LAA', path: '/calculator/laa' },
      { name: 'Conversions', path: '/calculator/conversions' },
    ]
  },
  {
    name: 'Settings (DSP Info)',
    path: '/settings',
    subcategories: []
  },
]

function Sidebar() {
  const [expandedCategories, setExpandedCategories] = useState({})
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  // Initialize expanded state based on current route
  useEffect(() => {
    const shouldBeExpanded = (category) => {
      return category.subcategories.some(sub => location.pathname === sub.path)
    }
    
    const initialExpanded = {}
    navigation.forEach(category => {
      if (shouldBeExpanded(category)) {
        initialExpanded[category.name] = true
      }
    })
    setExpandedCategories(initialExpanded)
  }, [location.pathname])

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }))
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const isCategoryActive = (category) => {
    return category.subcategories.some(sub => isActive(sub.path))
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary-light text-accent-gold hover:bg-accent-blue transition-smooth"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-primary border-r border-accent-blue
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col pt-16 lg:pt-4">
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {navigation.map((category) => {
              const shouldBeExpanded = (cat) => {
                return cat.subcategories.some(sub => location.pathname === sub.path)
              }
              const isExpanded = expandedCategories[category.name] || shouldBeExpanded(category)
              const hasSubcategories = category.subcategories.length > 0

              return (
                <div key={category.name} className="mb-2">
                  {hasSubcategories ? (
                    <>
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className={`
                          w-full flex items-center justify-between px-4 py-3 rounded-lg
                          transition-smooth text-left
                          ${isCategoryActive(category)
                            ? 'bg-accent-blue text-accent-gold font-semibold'
                            : 'text-gray-300 hover:bg-primary-light hover:text-accent-gold'
                          }
                        `}
                      >
                        <span>{category.name}</span>
                        <svg 
                          className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {isExpanded && (
                        <div className="ml-4 mt-1 space-y-1">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.path}
                              to={subcategory.path}
                              onClick={() => setIsMobileOpen(false)}
                              className={`
                                block px-4 py-2 rounded-lg text-sm transition-smooth
                                ${isActive(subcategory.path)
                                  ? 'bg-accent-blue-light text-accent-gold font-medium'
                                  : 'text-gray-400 hover:bg-primary-light hover:text-gray-200'
                                }
                              `}
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={category.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`
                        block px-4 py-3 rounded-lg transition-smooth
                        ${isActive(category.path)
                          ? 'bg-accent-blue text-accent-gold font-semibold'
                          : 'text-gray-300 hover:bg-primary-light hover:text-accent-gold'
                        }
                      `}
                    >
                      {category.name}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar

