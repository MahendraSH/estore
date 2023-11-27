"use client";

import { FC, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, MoreHorizontalIcon } from "lucide-react";
import Logo from "./logo";
import StoreNavLink from "./store-nav-link";
import { Button } from "./ui/button";

interface StoreSidebarProps {}

const StoreSidebar: FC<StoreSidebarProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <Button variant={"ghost"} size={"icon"} onClick={() => setIsOpen(true)}>
          <MoreHorizontalIcon className=" h-6 w-6 my-auto  " />
        </Button>
        <SheetContent className=" w-[90%]" side={"left"}>
          <SheetHeader className="w-full">
            <SheetTitle>
              <Logo isStore={false} sidebar={false} />
            </SheetTitle>
            <div className="flex  justify-start flex-col gap-y-2  w-full ">
              <StoreNavLink sidebar={true} onClose={() => setIsOpen(false)} />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default StoreSidebar;
