import { Session, User, WeakPassword } from "@supabase/supabase-js";

const apiUrl: string = import.meta.env.VITE_API_URL ?? "";

export const API_URL = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;

export type LoginReturnType = {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
};

export type SignupReturnType = {
  user: User;
  session: Session;
};
