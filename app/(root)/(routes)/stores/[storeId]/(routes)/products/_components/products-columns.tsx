"use client";

import { Category, Product, Size, Image as IMage, Color } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import RowActions from "./products-row-actions";
import Image from "next/image";
import { formatPrice } from "@/lib/formate";

export const columns: ColumnDef<
  Product & { category: Category } & { size: Size } & { color: Color } & {
    images: IMage[];
  }
>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => (
      <div className=" border border-primary  w-10 h-10 rounded-lg flex justify-center items-center ">
        <Image
          src={row.original.images[0].url}
          width={35}
          height={35}
          alt="image"
          className=" w-8 h-8  rounded-md "
        />
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className=" text-muted-foreground  font-semibold ">
        {formatPrice(row.original.price)}
      </div>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className=" text-muted-foreground ">{row.original.category.name} </span>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => (
      <span className=" text-sm ">
        {row.original.size.value}{" "}
        <span className=" text-muted-foreground text-xs font-semibold">
          ({row.original.size.name})
        </span>
      </span>
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className=" flex  items-center  gap-x-3 ">
        <div
          className=" rounded-full w-8 h-8 p-1 m-1"
          style={{ backgroundColor: row.original.color.value }}
        ></div>
        <span className="  text-muted-foreground text-xs font-semibold ">
          ({row.original.color.name})
        </span>
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
