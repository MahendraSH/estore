import { FC } from "react";

import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { siteConfig } from "@/lib/config/siteConfig";
import Link from "next/link";
import { redirect } from "next/navigation";
interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <>
      <footer
        className="footer  md:footer-center p-10   rounded  w-full border-t-2 border-secondary
      "
      >
        <nav className="grid md:grid-flow-col gap-0 md:gap-4 ">
          <Link target="_blank" href={"https://mahendrash.vercel.app/"}>
            <Button variant={"link"}> contact </Button>
          </Link>
          <Button variant={"link"}> Terms and Conditions </Button>
          <Button variant={"link"}> Privacy Policy </Button>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-2 md:gap-4">
            <a>
              <TwitterLogoIcon className="h-5 w-5 " />
            </a>
            <Link href={"https://github.com/MahendraSH/"} target="_blank">
              <GitHubLogoIcon className="h-5 w-5 " />
            </Link>
            <Link href={"https://www.linkedin.com/in/mahendra-s-h-14a74721a/"} target="_blank">
              <LinkedInLogoIcon className="h-5 w-5" />
            </Link>
            <a>
              <InstagramLogoIcon className="h-5 w-5" />
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2023 - All right reserved by {siteConfig.name}</p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
