import { createId } from "@paralleldrive/cuid2";
import ImageKit from "imagekit";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const { user } = await getServerSession(authOptions);
  const data = await req.formData();

  try {
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!data) {
      return new NextResponse("File is required", { status: 400 });
    }

    // const imagekit = new ImageKit({
    //   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    //   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    //   urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
    // });

    // const authenticationParameters = imagekit.getAuthenticationParameters();
    // console.log(authenticationParameters);

    // const uploadFiles = async (file) => {
    //   const bytes = await file.arrayBuffer();
    //   const buffer = Buffer.from(bytes);

    //   // const uploadedFile = imagekit.upload({
    //   //   file: buffer,
    //   // });

    //   fileList.push(file.name);
    // };

    // data.forEach((file) => {
    //   uploadFiles(file);
    // });

    const uploadedFiles = await data.forEach(async (file) => {
      const name = file.name;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // const uploadedFile = imagekit.upload({
      //   file: buffer,
      // });

      return { name };
    });

    const fileList = await Promise.all(uploadedFiles);

    console.log(fileList);

    return NextResponse.json(fileList);
  } catch (error) {
    console.log("[IMAGEKIT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
