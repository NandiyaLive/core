"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { columns } from "./columns";

const SizeClient = ({ sizes }) => {
  const router = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className="flex justify-between">
        <Heading
          title={`Sizes (${sizes.length})`}
          description="Manage Sizes in Your Store."
        />

        <Button onClick={() => router.push(`/dashboard/${storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Size
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={sizes} searchKey={"label"} />

      <Heading title="API" description="API Calls for Sizes." />

      <Separator />

      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizeClient;
