import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { DashboardIcon } from "@radix-ui/react-icons";
import { LayoutDashboardIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { FC } from "react";

interface StoreIdPageProps {
  params: { storeId: string };
}

const StoreIdPage: FC<StoreIdPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  if (!userId) {
    return redirect("/");
  }
  const store = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) {
    return redirect("/");
  }
  return (
    <div>
      <div className="flex flex-col">
        <div className=" flex-1 space-y-4 p-8 pt-6 ">
          <div className="flex justify-between items-center">
            <Heading
              title={"Dashbord"}
              description={" Dashbord for   " + store.name}
              icon={DashboardIcon}
            />
          </div>

          <Separator />
        </div>
      </div>
    </div>
  );
};

export default StoreIdPage;
