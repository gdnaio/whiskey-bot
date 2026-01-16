import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@gdnaio/cognito-auth'

function TopBar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { isAuthenticated, user, signIn, signOut } = useAuth()

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  const handleLogout = () => {
    signOut()
    setIsUserMenuOpen(false)
  }

  const handleSignIn = () => {
    signIn()
  }

  const menuItems = [
    {
      label: 'Profile',
      path: '/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      onClick: () => {
        navigate('/profile')
        setIsUserMenuOpen(false)
      }
    },
    {
      label: 'Account Settings',
      path: '/account-settings',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      onClick: () => {
        navigate('/account-settings')
        setIsUserMenuOpen(false)
      }
    },
    {
      label: 'Preferences',
      path: '/preferences',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      onClick: () => {
        navigate('/preferences')
        setIsUserMenuOpen(false)
      }
    },
    {
      label: 'Help & Support',
      path: '/help-support',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      onClick: () => {
        navigate('/help-support')
        setIsUserMenuOpen(false)
      }
    },
    {
      label: 'Logout',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      onClick: handleLogout,
      isDanger: true
    }
  ]

  return (
    <header className="h-16 bg-gradient-to-r from-primary via-primary to-primary-light border-b border-accent-blue/50 backdrop-blur-sm flex items-center justify-between px-6 shadow-lg relative z-50">
      <Link 
        to="/" 
        className="group flex items-center gap-3 hover:opacity-90 transition-opacity duration-200"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-accent-gold/20 blur-xl rounded-full group-hover:bg-accent-gold/30 transition-all duration-300"></div>
          <div className="relative flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 border border-accent-gold/30">
              <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-gold via-accent-gold-light to-accent-gold bg-clip-text text-transparent group-hover:from-accent-gold-light group-hover:to-accent-gold transition-all duration-300">
              Distillery Tracker
            </h1>
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 relative" ref={menuRef}>
        {!isAuthenticated ? (
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-gradient-to-r from-accent-gold to-accent-gold-light text-primary-dark rounded-lg hover:from-accent-gold-light hover:to-accent-gold transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        ) : (
          <div 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="h-10 w-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue-light border border-accent-gold/20 flex items-center justify-center hover:border-accent-gold/40 transition-all duration-200 cursor-pointer group relative"
          >
            <svg className="h-6 w-6 text-accent-gold group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {isUserMenuOpen && (
              <div className="absolute top-0 right-0 w-2 h-2 bg-accent-gold rounded-full animate-pulse"></div>
            )}
          </div>
        )}

        {/* User Menu Dropdown */}
        {isAuthenticated && isUserMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 rounded-xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* User Info Header */}
            <div className="px-4 py-4 border-b border-accent-blue/30 bg-gradient-to-r from-accent-blue/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue-light border border-accent-gold/30 flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">
                    {user?.name || user?.email || 'User Account'}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {user?.email || 'user@distillery.com'}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`
                    w-full px-4 py-3 flex items-center gap-3 text-left transition-all duration-200
                    ${item.isDanger 
                      ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' 
                      : 'text-gray-300 hover:bg-primary-light hover:text-accent-gold'
                    }
                  `}
                >
                  <div className={`flex-shrink-0 ${item.isDanger ? 'text-red-400' : 'text-accent-gold'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default TopBar

