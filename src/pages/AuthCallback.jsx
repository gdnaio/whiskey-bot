import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@gdnaio/cognito-auth'

export default function AuthCallback() {
  const { handleRedirectCallback } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    handleRedirectCallback()
      .then(() => {
        // Clear the URL parameters after successful callback
        window.history.replaceState({}, '', '/')
        // Navigate to home page
        navigate('/')
      })
      .catch((error) => {
        console.error('Auth callback error:', error)
        // Navigate to home page even on error
        window.history.replaceState({}, '', '/')
        navigate('/')
      })
  }, [handleRedirectCallback, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-dark via-primary-dark to-primary">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold mx-auto mb-4"></div>
        <p className="text-gray-300">Completing authentication...</p>
      </div>
    </div>
  )
}


