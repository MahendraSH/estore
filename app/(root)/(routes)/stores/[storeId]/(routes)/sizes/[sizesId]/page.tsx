import prismadb from "@/lib/prismaDB";
import { FC } from "react";
import SizesFrom from "./_components/sizes-from";

interface SizesIdPageProps {
  params: { storeId: string; sizesId: string };
}

const SizesIdPage: FC<SizesIdPageProps> = async ({ params }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizesId,
      storeId: params.storeId,
    },
  });
  return (
    <>
      <div className=" flex flex-col">
        <div className=" flex-1 space-y-4 p-8 pt-6  ">
          {size && <SizesFrom intialData={size} />}
          {!size && <SizesFrom intialData={size} />}
        </div>
      </div>
    </>
  );
};

export default SizesIdPage;
