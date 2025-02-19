import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const urlSchema = z.object({
  url: z.string().min(1, {
    message: "URL is required.",
  }).url({
    message: "Invalid URL format.",
  }),
});

export const urlSchemaResolver = zodResolver(urlSchema);
export type UrlSchemaType = z.infer<typeof urlSchema>;
