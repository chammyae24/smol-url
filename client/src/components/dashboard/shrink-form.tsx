import { useForm } from "react-hook-form";
import { urlSchemaResolver, UrlSchemaType } from "./zod";
import { Form, FormField, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ShrinkForm() {
  const form = useForm<UrlSchemaType>({
    resolver: urlSchemaResolver,
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = (values: UrlSchemaType) => {
    console.log(values);
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

        <Button type="submit" className="cursor-pointer">
          Shrink
        </Button>
      </form>
    </Form>
  );
}
