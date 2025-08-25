import { useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Returns: undefined => loading, null => not authed, object => authed (user)
export const useSession = () => {
  const { isLoading, isAuthenticated, user } = useAuth0();
  return useMemo(() => {
    if (isLoading) return undefined;
    return isAuthenticated ? user : null;
  }, [isLoading, isAuthenticated, user]);
};
