"use client";

import * as z from "zod";
import { Store } from "@prisma/client";
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
import { SettingsIcon, TrashIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import DeleteModel from "@/components/models/delete-model";
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

interface SettingFromProps {
  intialData: Store;
}

const SettingFrom: FC<SettingFromProps> = ({ intialData }) => {

  const params = useParams();
  const router = useRouter();
  const url= useOrigin();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: intialData.name,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/stores/${params.storeId}`, values);
      toast.success("store updated");
      router.refresh();
    } catch (error) {
      toast.error("something when wrong ");
      console.log("store update", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteConfrom = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      toast.success("store deleted");
      router.push("/stores");
    } catch (error) {
      toast.error("something when wrong ");
      console.log("store delete", error);
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
        <Heading
          title={"Settings"}
          description={"Manage store preferences "}
          icon={SettingsIcon}
        />

        <div className="  ">
          <Button
            variant={"destructive"}
            disabled={isLoading}
            onClick={() => setIsOpen(true)}
            className="bg-destructive"
          >
            <TrashIcon className="h-4 w-4 mr-2 " /> Delete Store
          </Button>
        </div>
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
                        placeholder="store"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="ml-auto">
              Save changes
            </Button>
          </form>
        </Form>
      </>

      <Separator />
      <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${url}/api/stores/${params.storeId}`} variant="public" />
    </>
  );
};

export default SettingFrom;
