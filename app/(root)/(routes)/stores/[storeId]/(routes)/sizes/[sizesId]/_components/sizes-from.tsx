"use client";

import * as z from "zod";
import { Size } from "@prisma/client";
import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/ui/heading";
import { EditIcon, PlusSquare, TrashIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import DeleteModel from "@/components/models/delete-model";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "label must be at least 2 characters.",
  }),
  value: z.string().min(1),
});

interface SizesFromProps {
  intialData: Size | null;
}

const SizesFrom: FC<SizesFromProps> = ({ intialData }) => {
  const params = useParams();
  const router = useRouter();
  const url = useOrigin();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const title = intialData ? "Edit Size" : "Create Size";
  const description = intialData ? "Edit  a size" : "Add a new size";
  const Icon = intialData ? EditIcon : PlusSquare;
  const toastSuccessMessage = intialData ? "size updated" : "size created ";
  const actions = intialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: intialData?.name || "",
      value: intialData?.value || "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (intialData) {
        await axios.patch(
          `/api/stores/${params.storeId}/sizes/${params.sizesId}`,
          values
        );
      } else {
        const res = await axios.post(
          `/api/stores/${params.storeId}/sizes`,
          values
        );
      }
      router.push(`/stores/${params.storeId}/sizes`);
      router.refresh();
      toast.success(toastSuccessMessage);
    } catch (error) {
      toast.error("something when wrong ");
      console.log("size update", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteConfrom = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/sizes/${params.sizesId}`
      );
      router.refresh();
      toast.success("size  deleted");
      router.push(`/stores/${params.storeId}/sizes`);
      router.refresh();
    } catch (error) {
      toast.error("something when wrong ");
      console.log("size delete", error);
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
      <div className="flex justify-between items-center">
        <Heading title={title} description={description} icon={Icon} />

        {intialData && (
          <div className="  ">
            <Button
              variant={"destructive"}
              disabled={isLoading}
              onClick={() => setIsOpen(true)}
              className="bg-destructive"
            >
              <TrashIcon className="h-4 w-4 mr-2 " /> Delete Size
            </Button>
          </div>
        )}
      </div>

      <Separator />
      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full "
          >
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8   ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Size name"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size value </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="size value"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="ml-auto">
              <Button type="submit" disabled={isLoading} className="m-1 ">
                {actions}
              </Button>
            </div>
          </form>
        </Form>
      </>
    </>
  );
};

export default SizesFrom;
