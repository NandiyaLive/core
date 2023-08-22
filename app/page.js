"use client";
import { getSession } from "next-auth/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";

const RootPage = () => {
  // const { data: session } = getSession();

  // if (session) {
  //   redirect("/dashbord");
  // } else {
  //   redirect("/signin");
  // }

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-6">
        <Logo />
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads Up!</AlertTitle>
          <AlertDescription>
            <p>Use below credentials to login to the test account.</p>
            <div className="flex mt-2">
              <div>
                <p>Email</p>
                <p>Password</p>
              </div>
              <div className="ml-1">
                <p>
                  :<code className="bg-red-100 ml-1 px-1">test@pettahjs.com</code>
                </p>
                <p>
                  :<code className="bg-red-100 ml-1 px-1">pettahjs</code>
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <Button onClick={() => router.push("/signin")}>
          <Lock className="mr-2 h-4 w-4" />
          Login
        </Button>
      </div>
    </div>
  );
};

export default RootPage;
