import { Coins, CreditCard, Package } from "lucide-react";
import { getServerSession } from "next-auth";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import Overview from "@/components/overview";
import prismadb from "@/lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StoreSwitcher from "../components/store-switcher";

const DashboardPage = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);

  const session = await getServerSession(authOptions);

  const stores = await prismadb.store.findMany({
    where: {
      userId: session.user?.user_id,
    },
  });

  return (
    <div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <Heading title="Dashboard" description="Overview of Your Store" />
          <StoreSwitcher items={stores} />
        </div>

        <Separator />

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Revenue</CardTitle>
              <Coins className="h-6" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatter.format(totalRevenue)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sales</CardTitle>
              <CreditCard className="h-6" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">+{salesCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Products in Stock</CardTitle>
              <Package className="h-6" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stockCount}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview data={stockCount} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
