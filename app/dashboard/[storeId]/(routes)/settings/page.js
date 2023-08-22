import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProtectedPage from "@/components/protected-page";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";

const SettingsPage = async ({ params }) => {
  const { user } = await getServerSession(authOptions);

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: user.user_id,
    },
  });

  if (!store) {
    redirect("/dashboard");
  }

  return (
    <ProtectedPage>
      <div className="">
        <SettingsForm initialData={store} />
      </div>
    </ProtectedPage>
  );
};

export default SettingsPage;
