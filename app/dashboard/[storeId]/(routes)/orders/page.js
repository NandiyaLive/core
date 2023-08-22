import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((item) => item.product.name.join(", ")),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(item.createdAt, "MMMM d, yyyy"),
  }));

  return (
    <>
      <BillboardClient orders={formattedOrders} />
    </>
  );
};

export default OrdersPage;
