"use client";

import { Billboard } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import RowActions from "./row-actions";
import Image from "next/image";
interface Column {
  label: string;
  id: string;
  createdAt: Date;
}

export const columns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },

  {
    accessorKey: "imageUrl",
    header: "Image ",
    cell: ({ row }) => (
      <span>
        <Image
          src={row.getValue("imageUrl")}
          width={35}
          height={35}
          alt="image"
          className=" w-8 h-8  rounded-md "
        />
      </span>
    ),
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
    cell: ({ row }) => {
      return <RowActions id={row.original.id} storeId={row.original.storeId} />;
    },
  },
];
