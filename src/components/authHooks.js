import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useSession = () => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess ?? null);
    });
    return () => {
      mounted = false;
      sub.subscription?.unsubscribe?.();
    };
  }, []);

  return session; // undefined => loading, null => not authed, object => authed
};
