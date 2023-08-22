import { getServerSession } from "next-auth";

import ProtectedPage from "@/components/protected-page";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import BackButon from "@/components/back-btn";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <ProtectedPage>
      <div className="container max-w-6xl mb-8 mt-10">
        <div className="flex justify-between">
          <Heading title="Profile" description="Change your profile settings" className="mt-4" />
          <BackButon />
        </div>

        <Separator />

        <div className="space-y-2">
          <p>Name : {session.user?.name}</p>
          <p>Email : {session.user?.email}</p>
          <p>
            User ID : <code>{session.user?.user_id}</code>
          </p>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default ProfilePage;
