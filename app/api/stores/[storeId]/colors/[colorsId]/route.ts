import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string; colorsId: string } }
) => {
  try {
    
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.colorsId) {
      return new NextResponse("colors id   is required ", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorsId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log(" GET_colors ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; colorsId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.colorsId) {
      return new NextResponse("colors id   is required ", { status: 400 });
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
    const color = await prismadb.color.delete({
      where: {
        id: params.colorsId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log(" DELETE_colors ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; colorsId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    const { name, value } = await req.json();
    if (!name) {
      return new NextResponse("name is required ", { status: 400 });
    }
    if (!value) {
      return new NextResponse("value is required ", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.colorsId) {
      return new NextResponse("colors id   is required ", { status: 400 });
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

    const color = await prismadb.color.update({
      where: {
        id: params.colorsId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log(" PATCH_colors ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};
