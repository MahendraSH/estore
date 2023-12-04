import { FC } from "react";
import SizeClient from "./_components/sizes-client";
import prismadb from "@/lib/prismaDB";

interface SizesPageProps {
  params: { storeId: string };
}

const SizesPage: FC<SizesPageProps> = async ({ params }) => {
  const sizes = await prismadb.size.findMany({
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
        <SizeClient sizes={sizes} />
      </div>
    </div>
  );
};

export default SizesPage;
