import Footer from "@/components/footer";
import Navbar from "./_components/navbar";
import { auth } from "@clerk/nextjs";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  const isAuth = userId ? true : false;
  return (
    <>
      <Navbar isAuth={isAuth} />
      <main className=" w-full h-full   pt-16 bg-background">{children}</main>
      <Footer />
    </>
  );
}
