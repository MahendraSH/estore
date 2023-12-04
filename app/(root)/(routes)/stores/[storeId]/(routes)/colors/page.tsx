import { FC } from "react";
import ColorClient from "./_components/colors-client";
import prismadb from "@/lib/prismaDB";

interface ColorsPageProps {
  params: { storeId: string };
}

const ColorsPage: FC<ColorsPageProps> = async ({ params }) => {
  const colors = await prismadb.color.findMany({
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
        <ColorClient colors={colors} />
      </div>
    </div>
  );
};

export default ColorsPage;
