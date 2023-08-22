import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, password, masterPassword } = await req.json();

  if (!name || !email || !password || !masterPassword) {
    return new NextResponse("Missing Fields!", { status: 400 });
  }

  if (masterPassword !== atob(process.env.MASTER_PASSWORD)) {
    return new NextResponse("You don't have permission to create new users!", {
      status: 400,
    });
  }

  const exist = await prismadb.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return new NextResponse("Email already exists!", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prismadb.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
