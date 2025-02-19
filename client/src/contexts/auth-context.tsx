import { Session, User } from "@supabase/supabase-js";
import React, { useContext } from "react";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
};

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  session: null,
  setUser: () => {},
  setSession: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);
  return (
    <AuthContext.Provider value={{ user, session, setUser, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
