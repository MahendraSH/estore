import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";
import SettingFrom from "./_components/setting-from";
interface SettingPageProps {
  params: {
    storeId: string;
  };
}

const SettingPage: FC<SettingPageProps> = async ({ params }) => {
  const { userId } = auth();
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
    return redirect("/stores");
  }
  return (
    <div className="flex flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6 ">
        <SettingFrom intialData={store} />
      </div>
    </div>
  );
};

export default SettingPage;
