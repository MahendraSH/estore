"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { PlusIcon, Square } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { columns } from "./columns";

interface BillbordClientProps {
  billbords: Billboard[] | [];
}

const BillbordClient: FC<BillbordClientProps> = ({ billbords }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center ">
        <Heading
          title={"Billbords (0)"}
          description={"Manage billbords for your site"}
          icon={Square}
        />

        <div className="  ">
          <Button
            onClick={() =>
              router.push(`/stores/${params.storeId}/billbords/new`)
            }
          >
            <PlusIcon className="h-4 w-4 mr-2 " /> Add New
          </Button>
        </div>
      </div>
      <Separator />
      {billbords?.length > 0 && (
        <DataTable serKey="label" columns={columns} data={billbords} />
      )}
    </>
  );
};

export default BillbordClient;
