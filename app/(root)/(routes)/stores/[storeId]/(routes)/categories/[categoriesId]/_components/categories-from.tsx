"use client";

import * as z from "zod";
import { Billboard, Category } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "label must be at least 2 characters.",
  }),
  billboardsId: z.string().min(1),
});

interface CategorysFromProps {
  intialData: Category | null;
  billboards: Billboard[];
}

const CategorysFrom: FC<CategorysFromProps> = ({ intialData, billboards }) => {
  const params = useParams();
  const router = useRouter();
  const url = useOrigin();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const title = intialData ? "Edit Category" : "Create Category";
  const description = intialData ? "Edit  a category" : "Add a new category";
  const Icon = intialData ? EditIcon : PlusSquare;
  const toastSuccessMessage = intialData
    ? "category updated"
    : "category created ";
  const actions = intialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billboardsId: intialData?.billboardsId || "",
      name: intialData?.name || "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (intialData) {
        await axios.patch(
          `/api/stores/${params.storeId}/categories/${params.categoriesId}`,
          values
        );
      } else {
        const res = await axios.post(
          `/api/stores/${params.storeId}/categories`,
          values
        );
      }
      router.push(`/stores/${params.storeId}/categories`);
      router.refresh();
      toast.success(toastSuccessMessage);
    } catch (error) {
      toast.error("something when wrong ");
      console.log("category update", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteConfrom = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/categories/${params.categoriesId}`
      );
      router.refresh();
      toast.success("category  deleted");
      router.push(`/stores/${params.storeId}/categories`);
      router.refresh();
    } catch (error) {
      toast.error("something when wrong ");
      console.log("category delete", error);
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
              <TrashIcon className="h-4 w-4 mr-2 " /> Delete Category
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
                        placeholder="category name"
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
                name="billboardsId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a billboard</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a billboard"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {billboards.map((billboard) => (
                          <SelectItem
                            key={billboard.id}
                            value={billboard.id}
                            className="   "
                          >
                            <div className=" flex   justify-start items-center w-full">
                              <Image
                                src={billboard.imageUrl}
                                width={30}
                                height={30}
                                alt="billboard"
                                className="w-5 h-5 rounded-md mr-2 block  "
                              />
                              {billboard.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

export default CategorysFrom;
