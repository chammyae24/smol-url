import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const signupSchema = z.object({
  full_name: z.string().min(2, {
    message: "Full name is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password is required.",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password is required.",
  }),
});

export type SignupData = z.infer<typeof signupSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type SignupFormValue = UseFormReturn<SignupData>;
export type LoginFormValue = UseFormReturn<LoginData>;
