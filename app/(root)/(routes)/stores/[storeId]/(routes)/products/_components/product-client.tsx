"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import { DatabaseIcon, Package, PlusIcon, Square } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { columns } from "./products-columns";
import ApiList from "@/components/ui/api-list";

interface ProductClientProps {
  products:
    | (Product & { category: Category } & { size: Size } & {
        color: Color;
      } & { images: Image[] })[]
    | [];
}

const ProductClient: FC<ProductClientProps> = ({ products }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center ">
        <Heading
          title={`Products (${products?.length})`}
          description={"Manage products for your site"}
          icon={Package}
        />

        <div className="  ">
          <Button
            onClick={() =>
              router.push(`/stores/${params.storeId}/products/new`)
            }
          >
            <PlusIcon className="h-4 w-4 mr-2 " /> Add New
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable serKey="name" columns={columns} data={products} />
      <Heading
        title="API"
        description=" API calls for products"
        icon={DatabaseIcon}
      />
      <Separator />
      <ApiList itemName="products" itemId="productsId" />
    </>
  );
};

export default ProductClient;
