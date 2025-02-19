import { useEffect } from "react";
import { Subscription } from "@supabase/supabase-js";
import Auth from "./auth/auth";
import { useAuth } from "./contexts/auth-context";
import Dashboard from "./components/dashboard";
import { supabase } from "./utils/supabase";

export default function App() {
  const { session, setSession, setUser } = useAuth();

  useEffect(() => {
    let subscription: Subscription | null = null;
    (async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        console.error(error ?? "Error: No session");
        return;
      }

      setSession(session);
      setUser(session.user);

      const {
        data: { subscription: s },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (_event === "TOKEN_REFRESHED") {
          console.log("Session refreshed");
        }
        setSession(session);
        setUser(session?.user || null);
        // set session to cookie
      });
      subscription = s;
    })();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session) {
    return <Auth />;
  } else {
    return <Dashboard />;
  }
}
