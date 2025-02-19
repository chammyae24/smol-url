import type { Request, Response } from "express";
import { nanoid } from "nanoid";
import { supabase, supabaseAdmin } from "../utils/supabase";
import { errorHandler } from "../utils";

// const insertUrl = async (
//   url: string,
//   shortCode: string,
//   query_params: Record<string, string>,
// ) => {
//   return await supabase.from("urls").insert({
//     destination_url: url,
//     short_code: shortCode,
//     url_params: query_params,
//   });
// };

export const postShortUrl = async (req: Request, res: Response) => {
  const { url } = req.body;

  const urlObj = new URL(url);
  const base_url = urlObj.origin + urlObj.pathname;
  const query_params = Object.fromEntries(urlObj.searchParams.entries());

  let insertedCode: string | null = null;

  while (insertedCode === null) {
    const shortCode = nanoid(7);

    const { data, error } = await supabase
      .from("urls")
      .insert({
        destination_url: base_url,
        short_code: shortCode,
        url_params: query_params,
      })
      .select("short_code")
      .single();

    if (error) {
      if (error.code !== "23505") {
        res.status(500).json({ error: error.message });
        return;
      }
    } else {
      insertedCode = data.short_code;
    }
  }

  const short_url = `${process.env.BASE_URL}/${insertedCode}`;

  res.json({ short_url, short_code: insertedCode });
};

export const getShortUrl = async (req: Request, res: Response) => {
  try {
    const { short_code } = req.params;

    const { data, error } = await supabaseAdmin
      .from("urls")
      .select("destination_url, url_params")
      .match({
        short_code,
      })
      .limit(1)
      .single();

    if (error) {
      res.status(404).json({ error: "Short URL not found" });
      return;
    }

    const url = new URL(data.destination_url);
    const query_params: Record<string, string> = data.url_params ?? {};
    Object.entries(query_params).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    );

    res.redirect(url.toString());
  } catch (error) {
    const errMsg = errorHandler(error);
    res.status(500).json({ error: errMsg });
  }
};
