"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Color } from "@prisma/client";
import { DatabaseIcon, PlusIcon, Square } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { columns } from "./colors-columns";
import ApiList from "@/components/ui/api-list";

interface ColorsClientProps {
  colors: Color[] | [];
}

const ColorsClient: FC<ColorsClientProps> = ({ colors }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center ">
        <Heading
          title={`Colors (${colors?.length})`}
          description={"Manage colors for your site"}
          icon={Square}
        />

        <div className="  ">
          <Button
            onClick={() =>
              router.push(`/stores/${params.storeId}/colors/new`)
            }
          >
            <PlusIcon className="h-4 w-4 mr-2 " /> Add New
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable serKey="name" columns={columns} data={colors} />
      <Heading
        title="API"
        description=" API calls for colors"
        icon={DatabaseIcon}
      />
      <Separator />
      <ApiList itemName="colors" itemId="colorsId" />
    </>
  );
};

export default ColorsClient;
