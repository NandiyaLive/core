import { cn } from "@/lib/utils";

import MainNav from "./main-nav";
import Link from "next/link";
import Logo from "@/components/logo";

const Navbar = async () => {
  return (
    <nav className="py-2 border-b mb-4">
      <div className={cn("container max-w-6xl flex items-center justify-between")}>
        <div className={cn("flex items-center gap-8")}>
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <MainNav />
      </div>
    </nav>
  );
};

export default Navbar;
