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
import { supabase } from "@/utils/supabase";
import { parseUserAgent, UserAgent } from "@/utils/user-agent-extractor";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type Clicks = {
  id: number;
  code: string;
  user_agent: UserAgent;
  ip_address: string;
  clicked_at: string;
};
export default function ClickTable({
  selectedShortCode,
}: {
  selectedShortCode: string;
}) {
  const [clicks, setClicks] = useState<Clicks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState<{ start: number; end: number }>({
    start: 0,
    end: 10,
  });
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("clicks")
          .select("id, code, user_agent, ip_address, clicked_at")
          .match({ code: selectedShortCode })
          .order("clicked_at", { ascending: false })
          .range(range.start, range.end)
          .limit(10);
        console.log({ data, error });
        if (error) throw error;
        const clicks = data.map((click) => ({
          ...click,
          user_agent: parseUserAgent(click.user_agent),
        }));
        setClicks(clicks);
      } catch (error) {
        setError(errorHandler(error));
      } finally {
        setLoading(false);
      }
    })();
  }, [range.end, range.start, selectedShortCode]);

  return (
    <>
      <Table>
        <TableCaption>Clicks count</TableCaption>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <TableHeader>
          <TableRow className="[&>th]:min-w-28">
            <TableHead>Browser</TableHead>
            <TableHead>OS</TableHead>
            <TableHead>Device Type</TableHead>
            <TableHead>Device Model</TableHead>
            <TableHead>Architecture</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Clicked At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            clicks.map((click) => (
              <TableRow key={click.id} className="capitalize">
                <TableCell>{click.user_agent.browser?.name}</TableCell>
                <TableCell>{click.user_agent.os}</TableCell>
                <TableCell>{click.user_agent.deviceType}</TableCell>
                <TableCell>{click.user_agent.deviceModel}</TableCell>
                <TableCell>{click.user_agent.architecture}</TableCell>
                <TableCell>{click.ip_address}</TableCell>
                <TableCell>{click.clicked_at}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setRange({
              start: range.start - 10,
              end: range.end - 10,
            });
          }}
          disabled={range.start === 0}
          className="cursor-pointer"
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setRange({
              start: range.start + 10,
              end: range.end + 10,
            });
          }}
          disabled={range.end === clicks.length || clicks.length < 10}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>
    </>
  );
}
