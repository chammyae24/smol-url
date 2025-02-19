import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { errorHandler } from "@/lib/utils";
import { API_URL } from "@/utils/constants";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ShortLink } from ".";

export default function ShortLinkTable({
  setSelectedShortLink,
}: {
  setSelectedShortLink: React.Dispatch<React.SetStateAction<ShortLink | null>>;
}) {
  const [shortLinks, setShortLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("user_urls")
          .select("short_code (short_code,destination_url ,click_count)");

        // console.log({ data, error });
        if (error) throw error;
        // @ts-expect-error supabase doesn't know type of joined table
        setShortLinks(data);
      } catch (error) {
        const err = errorHandler(error);
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Table>
      <TableCaption>Your shrinked links.</TableCaption>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <TableHeader>
        <TableRow>
          <TableHead>Url</TableHead>
          <TableHead className="w-[100px]">Short code</TableHead>
          <TableHead className="w-[100px]">Count</TableHead>
          <TableHead className="w-[100px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      {loading ? (
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          {shortLinks.map((sl) => (
            <TableRow key={sl.short_code.short_code}>
              <TableCell className="font-medium">
                {sl.short_code.destination_url}
              </TableCell>
              <TableCell>
                <a
                  href={API_URL + "/" + sl.short_code.short_code}
                  target="_blank"
                  className="underline text-blue-500"
                >
                  {sl.short_code.short_code}
                </a>
              </TableCell>
              <TableCell>{sl.short_code.click_count}</TableCell>
              <TableCell>
                <Button
                  variant="default"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedShortLink(sl);
                  }}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
