"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";
import { DatabaseIcon, PlusIcon, Square } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { columns } from "./categories-columns";
import ApiList from "@/components/ui/api-list";

interface CategoryClientProps {
  categories: Category[] | [];
}

const CategoryClient: FC<CategoryClientProps> = ({ categories }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center ">
        <Heading
          title={`Categories(${categories?.length})`}
          description={"Manage categories for your site"}
          icon={Square}
        />

        <div className="  ">
          <Button
            onClick={() =>
              router.push(`/stores/${params.storeId}/categories/new`)
            }
          >
            <PlusIcon className="h-4 w-4 mr-2 " /> Add New
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable serKey="name" columns={columns} data={categories} />
      <Heading
        title="API"
        description=" API calls for categories"
        icon={DatabaseIcon}
      />
      <Separator />
      <ApiList itemName="categories" itemId="categoriesId" />
    </>
  );
};

export default CategoryClient;
