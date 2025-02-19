import { createClient } from "@supabase/supabase-js";
import type { NextFunction, Request, Response } from "express";
import type { RequestWithUser } from "./type";
import { errorHandler } from "./utils";

const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_ANON_KEY ?? "",
);

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Unauthorized");
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      throw new Error("Invalid token");
    }

    req.body.user = data.user;
    next();
  } catch (err) {
    const errorMessage = errorHandler(err);

    if (errorMessage === "Error: Unauthorized") {
      res.status(401).json({ error: errorMessage + " Please login." });
    } else if (errorMessage === "Error: Invalid token") {
      res.status(401).json({ error: errorMessage });
    } else {
      res.status(500).json({ error: errorMessage });
    }
  }
};

export default authenticate;
