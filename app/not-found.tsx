"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}) => {
  const router = useRouter();

  return (
    <div className=" flex flex-col justify-center items-center  gap-6 min-h-screen ">
      <Button variant={"ghost"} className=" text-3xl">
        {" "}
        Error : Page Not Found{" "}
      </Button>
      <Button
        onClick={() => {
          router.back();
        }}
      >
        {" "}
        Go Back{" "}
      </Button>
    </div>
  );
};

export default NotFound;
