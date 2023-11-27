import { FC } from "react";
import Logo from "./logo";
import { ClerkLoaded, ClerkLoading, UserButton, auth } from "@clerk/nextjs";
import StoreNavLink from "./store-nav-link";
import { Button } from "./ui/button";
import StoreSidebar from "./store-sidebar";
import { Skeleton } from "./ui/skeleton";
import StoreSwitcher from "./store-switcher";
import prismadb from "@/lib/prismaDB";
import { redirect } from "next/navigation";

interface NavbarStoreProps {}

const NavbarStore: FC<NavbarStoreProps> = async ({}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <>
      <div className=" navbar z-40 fixed top-0  bg-background shadow shadow-secondary ">
        <div className="mr-auto pr-4  space-x-2 ">
          <Logo isStore={true} sidebar={false} />
          <div>
            <StoreSwitcher items={stores} />
          </div>
        </div>
        <div className="px-6  hidden lg:flex  items-center  space-x-4 lg:spae-x-5">
          <StoreNavLink sidebar={false} />
        </div>
        <div className=" ml-auto flex items-center  space-x-2 md:space-x-4 ">
          <ClerkLoading>
            <Skeleton className="h-8 w-8  rounded-full" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
          <span className=" lg:hidden ">
            <StoreSidebar />
          </span>
        </div>
      </div>
    </>
  );
};

export default NavbarStore;
