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
      <Alert className=" md:overflow-hidden overflow-y-scroll">
        <ServerIcon className="h-4 w-4 mr-2" />

        <AlertTitle className="gap-x-4 flex  items-center  text-sm">
          {title}
          <Badge variant={variant === "admin" ? "secondary" : "default"}>
            {variant === "public" && "public"}
            {variant === "admin" && "private"}
          </Badge>
          <Button
            variant={"ghost"}
            size={"icon"}
            className=" md:hidden"
            onClick={() => {
              navigator.clipboard.writeText(description);
              toast.success("API Route copied to clipboard.");
            }}
          >
            <CopyIcon className="h-4 w-4 " />
          </Button>
        </AlertTitle>
        <AlertDescription className="flex mt-2   ">
          <code className=" rounded bg-muted px-1 py-2 font-mono text-sm font-semibold flex-1">
            {description}
          </code>{" "}
          <span className=" ml-auto text-secondary-foreground hidden md:flex">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                navigator.clipboard.writeText(description);
                toast.success("API Route copied to clipboard.");
              }}
            >
              <CopyIcon className="h-4 w-4 " />
            </Button>
          </span>
        </AlertDescription>
      </Alert>
    </>
  );
};

export default ApiAlert;
