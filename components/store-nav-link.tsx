"use client";

import { redirect, useParams, usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DashboardIcon, SizeIcon } from "@radix-ui/react-icons";
import { Package, PackageIcon, Palette, SettingsIcon, ShoppingBagIcon, SquareAsterisk, SquareIcon, SquareStackIcon } from "lucide-react";

interface StoreNavLinkProps {
  sidebar: boolean;
  onClose?: () => void;
}

const StoreNavLink: FC<StoreNavLinkProps> = ({ sidebar, onClose }) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const routes = [
    {
      label: "dashbord",
      href: `/stores/${params.storeId}`,
      active: pathname === `/stores/${params.storeId}`,
      Icon: DashboardIcon,
    },
    {
      label: "billbords",
      href: `/stores/${params.storeId}/billbords`,
      active: pathname === `/stores/${params.storeId}/billbords`,
      Icon: SquareIcon,
    },
    {
      label: "categories",
      href: `/stores/${params.storeId}/categories`,
      active: pathname === `/stores/${params.storeId}/categories`,
      Icon: SquareStackIcon,
    },
    {
      label: "colors",
      href: `/stores/${params.storeId}/colors`,
      active: pathname === `/stores/${params.storeId}/colors`,
      Icon: Palette,
    },
    {
      label: "sizes",
      href: `/stores/${params.storeId}/sizes`,
      active: pathname === `/stores/${params.storeId}/sizes`,
      Icon: SizeIcon,
    },
    {
      label: "products",
      href: `/stores/${params.storeId}/products`,
      active: pathname === `/stores/${params.storeId}/products`,
      Icon: PackageIcon
    },
    {
      label: "orders",
      href: `/stores/${params.storeId}/orders`,
      active: pathname === `/stores/${params.storeId}/orders`,
      Icon: ShoppingBagIcon,
    },
    {
      label: "settings",
      href: `/stores/${params.storeId}/settings`,
      active: pathname === `/stores/${params.storeId}/settings`,
      Icon: SettingsIcon,
    },
  ];

  return (
    <>
      {routes.map((item) => (
        <Button
          key={item.href}
          variant={!item.active ? "ghost" : "link"}
          className={cn("text-sm", sidebar && " w-full  p-0  ")}
          onClick={() => {
            onClose && onClose();
            router.push(item.href);
          }}
        >
          { sidebar &&  item.Icon && <item.Icon  className="h-4 w-4 mr-2 "/>}
          {item.label}
          {sidebar && (
            <div
              className={cn(
                "h-full p-0.5 bg-primary ml-auto  opacity-0 transition-all",
                item.active && " opacity-100"
              )}
            />
          )}
        </Button>
      ))}
    </>
  );
};

export default StoreNavLink;
