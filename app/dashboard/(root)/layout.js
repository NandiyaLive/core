import ProtectedPage from "@/components/protected-page";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SetupLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  const store = await prismadb.store.findFirst({
    where: {
      userId: session?.user.user_id,
    },
  });

  if (store) {
    redirect(`/dashboard/${store.id}`);
  }

  return <ProtectedPage>{children}</ProtectedPage>;
};

export default SetupLayout;
