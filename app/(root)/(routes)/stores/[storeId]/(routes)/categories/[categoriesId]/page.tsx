import prismadb from "@/lib/prismaDB";
import { FC } from "react";
import CategorysFrom from "./_components/categories-from";

interface CategorysIdPageProps {
  params: { storeId: string; categoriesId: string };
}

const CategorysIdPage: FC<CategorysIdPageProps> = async ({ params }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoriesId,
      storeId: params.storeId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <>
      <div className=" flex flex-col">
        <div className=" flex-1 space-y-4 p-8 pt-6  ">
          {category && (
            <CategorysFrom intialData={category} billboards={billboards} />
          )}
          {!category && (
            <CategorysFrom intialData={category} billboards={billboards} />
          )}
        </div>
      </div>
    </>
  );
};

export default CategorysIdPage;
