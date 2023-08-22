"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { columns } from "./columns";

const ColorClient = ({ colors }) => {
  const router = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className="flex justify-between">
        <Heading title={`Colors (${colors.length})`} description="Manage Colors in Your Store." />

        <Button onClick={() => router.push(`/dashboard/${storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Color
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={colors} searchKey={"name"} />

      <Heading title="API" description="API Calls for Colors." />

      <Separator />

      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};

export default ColorClient;
