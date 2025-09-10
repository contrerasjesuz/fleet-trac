import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

/**
 * Auth context shape (JS only, no TS): { userId, session, loading }
 * - userId: string | null
 * - session: Supabase session object or null
 * - loading: boolean while we check/subscribe
 */
const AuthContext = createContext({ userId: null, session: null, loading: true });

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function init() {
      // 1) Get the current session on first load
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;
      if (error) {
        console.error("Supabase getSession error:", error.message);
      }
      setSession(data?.session ?? null);
      setLoading(false);
    }

    init();

    // 2) Subscribe to auth state changes (sign in/out, token refresh)
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession ?? null);
    });

    // 3) Cleanup on unmount
    return () => {
      mounted = false;
      subscription?.subscription?.unsubscribe?.();
    };
  }, []);

  const value = useMemo(() => {
    const userId = session?.user?.id ?? null;
    return { userId, session, loading };
  }, [session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Tiny helper hook so components can read the auth state easily */
export function useSession() {
  return useContext(AuthContext);
}
