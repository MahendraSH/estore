import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string; billboardsId: string } }
) => {
  try {
    
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.billboardsId) {
      return new NextResponse("billboards id   is required ", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardsId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log(" GET_Billboard ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; billboardsId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.billboardsId) {
      return new NextResponse("billboards id   is required ", { status: 400 });
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
    const billboard = await prismadb.billboard.delete({
      where: {
        id: params.billboardsId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log(" DELETE_Billboard ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; billboardsId: string } }
) => {
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
    if (!params.billboardsId) {
      return new NextResponse("billboards id   is required ", { status: 400 });
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

    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardsId,
        storeId: params.storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log(" PATCH_Billboard ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};
