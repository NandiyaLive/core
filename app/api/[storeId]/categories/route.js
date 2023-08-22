import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  const { user } = await getServerSession(authOptions);

  try {
    const { name, description, slug, bannerText, bannerImage } = await req.json();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const slugExists = await prismadb.category.findUnique({
      where: {
        slug,
      },
    });

    if (slugExists) {
      return new NextResponse("Slug already exists!", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: user.user_id,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthoeized", { status: 400 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        description,
        slug,
        bannerText,
        bannerImage,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
