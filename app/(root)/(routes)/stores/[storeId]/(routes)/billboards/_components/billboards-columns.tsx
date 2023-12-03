"use client";

import { Billboard } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import RowActions from "./billboards-row-actions";
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
      <div className=" border border-primary  w-10 h-10 rounded-lg flex justify-center items-center ">
        <Image
          src={row.getValue("imageUrl")}
          width={35}
          height={35}
          alt="image"
          className=" w-8 h-8  rounded-md "
        />
      </div>
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
    header: "Actions",
    cell: ({ row }) => {
      return <RowActions id={row.original.id} storeId={row.original.storeId} />;
    },
  },
];
