import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

import ProtectedPage from "@/components/protected-page";
import prismadb from "@/lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Navbar from "./components/navbar/navbar";

const DashboardLayout = async ({ children, params }) => {
  const session = await getServerSession(authOptions);

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: session?.user.user_id,
    },
  });

  if (!store) {
    redirect("/dashboard");
  }

  return (
    <ProtectedPage>
      <Navbar />
      <div className="container max-w-6xl mb-8">{children}</div>
    </ProtectedPage>
  );
};

export default DashboardLayout;
