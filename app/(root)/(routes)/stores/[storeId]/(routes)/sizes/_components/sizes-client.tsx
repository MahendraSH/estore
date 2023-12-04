"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Size } from "@prisma/client";
import { DatabaseIcon, PlusIcon, Square } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { columns } from "./sizes-columns";
import ApiList from "@/components/ui/api-list";
import { SizeIcon } from "@radix-ui/react-icons";

interface SizesClientProps {
  sizes: Size[] | [];
}

const SizesClient: FC<SizesClientProps> = ({ sizes }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center ">
        <Heading
          title={`Sizes (${sizes?.length})`}
          description={"Manage sizes for your site"}
          icon={SizeIcon}
        />

        <div className="  ">
          <Button
            onClick={() =>
              router.push(`/stores/${params.storeId}/sizes/new`)
            }
          >
            <PlusIcon className="h-4 w-4 mr-2 " /> Add New
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable serKey="name" columns={columns} data={sizes} />
      <Heading
        title="API"
        description=" API calls for sizes"
        icon={DatabaseIcon}
      />
      <Separator />
      <ApiList itemName="sizes" itemId="sizesId" />
    </>
  );
};

export default SizesClient;
