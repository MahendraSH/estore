import { Button } from "@/components/ui/button";
import LoaderSpiner from "@/components/ui/loader-spiner";
import { siteConfig } from "@/lib/config/siteConfig";
import { ClerkLoading, ClerkLoaded, SignInButton, auth } from "@clerk/nextjs";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface HeadingProps {}

const Heading: FC<HeadingProps> = ({}) => {
  const { userId } = auth();
  const isAuth = userId ? true : false;
  return (
    <>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent  bg-gradient-to-tr from-stone-800  via-primary to-secondary-foreground dark:bg-gradient-to-tr dark:from-stone-300  dark:via-primary dark:to-secondary-foreground">
          Your All-in-one Platform For E-Commerce . Welcome to{" "}
          <span className=" underline dark:text-stone-300 text-stone-900">
            {siteConfig.name}
          </span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium text-primary    dark:text-primary/90">
          {siteConfig.description}
        </h3>

        <ClerkLoading>
          <div className="flex justify-center mx-auto ">
            <LoaderSpiner />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <>
            {!isAuth && (
              <div className="flex justify-center mx-auto  ">
                <span className="btn  ">
                  <SignInButton>Get Started</SignInButton>
                </span>
              </div>
            )}

            {isAuth && (
              <div className="flex justify-center mx-auto ">
                <Link href="/stores" className="">
                  <Button variant={"secondary"}>
                    Stores
                    <MoveRight className="  w-8 ml-2  " />
                  </Button>
                </Link>
              </div>
            )}
          </>
        </ClerkLoaded>
      </div>
    </>
  );
};

export default Heading;
