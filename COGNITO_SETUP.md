# AWS Cognito Authentication Setup

This application uses `@gdnaio/cognito-auth` for authentication via AWS Cognito Hosted UI with PKCE.

## Environment Variables

Add the following variables to your `.env` file:

```env
# AWS Region
VITE_AWS_REGION=us-east-1

# Cognito Configuration
VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxx
VITE_COGNITO_DOMAIN=https://your-domain.auth.us-east-1.amazoncognito.com
VITE_COGNITO_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_COGNITO_SIGNOUT_REDIRECT_URI=http://localhost:5173/
```

## Setup Steps

### 1. Create Cognito User Pool

1. Go to AWS Console → Cognito → User Pools
2. Create a new User Pool
3. Note the User Pool ID (format: `us-east-1_XXXXXXXXX`)

### 2. Create App Client

1. In your User Pool, go to "App integration" → "App clients"
2. Create a new app client
3. Configure:
   - **App client name**: `whiskeybot-app`
   - **Client secret**: Do NOT generate a client secret (required for PKCE)
   - **Allowed OAuth flows**: Authorization code grant
   - **Allowed OAuth scopes**: `openid`, `email`, `profile`
   - **Allowed callback URLs**: 
     - `http://localhost:5173/auth/callback` (for local dev)
     - `https://your-production-domain.com/auth/callback` (for production)
   - **Allowed sign-out URLs**:
     - `http://localhost:5173/` (for local dev)
     - `https://your-production-domain.com/` (for production)
4. Note the Client ID

### 3. Configure Hosted UI Domain

1. In your User Pool, go to "App integration" → "Domain"
2. Create or use an existing Cognito domain (e.g., `your-app-name`)
3. The domain will be: `https://your-app-name.auth.us-east-1.amazoncognito.com`
4. Note this domain

### 4. Update .env File

Add all the values from steps 1-3 to your `.env` file:

```env
VITE_AWS_REGION=us-east-1
VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxx
VITE_COGNITO_DOMAIN=https://your-app-name.auth.us-east-1.amazoncognito.com
VITE_COGNITO_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_COGNITO_SIGNOUT_REDIRECT_URI=http://localhost:5173/
```

## How It Works

1. **Sign In**: User clicks "Sign In" → Redirects to Cognito Hosted UI
2. **Authentication**: User authenticates with Cognito
3. **Callback**: Cognito redirects to `/auth/callback` with authorization code
4. **Token Exchange**: App exchanges code for tokens (access, ID, refresh)
5. **Storage**: Tokens stored in `localStorage` (auto-refresh enabled)
6. **Sign Out**: User clicks "Logout" → Clears tokens and redirects

## Features

- ✅ Hosted UI + PKCE (secure)
- ✅ Auto token refresh
- ✅ User info displayed in TopBar
- ✅ Protected routes (can be added with `RequireAuth` component)

## Testing

1. Start the app: `npm run dev`
2. Click "Sign In" in the top right
3. You'll be redirected to Cognito Hosted UI
4. Sign in with your Cognito user
5. You'll be redirected back to the app, authenticated

## Production Setup

For production, update the redirect URIs in:
1. Cognito App Client settings
2. Your `.env` file (or Amplify environment variables)

Make sure to use HTTPS URLs in production.


