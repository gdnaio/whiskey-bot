import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Navigation structure with categories and subcategories
const navigation = [
  {
    name: 'Raw Materials',
    path: '/raw-materials',
    subcategories: []
  },
  {
    name: 'Production',
    path: '/production',
    subcategories: [
      { name: 'Fermentation Scrap Log', path: '/production/fermentation-scrap-log' },
      { name: 'Fermentation Log', path: '/production/fermentation-log' },
      { name: 'Fermentation Cooks', path: '/production/fermentation-cooks' },
      { name: 'Fermenter Status', path: '/production/fermenter-status' },
      { name: 'Fermentation Reports', path: '/production/fermentation-reports' },
      { name: 'New Distillation', path: '/production/new-distillation' },
      { name: 'Distillation Log', path: '/production/distillation-log' },
      { name: 'Distillation', path: '/production/distillation' },
    ]
  },
  {
    name: 'Barrels',
    path: '/barrels',
    subcategories: [
      { name: 'New Fill', path: '/barrels/new-fill' },
      { name: 'Barrel Fill Log', path: '/barrels/barrel-fill-log' },
      { name: 'Onsite Barrels', path: '/barrels/onsite-barrels' },
      { name: 'Offsite Barrels', path: '/barrels/offsite-barrels' },
      { name: 'Rackhouse Inventory', path: '/barrels/rackhouse-inventory' },
      { name: 'Queued Dumps', path: '/barrels/queued-dumps' },
      { name: 'Completed Dumps', path: '/barrels/completed-dumps' },
      { name: 'Barrel History', path: '/barrels/barrel-history' },
      { name: 'Update Log', path: '/barrels/update-log' },
      { name: 'Empty Barrels', path: '/barrels/empty-barrels' },
    ]
  },
  {
    name: 'Processing',
    path: '/processing',
    subcategories: [
      { name: 'New Batching Run', path: '/processing/new-batching-run' },
      { name: 'Batching Run Log', path: '/processing/batching-run-log' },
      { name: 'New Bottling Run', path: '/processing/new-bottling-run' },
      { name: 'Bottling Run Log', path: '/processing/bottling-run-log' },
    ]
  },
  {
    name: 'Transfer In Bond',
    path: '/transfer-in-bond',
    subcategories: [
      { name: 'New Tote TIB In', path: '/transfer-in-bond/new-tote-tib-in' },
      { name: 'New Tanker TIB In', path: '/transfer-in-bond/new-tanker-tib-in' },
      { name: 'New Barrel TIB In', path: '/transfer-in-bond/new-barrel-tib-in' },
      { name: 'New Bulk Barrel TIB In', path: '/transfer-in-bond/new-bulk-barrel-tib-in' },
      { name: 'New Finished Product TIB In', path: '/transfer-in-bond/new-finished-product-tib-in' },
      { name: 'TIB In Log', path: '/transfer-in-bond/tib-in-log' },
      { name: 'New Tank/Tote TIB Out', path: '/transfer-in-bond/new-tank-tote-tib-out' },
      { name: 'New Tanker TIB Out', path: '/transfer-in-bond/new-tanker-tib-out' },
      { name: 'New Finished Product TIB Out', path: '/transfer-in-bond/new-finished-product-tib-out' },
      { name: 'TIB Out Log', path: '/transfer-in-bond/tib-out-log' },
    ]
  },
  {
    name: 'Finished Products',
    path: '/finished-products',
    subcategories: [
      { name: 'Finished Goods Inventory', path: '/finished-products/finished-goods-inventory' },
      { name: 'New Finished Goods Transfers', path: '/finished-products/new-finished-goods-transfers' },
      { name: 'Finished Goods Transfers Logs', path: '/finished-products/finished-goods-transfers-logs' },
      { name: 'New Sales Order', path: '/finished-products/new-sales-order' },
      { name: 'Sales Order Log', path: '/finished-products/sales-order-log' },
      { name: 'Invoice Log', path: '/finished-products/invoice-log' },
      { name: 'Price Lists', path: '/finished-products/price-lists' },
    ]
  },
  {
    name: 'Tanks',
    path: '/tanks',
    subcategories: [
      { name: 'Tank Status', path: '/tanks/tank-status' },
      { name: 'Tank Move Log', path: '/tanks/tank-move-log' },
      { name: 'Filtering Log', path: '/tanks/filtering-log' },
      { name: 'Adjustment Log', path: '/tanks/adjustment-log' },
      { name: 'Records of Destruction', path: '/tanks/records-of-destruction' },
    ]
  },
  {
    name: 'Logs and Reports',
    path: '/logs-and-reports',
    subcategories: [
      { name: 'TTB Production Reports', path: '/logs-and-reports/ttb-production-reports' },
      { name: 'TTB Storage Reports', path: '/logs-and-reports/ttb-storage-reports' },
      { name: 'TTB Processing Reports', path: '/logs-and-reports/ttb-processing-reports' },
      { name: 'TTB Reports Checker', path: '/logs-and-reports/ttb-reports-checker' },
      { name: 'Excise Tax Schedule & Returns', path: '/logs-and-reports/excise-tax-schedule-returns' },
      { name: 'WS Pay.Gov Chrome Extension', path: '/logs-and-reports/ws-pay-gov-chrome-extension' },
      { name: 'Whiskey System Logs', path: '/logs-and-reports/whiskey-system-logs' },
      { name: 'Daily Logs', path: '/logs-and-reports/daily-logs' },
    ]
  },
  {
    name: 'Administrator',
    path: '/administrator',
    subcategories: [
      { name: 'Delete Transactions', path: '/administrator/delete-transactions' },
      { name: 'QuickBooks Export', path: '/administrator/quickbooks-export' },
      { name: 'Manage Users', path: '/administrator/manage-users' },
    ]
  },
  {
    name: 'Calculator',
    path: '/calculator',
    subcategories: []
  },
  {
    name: 'Settings (DSP Info)',
    path: '/settings',
    subcategories: [
      { name: 'DSP Settings and Info', path: '/settings/dsp-settings-and-info' },
      { name: 'Whiskey Kinds', path: '/settings/whiskey-kinds' },
      { name: 'TTB Material Kinds', path: '/settings/ttb-material-kinds' },
      { name: 'Base Tax Rates', path: '/settings/base-tax-rates' },
      { name: 'Raw Materials', path: '/settings/raw-materials' },
      { name: 'Internal Spirit Types', path: '/settings/internal-spirit-types' },
      { name: 'Mash Bills', path: '/settings/mash-bills' },
      { name: 'Recipes', path: '/settings/recipes' },
      { name: 'Product Lines', path: '/settings/product-lines' },
      { name: 'Product Masters', path: '/settings/product-masters' },
      { name: 'Mixed Product Masters', path: '/settings/mixed-product-masters' },
      { name: 'Fermenters', path: '/settings/fermenters' },
      { name: 'Tanks', path: '/settings/tanks' },
      { name: 'Vendors', path: '/settings/vendors' },
      { name: 'Customers', path: '/settings/customers' },
      { name: 'Contacts', path: '/settings/contacts' },
      { name: 'DSPs', path: '/settings/dsps' },
      { name: 'Owners', path: '/settings/owners' },
      { name: 'Linked Distilleries', path: '/settings/linked-distilleries' },
      { name: 'Rackhouses', path: '/settings/rackhouses' },
      { name: 'Warehouses', path: '/settings/warehouses' },
      { name: 'Starting Tanks', path: '/settings/starting-tanks' },
      { name: 'Starting Finished Goods', path: '/settings/starting-finished-goods' },
      { name: 'Starting Raw Materials', path: '/settings/starting-raw-materials' },
      { name: 'Starting Onsite Barrels', path: '/settings/starting-onsite-barrels' },
      { name: 'Starting Offsite Barrels', path: '/settings/starting-offsite-barrels' },
    ]
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

