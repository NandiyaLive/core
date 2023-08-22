import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { format } from "date-fns";

const BillboardsPage = async ({ params }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM d, yyyy"),
  }));

  return (
    <>
      <BillboardClient billboards={formattedBillboards} />
    </>
  );
};

export default BillboardsPage;
