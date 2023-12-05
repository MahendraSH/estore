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

    const {
      name,
      price,
      images,
      categoriesId,
      sizesId,
      colorsId,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!categoriesId) {
      return new NextResponse("categoriesId is required", { status: 400 });
    }
    if (!sizesId) {
      return new NextResponse("sizesId is required", { status: 400 });
    }
    if (!colorsId) {
      return new NextResponse("colorsId is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse(" images is required", { status: 400 });
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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isArchived,
        isFeatured,
        categoriesId,
        colorsId,
        sizesId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[products_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { searchParams } = new URL(req.url);
    const categoriesId = searchParams.get("categoriesId") || undefined;
    const sizesId = searchParams.get("sizesId") || undefined;
    const colorsId = searchParams.get("colorsId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    if (!params.storeId) {
      return new NextResponse("storeId  is required ", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoriesId,
        sizesId,
        colorsId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        category: true,
        size: true,
        color: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log(" GET_products ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};
