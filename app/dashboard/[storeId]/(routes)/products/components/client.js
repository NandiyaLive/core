"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { columns } from "./columns";

const ProductClient = ({ products }) => {
  const router = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className="flex justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage Products of Your Store."
        />

        <Button onClick={() => router.push(`/dashboard/${storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Product
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={products} searchKey={"label"} />

      <Heading title="API" description="API Calls for Products." />

      <Separator />

      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
