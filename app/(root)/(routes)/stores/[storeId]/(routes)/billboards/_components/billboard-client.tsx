"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { DatabaseIcon, PlusIcon, Square } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { columns } from "./billboards-columns";
import ApiList from "@/components/ui/api-list";

interface BillboardClientProps {
  billboards: Billboard[] | [];
}

const BillboardClient: FC<BillboardClientProps> = ({ billboards }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center ">
        <Heading
          title={`Billboards (${billboards?.length})`}
          description={"Manage billboards for your site"}
          icon={Square}
        />

        <div className="  ">
          <Button
            onClick={() =>
              router.push(`/stores/${params.storeId}/billboards/new`)
            }
          >
            <PlusIcon className="h-4 w-4 mr-2 " /> Add New
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable serKey="label" columns={columns} data={billboards} />
      <Heading
        title="API"
        description=" API calls for billboards"
        icon={DatabaseIcon}
      />
      <Separator />
      <ApiList itemName="billboards" itemId="billboardsId" />
    </>
  );
};

export default BillboardClient;
