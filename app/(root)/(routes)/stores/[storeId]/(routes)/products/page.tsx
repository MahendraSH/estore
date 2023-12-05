import { FC } from "react";
import ProductClient from "./_components/product-client";
import prismadb from "@/lib/prismaDB";

interface ProductsPageProps {
  params: { storeId: string };
}

const ProductsPage: FC<ProductsPageProps> = async ({ params }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      size: true,
      category: true,
      color: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col  ">
      <div className=" flex-1 space-y-4 p-8 pt-6 ">
        <ProductClient products={products} />
      </div>
    </div>
  );
};

export default ProductsPage;
