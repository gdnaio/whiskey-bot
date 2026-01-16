function Profile() {
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
          Profile
        </h1>
      </div>

      {/* Profile Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 md:p-12 shadow-2xl mb-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <div className="flex items-start gap-6 mb-8">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue-light border-4 border-accent-gold/30 flex items-center justify-center flex-shrink-0">
              <svg className="h-12 w-12 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">User Account</h2>
              <p className="text-gray-400 text-lg mb-4">user@distillery.com</p>
              <button className="px-5 py-2.5 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-xl hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/30">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
              <h3 className="text-accent-gold font-semibold mb-2">Full Name</h3>
              <p className="text-gray-300">John Doe</p>
            </div>
            <div className="p-6 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
              <h3 className="text-accent-gold font-semibold mb-2">Email Address</h3>
              <p className="text-gray-300">user@distillery.com</p>
            </div>
            <div className="p-6 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
              <h3 className="text-accent-gold font-semibold mb-2">Role</h3>
              <p className="text-gray-300">Administrator</p>
            </div>
            <div className="p-6 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
              <h3 className="text-accent-gold font-semibold mb-2">Member Since</h3>
              <p className="text-gray-300">January 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile



