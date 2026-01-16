import React from 'react'
import ReactDOM from 'react-dom/client'
import { CognitoAuthProvider } from '@gdnaio/cognito-auth'
import App from './App.jsx'
import './index.css'

const cognitoConfig = {
  region: import.meta.env.VITE_COGNITO_REGION || import.meta.env.VITE_AWS_REGION || 'us-east-2',
  userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
  clientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
  domain: import.meta.env.VITE_COGNITO_DOMAIN || '',
  redirectUri: import.meta.env.VITE_COGNITO_REDIRECT_URI || `${window.location.origin}/auth/callback`,
  signOutRedirectUri: import.meta.env.VITE_COGNITO_SIGNOUT_REDIRECT_URI || window.location.origin,
  storage: 'localStorage',
  scopes: ['openid', 'email', 'profile'],
  autoRefreshToken: true,
}

// Log configuration (without sensitive data)
console.log('Cognito Config:', {
  region: cognitoConfig.region,
  userPoolId: cognitoConfig.userPoolId ? `${cognitoConfig.userPoolId.substring(0, 10)}...` : 'NOT SET',
  clientId: cognitoConfig.clientId ? `${cognitoConfig.clientId.substring(0, 10)}...` : 'NOT SET',
  domain: cognitoConfig.domain || 'NOT SET',
  redirectUri: cognitoConfig.redirectUri,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CognitoAuthProvider config={cognitoConfig}>
      <App />
    </CognitoAuthProvider>
  </React.StrictMode>,
)

