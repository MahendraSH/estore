import prismadb from "@/lib/prismaDB";
import { FC } from "react";
import BillboardsFrom from "./_components/billboards-from";

interface BillboardsIdPageProps {
  params: { storeId: string; billboardsId: string };
}

const BillboardsIdPage: FC<BillboardsIdPageProps> = async ({ params }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardsId,
      storeId: params.storeId,
    },
  });
  return (
    <>
      <div className=" flex flex-col">
        <div className=" flex-1 space-y-4 p-8 pt-6  ">
          {billboard && <BillboardsFrom intialData={billboard} />}
          {!billboard && <BillboardsFrom intialData={billboard} />}
        </div>
      </div>
    </>
  );
};

export default BillboardsIdPage;
