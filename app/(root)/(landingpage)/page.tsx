import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { FC } from "react";
import Heading from "./_components/heading";
import Heros from "./_components/hero";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pt-16 mt-1">
        <Heading />
        <Heros />
      </div>
    </>
  );
};

export default page;
