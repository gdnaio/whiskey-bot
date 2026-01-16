import { useAuth } from '@gdnaio/cognito-auth'

/**
 * Hook to get the current authenticated user's ID
 * @returns {string|null} The user ID (sub) or null if not authenticated
 */
export function useUserId() {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated || !user) {
    return null
  }
  
  // Cognito user ID is typically in user.sub or user.id
  return user.sub || user.id || null
}

export default useUserId

