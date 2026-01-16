import { useAuth } from '@gdnaio/cognito-auth'

function Landing() {
  const { signIn, isAuthenticated } = useAuth()

  const handleSignIn = () => {
    try {
      console.log('Sign in button clicked')
      console.log('signIn function:', signIn)
      console.log('isAuthenticated:', isAuthenticated)
      
      if (!signIn) {
        console.error('signIn function is not available')
        alert('Sign in is not configured. Please check your Cognito configuration in .env file.')
        return
      }

      // Check if required config is present
      const domain = import.meta.env.VITE_COGNITO_DOMAIN
      const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID
      const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID

      if (!domain || !userPoolId || !clientId) {
        alert('Cognito is not fully configured. Please set VITE_COGNITO_DOMAIN, VITE_COGNITO_USER_POOL_ID, and VITE_COGNITO_CLIENT_ID in your .env file.')
        console.error('Missing Cognito configuration:', {
          domain: !!domain,
          userPoolId: !!userPoolId,
          clientId: !!clientId
        })
        return
      }

      signIn()
    } catch (error) {
      console.error('Error during sign in:', error)
      alert(`Sign in error: ${error.message}`)
    }
  }

  // If already authenticated, this shouldn't show, but just in case
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary-dark to-primary flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 border border-accent-gold/30">
              <svg className="w-12 h-12 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-accent-gold via-accent-gold-light to-accent-gold bg-clip-text text-transparent">
              Distillery Tracker
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-2">Whiskey Systems</p>
          <p className="text-gray-400">Comprehensive distillery management platform</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-primary-light via-primary-light to-primary-dark rounded-2xl border border-accent-blue/50 shadow-2xl p-12 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Welcome</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Sign in to access your distillery management system
            </p>

            {/* Sign In Button */}
            <button
              onClick={handleSignIn}
              className="px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-xl hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold text-lg shadow-lg shadow-accent-gold/20 hover:shadow-xl hover:shadow-accent-gold/30 transform hover:scale-105"
            >
              Sign In with AWS Cognito
            </button>

            {/* Features List */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
                <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Production Tracking</h3>
                <p className="text-gray-400 text-sm">Manage fermentation, distillation, and processing</p>
              </div>

              <div className="p-6 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
                <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Inventory Management</h3>
                <p className="text-gray-400 text-sm">Track barrels, tanks, and finished goods</p>
              </div>

              <div className="p-6 rounded-xl bg-primary-dark/50 border border-accent-blue/30">
                <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">TTB Reporting</h3>
                <p className="text-gray-400 text-sm">Generate compliance reports and tax schedules</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>© 2025 Whiskey Systems. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Landing

