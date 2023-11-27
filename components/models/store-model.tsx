"use client";

import { FC, useState } from "react";
import Model from "../ui/model";
import UseStoreModel from "@/hooks/use-store-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";

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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface StoreModelProps {}
const title = "Create store ";
const description = "Add a new store to mannage products ... ";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

const StoreModel: FC<StoreModelProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/api/stores`, values);
      toast.success("store created  ");
      window.location.assign(`/stores/${res.data.id}`);
    } catch (error) {
      toast.error("Something when wrong ");
    } finally {
      setIsLoading(false);
    }
  };
  const storeModel = UseStoreModel();
  return (
    <Model
      isOpen={storeModel.isOpen}
      onClose={storeModel.onClose}
      description={description}
      title={title}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="book store..  "
                    {...field}
                    autoFocus
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="   flex items-center justify-end  pt-4  space-x-3 ">
            <Button type="submit" disabled={isLoading}>
              Continue
            </Button>
            <Button
              variant={"outline"}
              disabled={isLoading}
              onClick={storeModel.onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Model>
  );
};

export default StoreModel;
