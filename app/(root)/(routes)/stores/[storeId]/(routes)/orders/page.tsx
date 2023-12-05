import { FC } from "react";
import OrderClient from "./_components/order-client";
import prismadb from "@/lib/prismaDB";

interface OrdersPageProps {
  params: { storeId: string };
}

const OrdersPage: FC<OrdersPageProps> = async ({ params }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col  ">
      <div className=" flex-1 space-y-4 p-8 pt-6 ">
        <OrderClient
          orders={orders.map((item) => ({
            address: item.address,
            isPaid: item.isPaid,
            phone: item.phone,
            id: item.id,
            createdAt: item.createdAt,
            products: item.orderItems
              .map((orderItem) => orderItem.product.name)
              .join(" ,"),
            totalPrice: item.orderItems.reduce((total, orderItem) => {
              return total + orderItem.product.price;
            }, 0),
          }))}
        />
      </div>
    </div>
  );
};

export default OrdersPage;
