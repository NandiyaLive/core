"use client";

import { X, Check } from "lucide-react";

export const columns = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalPrice",
    header: "TotalPrice",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) =>
      row.original.isPaid ? (
        <Check className="h-4 text-green-500" />
      ) : (
        <X className="h-4 text-red-500" />
      ),
  },
];
