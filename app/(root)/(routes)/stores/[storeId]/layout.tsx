import Footer from "@/components/footer";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import NavbarStore from "../../../../../components/navbar-store";

const StoreIdRoutesPageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;

  params: { storeId: string };
}) => {
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
    return redirect("/stores/create");
  }

  return (
    <>
      <NavbarStore />
      <main className=" w-full   pt-16 mt-2  bg-background  min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default StoreIdRoutesPageLayout;
