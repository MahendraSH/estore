import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string; categoriesId: string } }
) => {
  try {
    
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.categoriesId) {
      return new NextResponse("categories id   is required ", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoriesId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(" GET_category_id ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; categoriesId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.categoriesId) {
      return new NextResponse("categories id   is required ", { status: 400 });
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
    const category = await prismadb.category.delete({
      where: {
        id: params.categoriesId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(" DELETE_category ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; categoriesId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    const { name, billboardsId } = await req.json();
    if (!name) {
      return new NextResponse("name is required ", { status: 400 });
    }
    if (!billboardsId) {
      return new NextResponse("billboards Id is required ", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.categoriesId) {
      return new NextResponse("categories id   is required ", { status: 400 });
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

    const category = await prismadb.category.update({
      where: {
        id: params.categoriesId,
        storeId: params.storeId,
      },
      data: {
        name,
        billboardsId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(" PATCH_categories ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};
