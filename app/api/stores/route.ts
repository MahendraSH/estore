import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse(" Anutherized   ", { status: 401 });
    }
    const { name } = await req.json();

    if (!name) {
      return new NextResponse(" name of store required   ", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE_POST", error);
    return new NextResponse(" internal server error  ", { status: 500 });
  }
};
