import type { User } from "@supabase/supabase-js";
import type { Request } from "express";

export type RequestWithUser = Request & {
  user: User;
};
