"use client";

import { CopyIcon, ServerIcon } from "lucide-react";
import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const ApiAlert: FC<ApiAlertProps> = ({ title, description, variant }) => {
  return (
    <>
      <Alert>
        <ServerIcon className="h-4 w-4 mr-2" />

        <AlertTitle className="gap-x-4 flex  items-center  text-sm">
          {title}
          <Badge variant={variant === "admin" ? "secondary" : "default"}>
            {variant === "public" && "public"}
            {variant === "admin" && "private"}
          </Badge>
        </AlertTitle>
        <AlertDescription className="flex mt-2 md:overflow-hidden overflow-x-scroll  ">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {description}
          </code>{" "}
          <span className="ml-auto ">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                navigator.clipboard.writeText(description);
                toast.success("API Route copied to clipboard.");
              }}
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
          </span>
        </AlertDescription>
      </Alert>
    </>
  );
};

export default ApiAlert;
