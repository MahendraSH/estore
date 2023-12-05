"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
export  interface OrderRow {
  id: string;
  products: string;
  phone: string;
  address: string;
  totalPrice: number;
  createdAt: Date;
  isPaid: boolean,
}

export const columns: ColumnDef<OrderRow>[] = [
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
    accessorKey: "totalPrice",
    header: "TotalPrice",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
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
  
];
