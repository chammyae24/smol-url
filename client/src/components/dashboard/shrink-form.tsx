import { useForm } from "react-hook-form";
import { urlSchemaResolver, UrlSchemaType } from "./zod";
import { Form, FormField, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { errorHandler } from "@/lib/utils";
import { useState } from "react";
import { API_URL } from "@/utils/constants";
import { useAuth } from "@/contexts/auth-context";

export default function ShrinkForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();
  const form = useForm<UrlSchemaType>({
    resolver: urlSchemaResolver,
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: UrlSchemaType) => {
    if (!session) {
      setError("You must be logged in to shorten a URL");
      window.location.reload();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(API_URL + "/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          url: values.url,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      window.location.reload();
    } catch (error) {
      setError(errorHandler(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 w-full"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <div className="flex flex-col space-y-1.5 w-full">
              <label htmlFor="url" className="sr-only">
                URL
              </label>
              <Input {...field} id="url" placeholder="https://example.com" />
              <FormMessage />
            </div>
          )}
        />

        <Button type="submit" className="cursor-pointer" disabled={loading}>
          Shrink
        </Button>
      </form>
      {error && <p className="text-red-500 text-sm self-start">{error}</p>}
    </Form>
  );
}
