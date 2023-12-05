"use client";

import * as z from "zod";
import { Category, Product, Size, Color, Image as IMage } from "@prisma/client";
import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoriesId: z.string().min(1),
  colorsId: z.string().min(1),
  sizesId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

interface ProductsFromProps {
  intialData:
    | (Product & {
        images: IMage[];
      })
    | null;

  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const ProductsFrom: FC<ProductsFromProps> = ({
  intialData,
  categories,
  sizes,
  colors,
}) => {
  const params = useParams();
  const router = useRouter();
  const url = useOrigin();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const title = intialData ? "Edit Product" : "Create Product";
  const description = intialData ? "Edit  a product" : "Add a new product";
  const Icon = intialData ? EditIcon : PlusSquare;
  const toastSuccessMessage = intialData
    ? "product updated"
    : "product created ";
  const actions = intialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: intialData?.name || "",
      price: intialData?.price || 0,
      categoriesId: intialData?.categoriesId || "",
      sizesId: intialData?.sizesId || "",
      colorsId: intialData?.colorsId || "",
      isArchived: intialData?.isArchived || false,
      isFeatured: intialData?.isFeatured || false,
      images: intialData?.images || [],
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (intialData) {
        await axios.patch(
          `/api/stores/${params.storeId}/products/${params.productsId}`,
          values
        );
      } else {
        const res = await axios.post(
          `/api/stores/${params.storeId}/products`,
          values
        );
      }
      router.push(`/stores/${params.storeId}/products`);
      router.refresh();
      toast.success(toastSuccessMessage);
    } catch (error) {
      toast.error("something when wrong ");
      console.log("product update", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteConfrom = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/products/${params.productsId}`
      );
      toast.success("product  deleted");
      router.push(`/stores/${params.storeId}/products`);
      router.refresh();
    } catch (error) {
      toast.error("something when wrong ");
      console.log("product delete", error);
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
              <TrashIcon className="h-4 w-4 mr-2 " /> Delete Product
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
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Prouct Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={isLoading}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8   ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="product name"
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="product name"
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
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        className="  w-4 h-4   "
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className=" ">Archived</FormLabel>
                      <FormDescription>
                        {" "}
                        This product will not appear anywhere in the store{" "}
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        className="  w-4 h-4  "
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel> Featured</FormLabel>
                      <FormDescription>
                        {" "}
                        This will appear on home page{" "}
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoriesId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
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
                            placeholder="Select a size"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizesId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
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
                            placeholder="Select a size"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.value} ({size.name})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorsId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.name}
                            placeholder="Select a color"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            <div className="flex  gap-x-4 ">
                              <div
                                className=" w-8 h-8 rounded-full  ml-auto"
                                style={{ backgroundColor: color.value }}
                              />
                              {color.name}{" "}
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

export default ProductsFrom;
