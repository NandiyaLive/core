"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { columns } from "./columns";

const BillboardClient = ({ billboards }) => {
  const router = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className="flex justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage billboards of your store."
        />

        <Button onClick={() => router.push(`/dashboard/${storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Billboard
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={billboards} searchKey={"label"} />

      <Heading title="API" description="API Calls for Billboards." />

      <Separator />

      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

export default BillboardClient;
