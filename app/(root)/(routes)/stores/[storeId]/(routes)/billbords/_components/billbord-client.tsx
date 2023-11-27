"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon, PlusIcon, Square, SquirrelIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";

interface BillbordClientProps {}

const BillbordClient: FC<BillbordClientProps> = ({}) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={"Billbords (0)"}
          description={"Manage billbords for your site"}
          icon={Square}
        />

        <div className="  ">
          <Button onClick={() => router.push(`/stores/${params.storeId}/billbords/new`)}>
            <PlusIcon className="h-4 w-4 mr-2 " /> Add New
          </Button>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default BillbordClient;
