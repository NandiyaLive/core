"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

const OrderClient = ({ orders }) => {
  return (
    <>
      <Heading title={`Orders (${orders.length})`} description="Manage orders of your store." />

      <Separator />

      <DataTable columns={columns} data={orders} searchKey={"products"} />
    </>
  );
};

export default OrderClient;
