import prismadb from "@/lib/prismadb";
import SizesClient from "./components/client";
import { format } from "date-fns";

const SizesPage = async ({ params }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM d, yyyy"),
  }));

  return (
    <>
      <SizesClient sizes={formattedSizes} />
    </>
  );
};

export default SizesPage;
