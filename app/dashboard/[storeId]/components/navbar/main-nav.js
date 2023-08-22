"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import UserNav from "./user-nav";

const MainNav = () => {
  const pathname = usePathname();
  const { storeId } = useParams();

  const routes = [
    {
      href: `/dashboard/${storeId}s`,
      label: "Overview",
      active: pathname === `/dashboard/${storeId}`,
    },
    {
      href: `/dashboard/${storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/dashboard/${storeId}/billboards`,
    },
    {
      href: `/dashboard/${storeId}/categories`,
      label: "Categories",
      active: pathname === `/dashboard/${storeId}/categories`,
    },
    {
      href: `/dashboard/${storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/dashboard/${storeId}/sizes`,
    },
    {
      href: `/dashboard/${storeId}/colors`,
      label: "Colors",
      active: pathname === `/dashboard/${storeId}/colors`,
    },
    {
      href: `/dashboard/${storeId}/variants`,
      label: "Variants",
      active: pathname === `/dashboard/${storeId}/variants`,
    },
    {
      href: `/dashboard/${storeId}/products`,
      label: "Products",
      active: pathname === `/dashboard/${storeId}/products`,
    },
    {
      href: `/dashboard/${storeId}/orders`,
      label: "Orders",
      active: pathname === `/dashboard/${storeId}/orders`,
    },
    {
      href: `/dashboard/${storeId}/settings`,
      label: "Settings",
      active: pathname === `/dashboard/${storeId}/settings`,
    },
  ];
  return (
    <div className="flex items-center gap-4">
      <ol className="flex items-center text-sm font-medium gap-4">
        {routes.map((rt) => {
          return (
            <li key={rt.href}>
              <Link
                href={rt.href}
                className={`transition-colors hover:text-black ${
                  rt.active ? "text-black" : "text-muted-foreground"
                }`}
              >
                {rt.label}
              </Link>
            </li>
          );
        })}
      </ol>
      <UserNav />
    </div>
  );
};

export default MainNav;
