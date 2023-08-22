import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  const { user } = await getServerSession(authOptions);

  try {
    const { name, value } = await req.json();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
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

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
