import type { Request, Response } from "express";
import { supabase, supabaseAdmin } from "../utils/supabase";

export const signUp = async (req: Request, res: Response) => {
  //   console.log("req.body", req.body);
  const { email, password, full_name } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
      },
    },
  });

  if (error) {
    // console.log(error);
    res.status(400).json({ error: error.message });
    return;
  }

  //? Normally it's better to use a trigger to auto insert the public.users table
  const { error: userInsertError } = await supabaseAdmin.from("users").insert({
    id: data.user?.id,
    full_name,
    email,
  });

  if (userInsertError) {
    // console.log(userInsertError);
    res.status(400).json({ error: userInsertError.message });
    return;
  }

  res.status(200).json(data);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // console.log(error);
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json(data);
};
