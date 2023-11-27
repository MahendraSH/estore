import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config/siteConfig";
import { Button } from "./ui/button";

interface LogoProps {
  sidebar: boolean;
  isStore: boolean;
}

const Logo: FC<LogoProps> = ({ sidebar, isStore }) => {
  const imageStr = sidebar ? "E-bg" : "E";
  return (
    <Link href={"/"}>
      <Button
        variant={sidebar ? "default" : "ghost"}
        className={cn(
          "   normal-case text-xl  shadow-none w-full justify-start px-0 mx-0",
          !sidebar && "bg-background hover:bg-background"
        )}
      >
        <Image
          src={`/${imageStr}-dark.png`}
          width={35}
          height={35}
          alt="logo"
          className=" ml-1 hidden dark:block  image-full"
        />
        <Image
          src={`/${imageStr}.png`}
          width={35}
          height={35}
          alt="logo"
          className="ml-1 dark:hidden image-full  "
        />
        {!isStore && siteConfig.name}
      </Button>
    </Link>
  );
};

export default Logo;
