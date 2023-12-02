import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface GETProps {
  req: Request;
  params: { storeId: string; billbordsId: string };
}

export const GET = async ({ req, params }: GETProps) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.billbordsId) {
      return new NextResponse("billbords id   is required ", { status: 400 });
    }

    const billbord = await prismadb.billboard.findUnique({
      where: {
        id: params.billbordsId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billbord);
  } catch (error) {
    console.log(" GET_BILLBORD ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};
interface DELETEProps {
  req: Request;
  params: { storeId: string; billbordsId: string };
}

export const DELETE = async ({ req, params }: DELETEProps) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.billbordsId) {
      return new NextResponse("billbords id   is required ", { status: 400 });
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
    const billbord = await prismadb.billboard.delete({
      where: {
        id: params.billbordsId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billbord);
  } catch (error) {
    console.log(" DELETE_BILLBORD ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};

interface PATCHProps {
  req: Request;
  params: { storeId: string; billbordsId: string };
}

export const PATCH = async ({ req, params }: PATCHProps) => {
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
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.billbordsId) {
      return new NextResponse("billbords id   is required ", { status: 400 });
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

    const billbord = await prismadb.billboard.update({
      where: {
        id: params.billbordsId,
        storeId: params.storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    return NextResponse.json(billbord);
  } catch (error) {
    console.log(" PATCH_BILLBORD ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};
