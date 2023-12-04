"use client";

import { Size } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import RowActions from "./sizes-row-actions";
interface Column {
  label: string;
  id: string;
  createdAt: Date;
}

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "value",
    header: "Value",
  
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt ",
    cell: ({ row }) => (
      <span>
        {moment(row.getValue("createdAt")).format("dddd, MMMM Do YYYY")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <RowActions id={row.original.id} storeId={row.original.storeId} />;
    },
  },
];
