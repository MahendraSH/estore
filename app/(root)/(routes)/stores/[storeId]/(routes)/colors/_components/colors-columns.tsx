"use client";

import { Color } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import RowActions from "./colors-row-actions";
interface Column {
  label: string;
  id: string;
  createdAt: Date;
}

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      return (
        <div
          className={`  border-2 w-8 h-8  rounded-full   p-1 m-1`}
          style={{ backgroundColor: row.original.value }}
        ></div>
      );
    },
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
