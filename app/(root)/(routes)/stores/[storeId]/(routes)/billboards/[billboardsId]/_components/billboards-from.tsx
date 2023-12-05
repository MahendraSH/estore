"use client";

import * as z from "zod";
import { Billboard } from "@prisma/client";
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
  label: z.string().min(2, {
    message: "label must be at least 2 characters.",
  }),
  imageUrl: z.string().min(1),
});

interface BillboardsFromProps {
  intialData: Billboard | null;
}

const BillboardsFrom: FC<BillboardsFromProps> = ({ intialData }) => {
  const params = useParams();
  const router = useRouter();
  const url = useOrigin();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const title = intialData ? "Edit Billboard" : "Create Billboard";
  const description = intialData ? "Edit  a billboard" : "Add a new billboard";
  const Icon = intialData ? EditIcon : PlusSquare;
  const toastSuccessMessage = intialData
    ? "billboard updated"
    : "billboard created ";
  const actions = intialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: intialData?.label || "",
      imageUrl: intialData?.imageUrl || "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (intialData) {
        await axios.patch(
          `/api/stores/${params.storeId}/billboards/${params.billboardsId}`,
          values
        );
      } else {
        const res = await axios.post(
          `/api/stores/${params.storeId}/billboards`,
          values
        );
      }
      router.push(`/stores/${params.storeId}/billboards`);
      router.refresh();
      router.refresh();
      toast.success(toastSuccessMessage);
    } catch (error) {
      toast.error("something when wrong ");
      console.log("billboard update", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteConfrom = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/billboards/${params.billboardsId}`
      );
      router.refresh();
      toast.success("billboard  deleted");
      router.push(`/stores/${params.storeId}/billboards`);
    } catch (error) {
      toast.error("something when wrong ");
      console.log("billboard delete", error);
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
              <TrashIcon className="h-4 w-4 mr-2 " /> Delete Billboard
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
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="billboard name"
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
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Backgroud Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        disabled={isLoading}
                        value={field.value ? [field.value] : []}
                        onChange={(url: string) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
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

export default BillboardsFrom;
