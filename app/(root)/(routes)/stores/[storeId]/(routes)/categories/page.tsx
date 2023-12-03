import { FC } from "react";
import CategoryClient from "./_components/category-client";
import prismadb from "@/lib/prismaDB";

interface CategoriesPageProps {
  params: { storeId: string };
}

const CategoriesPage: FC<CategoriesPageProps> = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col  ">
      <div className=" flex-1 space-y-4 p-8 pt-6 ">
        <CategoryClient categories={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
