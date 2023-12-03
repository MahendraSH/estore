import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, billboardsId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    if (!billboardsId) {
      return new NextResponse(" billboardsId URL is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const category = await prismadb.category.create({
       data: {
        name,
        billboardsId,
        storeId: params.storeId
       }
    })

    return NextResponse.json(category);
  } catch (error) {
    console.log("[category_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    
    if (!params.storeId) {
      return new NextResponse("storeId  is required ", { status: 400 });
    }

    const category = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(" GET_category ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};
