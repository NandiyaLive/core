"use client";

import { Check, X } from "lucide-react";
import CellAction from "./cell-action";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) =>
      row.original.isArchived ? (
        <Check className="h-4 text-green-500" />
      ) : (
        <X className="h-4 text-red-500" />
      ),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) =>
      row.original.isFeatured ? (
        <Check className="h-4 text-green-500" />
      ) : (
        <X className="h-4 text-red-500" />
      ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
