import { useState, useEffect } from "react";
import { createClient, Session, Subscription } from "@supabase/supabase-js";
import Auth from "./component/auth/auth";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? "",
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? ""
);

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

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

      const {
        data: { subscription: s },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
      subscription = s;
    })();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  if (!session) {
    return <Auth />;
  } else {
    return <div>Logged in!</div>;
  }
}
