import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Form, FormField, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { LoginData, loginSchema, SignupData, signupSchema } from "../auth/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL, LoginReturnType, SignupReturnType } from "../utils/constants";
import { errorHandler } from "../lib/utils";
import { useAuth } from "../contexts/auth-context";
import { supabase } from "@/utils/supabase";

export function AuthForm() {
  const [status, setStatus] = useState<"signup" | "login">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log({ error });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="capitalize">{status}</CardTitle>
        <CardDescription>
          {status === "signup" ? "Sign up" : "Log in"} to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "signup" ? (
          <SignupForm setError={setError} setLoading={setLoading} />
        ) : (
          <LoginForm setError={setError} setLoading={setLoading} />
        )}

        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            onCheckedChange={(bool) => {
              setStatus(bool ? "login" : "signup");
            }}
            defaultChecked={status === "login"}
            className="cursor-pointer"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Already have an account?
          </label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-end">
        <Button
          className="cursor-pointer capitalize self-end"
          form="auth-form"
          disabled={loading}
        >
          {status}
        </Button>
        {error && (
          <p className="text-red-500 text-sm sel self-start">{error}</p>
        )}
      </CardFooter>
    </Card>
  );
}

const LoginForm = ({
  setError,
  setLoading,
}: {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setSession, setUser } = useAuth();

  const onSubmit = useCallback(async (values: LoginData) => {
    setLoading(true);
    try {
      const res = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      if (res.status !== 200) {
        const errMsg = await res.json();
        throw new Error(errMsg.error);
      }
      const data: LoginReturnType = await res.json();
      console.log({ data });
      setSession(data.session);
      setUser(data.user);
      supabase.auth.setSession(data.session);
    } catch (error) {
      const errMsg = errorHandler(error);
      setError(errMsg);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form {...form}>
      <form id="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input {...field} id="email" placeholder="email@example.com" />
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input {...field} id="password" placeholder="******" />
                <FormMessage />
              </div>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

const SignupForm = ({
  setError,
  setLoading,
}: {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });
  const { setSession, setUser } = useAuth();
  const onSubmit = useCallback(async (values: SignupData) => {
    setLoading(true);
    try {
      const res = await fetch(API_URL + "/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: values.full_name,
          email: values.email,
          password: values.password,
        }),
      });

      if (res.status !== 200) {
        const errMsg = await res.json();
        throw new Error(errMsg.error);
      }

      const data: SignupReturnType = await res.json();
      console.log({ data });
      setSession(data.session);
      setUser(data.user);
      supabase.auth.setSession(data.session);
    } catch (error) {
      const errMsg = errorHandler(error);
      setError(errMsg);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form {...form}>
      <form id="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="full_name">Full name</Label>
                <Input {...field} id="full_name" placeholder="Jhon Doe" />
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input {...field} id="email" placeholder="email@example.com" />
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input {...field} id="password" placeholder="******" />
                <FormMessage />
              </div>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
