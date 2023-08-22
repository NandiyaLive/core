"use client";

import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProtectedPage = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { className } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session.data || session.status !== "authenticated") {
      router.push("/signin");
    } else {
      router.push(pathname);
      setLoading(false);
    }
  }, [session]);

  return loading ? <Loading /> : <div className={className}>{children}</div>;
};

export default ProtectedPage;
