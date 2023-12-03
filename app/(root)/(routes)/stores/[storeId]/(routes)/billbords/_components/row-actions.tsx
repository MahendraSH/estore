"use client";
import { FC, useState } from "react";
import { CopyIcon, EditIcon, MoreHorizontal, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import DeleteModel from "@/components/models/delete-model";
import axios from "axios";
interface RowActionsProps {
  id: string;
  storeId: string;
}

const RowActions: FC<RowActionsProps> = ({ id, storeId }) => {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onDeleteConfrom = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${storeId}/billbords/${id}`);
      router.refresh();
      toast.success("billbord  deleted");
      router.push(`/stores/${storeId}/billbords`);
    } catch (error) {
      toast.error("something when wrong ");
      console.log("billbord delete", error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <DeleteModel
        isOpen={isOpen}
        loading={isLoading}
        onClose={() => setIsOpen(false)}
        onDelelete={onDeleteConfrom}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-5 w-5 text-primary " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(id);
              toast.success(" Id Copied");
            }}
          >
            <CopyIcon className="h-4 w-4 mr-2" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/stores/${storeId}/billbords/${id}`)}
          >
            <EditIcon className="w-4 h-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoading}
            onClick={() => setIsOpen(true)}
          >
            <TrashIcon className="h-4 w-4 mr-2 " /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default RowActions;
