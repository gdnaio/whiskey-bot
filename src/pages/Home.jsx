import { Link } from 'react-router-dom'

const quickLinks = [
  { 
    name: 'Raw Materials', 
    path: '/raw-materials/receipts', 
    gradient: 'from-blue-500 via-blue-600 to-blue-700',
    icon: '📦',
    description: 'Manage receipts, inventory, and transactions'
  },
  { 
    name: 'Production', 
    path: '/production/fermentation', 
    gradient: 'from-amber-500 via-amber-600 to-amber-700',
    icon: '⚗️',
    description: 'Track fermentation and distillation'
  },
  { 
    name: 'Barrels', 
    path: '/barrels/fill-barrels', 
    gradient: 'from-yellow-500 via-yellow-600 to-yellow-700',
    icon: '🪣',
    description: 'Monitor barrel fills and inventory'
  },
  { 
    name: 'Processing', 
    path: '/processing/batching', 
    gradient: 'from-purple-500 via-purple-600 to-purple-700',
    icon: '🔧',
    description: 'Batching, bottling, and case management'
  },
  { 
    name: 'Finished Products', 
    path: '/finished-products/finished-goods-inventory', 
    gradient: 'from-green-500 via-green-600 to-green-700',
    icon: '📊',
    description: 'Inventory, transfers, and sales orders'
  },
  { 
    name: 'TTB Reports', 
    path: '/logs-and-reports/ttb-reports', 
    gradient: 'from-red-500 via-red-600 to-red-700',
    icon: '📋',
    description: 'Compliance and regulatory reporting'
  },
]

const stats = [
  { label: 'Active Operations', value: '24/7', icon: '⚡' },
  { label: 'Compliance Ready', value: '100%', icon: '✅' },
  { label: 'Data Accuracy', value: '99.9%', icon: '🎯' },
]

function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 via-accent-gold/10 to-accent-blue/20 blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-accent-gold to-transparent"></div>
            <span className="text-accent-gold font-semibold text-sm uppercase tracking-wider">Distillery Management System</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent leading-tight">
            Welcome to<br />Distillery Tracker
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            Streamline your production workflow and ensure seamless TTB compliance with our comprehensive tracking and reporting platform.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 p-6 backdrop-blur-sm hover:border-accent-gold/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-accent-gold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links Grid */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold text-white">Quick Access</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-blue to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-light to-primary-dark border border-accent-blue/50 p-6 hover:border-accent-gold/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent-gold/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{link.icon}</div>
                  <div className="text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-gold transition-colors duration-300">
                  {link.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 md:p-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent-gold/10 border border-accent-gold/20">
              <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white">Getting Started</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-3xl">
            Navigate through the Distillery Tracker using the intuitive sidebar menu. Each section is carefully organized to help you efficiently manage every aspect of your distillery operations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary-dark/50 border border-accent-blue/30">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold text-white mb-1">Sidebar Navigation</h3>
                <p className="text-gray-400 text-sm">Use the collapsible sidebar to access all features</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary-dark/50 border border-accent-blue/30">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold text-white mb-1">Category Expansion</h3>
                <p className="text-gray-400 text-sm">Click categories to view subcategories and pages</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary-dark/50 border border-accent-blue/30">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold text-white mb-1">Quick Links</h3>
                <p className="text-gray-400 text-sm">Jump to common sections using the cards above</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

