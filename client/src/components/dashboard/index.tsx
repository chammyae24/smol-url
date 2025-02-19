import { useState } from "react";
import ShortLinkTable from "./short-link-table";
import ShrinkForm from "./shrink-form";
import ClickTable from "./click-table";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export type ShortLink = {
  short_code: {
    short_code: string;
    destination_url: string;
    click_count: number;
  };
};

export default function Dashboard() {
  const [selectedShortLink, setSelectedShortLink] = useState<ShortLink | null>(
    null
  );
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 gap-2">
      <ShrinkForm />
      <div className="w-full h-full flex flex-col gap-2">
        {selectedShortLink ? (
          <>
            <Card className="self-start">
              <CardHeader>
                <CardTitle className=" font-bold">
                  Code:
                  <span className="text-gray-500 font-medium">
                    {selectedShortLink.short_code.short_code}
                  </span>
                </CardTitle>

                <CardDescription className="text-gray-500 font-medium">
                  URL: {selectedShortLink.short_code.destination_url}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 font-medium text-4xl">
                  Count: {selectedShortLink.short_code.click_count}
                </p>
              </CardContent>
              <CardFooter className="justify-end"></CardFooter>
            </Card>
            <Button
              size="sm"
              className="self-end cursor-pointer"
              onClick={() => {
                setSelectedShortLink(null);
              }}
            >
              Back
            </Button>

            <ClickTable
              selectedShortCode={selectedShortLink.short_code.short_code}
            />
          </>
        ) : (
          <ShortLinkTable setSelectedShortLink={setSelectedShortLink} />
        )}
      </div>
    </div>
  );
}
