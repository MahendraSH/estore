"use client";

import { Billboard, Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import RowActions from "./categories-row-actions";
import Image from "next/image";
type ColumnType = Category & { billboard: Billboard };
export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "billboard",
    header: "Billboard ",
    cell: ({ row }) => {
      return (
        <div className=" flex   justify-start items-center w-full">
          <Image
            src={row.original.billboard.imageUrl}
            width={30}
            height={30}
            alt="billboard"
            className="w-5 h-5 rounded-md mr-2 block  "
          />
          {row.original.billboard.label}
        </div>
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
