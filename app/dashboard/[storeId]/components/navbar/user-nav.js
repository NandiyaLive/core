"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserNav = () => {
  const { data } = useSession();
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="bg-gradient-to-tr from-red-500 to-green-500 h-8 w-8 rounded-full" />
          {/* <UserCircle2 className="h-8 w-8" /> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-normal pr-8">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{data?.user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{data?.user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserNav;
