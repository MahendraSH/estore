import prismadb from "@/lib/prismaDB";
import { FC } from "react";
import ColorsFrom from "./_components/colors-from";

interface ColorsIdPageProps {
  params: { storeId: string; colorsId: string };
}

const ColorsIdPage: FC<ColorsIdPageProps> = async ({ params }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorsId,
      storeId: params.storeId,
    },
  });
  return (
    <>
      <div className=" flex flex-col">
        <div className=" flex-1 space-y-4 p-8 pt-6  ">
          {color && <ColorsFrom intialData={color} />}
          {!color && <ColorsFrom intialData={color} />}
        </div>
      </div>
    </>
  );
};

export default ColorsIdPage;
