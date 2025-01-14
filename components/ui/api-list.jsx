"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

export const ApiList = ({ entityName, entityIdName }) => {
  const { storeId } = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${storeId}`;

  return (
    <div className="space-y-2">
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </div>
  );
};
