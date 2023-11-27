import prismadb from "@/lib/prismaDB";
import { FC } from "react";
import BillbordsFrom from "./_components/billbords-from";

interface BillbordsIdPageProps {
  params: { storeId: string; billbordsId: string };
}

const BillbordsIdPage: FC<BillbordsIdPageProps> = async ({ params }) => {
  const billbord = await prismadb.billboard.findUnique({
    where: {
      id: params.billbordsId,
      storeId: params.storeId,
    },
  });
  return (
    <>
      <div className=" flex flex-col">
        <div className=" flex-1 space-y-4 p-8 pt-6  ">
          {billbord && <BillbordsFrom intialData={billbord} />}
          {!billbord && <BillbordsFrom intialData={billbord} />}
        </div>
      </div>
    </>
  );
};

export default BillbordsIdPage;
