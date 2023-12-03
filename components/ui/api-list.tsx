"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import ApiAlert from "./api-alert";

interface ApiListProps {
  itemName: string;
  itemId: string;
}

const ApiList: FC<ApiListProps> = ({ itemId, itemName }) => {
  const params = useParams();
  const orgin = useOrigin();

  return (
    <div className=" gap-y-6 flex  flex-col">
      <ApiAlert
        title="GET"
        variant="public"
        description={`${orgin}/api/stores/${params.storeId}/${itemName}`}
      />

      <ApiAlert
        title="GET"
        variant="public"
        description={`${orgin}/api/stores/${params.storeId}/${itemName}/{${itemId}}`}
      />

      <ApiAlert
        title="POST"
        variant="admin"
        description={`${orgin}/api/stores/${params.storeId}/${itemName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${orgin}/api/stores/${params.storeId}/${itemName}/{${itemId}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${orgin}/api/stores/${params.storeId}/${itemName}/{${itemId}}`}
      />
    </div>
  );
};

export default ApiList;
