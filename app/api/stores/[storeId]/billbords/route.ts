import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface POSTProps {
  req: Request;
  params: { storeId: string };
}

export const POST = async ({ req, params }: POSTProps) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    const { label, imageUrl } = await req.json();
    if (!label) {
      return new NextResponse("label is required ", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("imageUrl is required ", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId  is required ", { status: 400 });
    }
    const store = await prismadb.store.findUnique({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!store) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const billbord = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billbord);
  } catch (error) {
    console.log(" POST_BILLBORD ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};

interface GETProps {
  req: Request;
  params: { storeId: string };
}

export const GET = async ({ req, params }: GETProps) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId  is required ", { status: 400 });
    }

    const billborda = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billborda);
  } catch (error) {
    console.log(" GET_BILLBORD ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};
