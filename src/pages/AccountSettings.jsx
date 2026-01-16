function AccountSettings() {
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
          Account Settings
        </h1>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Change Password */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 border border-accent-gold/30">
                <svg className="w-6 h-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Change Password</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  placeholder="Confirm new password"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-xl hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold shadow-lg shadow-accent-gold/20">
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 border border-accent-blue/30">
                <svg className="w-6 h-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Email Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20"
                  placeholder="user@distillery.com"
                  defaultValue="user@distillery.com"
                />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="email-notifications" className="w-5 h-5 rounded text-accent-gold focus:ring-accent-gold" defaultChecked />
                <label htmlFor="email-notifications" className="text-gray-300">Receive email notifications</label>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-xl hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold shadow-lg shadow-accent-gold/20">
                Update Email
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/10 border border-red-500/30">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 font-semibold mb-2">Danger Zone</p>
                <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all associated data.</p>
                <button className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings



