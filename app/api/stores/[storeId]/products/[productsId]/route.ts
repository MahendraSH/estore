import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string; productsId: string } }
) => {
  try {
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.productsId) {
      return new NextResponse("products id   is required ", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productsId,
        storeId: params.storeId,
      },
      include: {
        category: true,
        size: true,
        images: true,
        color: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(" GET_products ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; productsId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!params.storeId) {
      return new NextResponse("store Id  is required ", { status: 400 });
    }
    if (!params.productsId) {
      return new NextResponse("products id   is required ", { status: 400 });
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
    const product = await prismadb.product.delete({
      where: {
        id: params.productsId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(" DELETE_products ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; productsId: string } }
) => {
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

    await prismadb.product.update({
      where: {
        id: params.productsId,
      },
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
          deleteMany: {},
        },
      },
    });
    const product = await prismadb.product.update({
      where: {
        id: params.productsId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(" PATCH_products ", error);
    return new NextResponse(" Internal server error ", { status: 500 });
  }
};
