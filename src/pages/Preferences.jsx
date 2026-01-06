function Preferences() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-accent-gold to-transparent"></div>
          <span className="text-accent-gold/80 text-sm font-semibold uppercase tracking-wider">
            User Account
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent mb-4">
          Preferences
        </h1>
      </div>

      {/* Preferences Sections */}
      <div className="space-y-6">
        {/* Display Settings */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 border border-accent-gold/30">
                <svg className="w-6 h-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Display Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
                <div>
                  <p className="text-white font-medium mb-1">Theme</p>
                  <p className="text-gray-400 text-sm">Dark mode (default)</p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-accent-gold/20 text-accent-gold text-sm font-medium">
                  Dark
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
                <div>
                  <p className="text-white font-medium mb-1">Items Per Page</p>
                  <p className="text-gray-400 text-sm">Default number of items in data tables</p>
                </div>
                <select className="px-4 py-2 bg-primary-light border border-accent-blue/50 rounded-lg text-gray-100 focus:outline-none focus:border-accent-gold">
                  <option value="25">25</option>
                  <option value="50" selected>50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 border border-accent-blue/30">
                <svg className="w-6 h-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
                <div>
                  <p className="text-white font-medium mb-1">Email Notifications</p>
                  <p className="text-gray-400 text-sm">Receive notifications via email</p>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded text-accent-gold focus:ring-accent-gold" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
                <div>
                  <p className="text-white font-medium mb-1">System Alerts</p>
                  <p className="text-gray-400 text-sm">Important system notifications</p>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded text-accent-gold focus:ring-accent-gold" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
                <div>
                  <p className="text-white font-medium mb-1">Report Reminders</p>
                  <p className="text-gray-400 text-sm">Reminders for scheduled reports</p>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded text-accent-gold focus:ring-accent-gold" />
              </div>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Data & Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
                <div>
                  <p className="text-white font-medium mb-1">Data Export</p>
                  <p className="text-gray-400 text-sm">Download your account data</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-lg hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-medium">
                  Export Data
                </button>
              </div>
              <div className="p-4 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
                <p className="text-white font-medium mb-2">Privacy Policy</p>
                <p className="text-gray-400 text-sm mb-4">Review how we handle your data and privacy.</p>
                <button className="text-accent-gold hover:text-accent-gold-light transition-colors font-medium">
                  View Privacy Policy →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preferences


