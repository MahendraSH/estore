"use client";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { OrderRow, columns } from "./orders-columns";

interface OrderClientProps {
  orders: OrderRow[] | [];
}

const OrderClient: FC<OrderClientProps> = ({ orders }) => {
  return (
    <>
      <div className="flex justify-between items-center ">
        <Heading
          title={`Orders (${orders?.length})`}
          description={"Manage orders for your site"}
          icon={ShoppingBag}
        />
      </div>
      <Separator />
      <DataTable serKey="products" columns={columns} data={orders} />
    </>
  );
};

export default OrderClient;
