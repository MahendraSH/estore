import { FC } from "react";
import BillbordClient from "./_components/billbord-client";
import prismadb from "@/lib/prismaDB";

interface BillbordsPageProps {
  params: { storeId: string };
}

const BillbordsPage: FC<BillbordsPageProps> = async ({ params }) => {
  const billbords = await prismadb.billboard.findMany({
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
        <BillbordClient billbords={billbords} />
      </div>
    </div>
  );
};

export default BillbordsPage;
