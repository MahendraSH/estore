import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface StoresPageProps {}

const StoresPage: FC<StoresPageProps> = async ({}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  if (!userId) {
    return redirect("/");
  }
  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });
  if (!store) {
    return redirect("/stores/create");
  }
  if (store) {
    return redirect(`/stores/${store.id}`);
  }
  return <div>Stores page</div>;
};

export default StoresPage;
