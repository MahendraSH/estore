import { FC } from "react";
import BillboardClient from "./_components/billboard-client";
import prismadb from "@/lib/prismaDB";

interface BillboardsPageProps {
  params: { storeId: string };
}

const BillboardsPage: FC<BillboardsPageProps> = async ({ params }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col  ">
      <div className=" flex-1 space-y-4 p-8 pt-6 ">
        <BillboardClient billboards={billboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
