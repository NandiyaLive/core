import prismadb from "@/lib/prismadb";
import ColorClient from "./components/client";
import { format } from "date-fns";

const ColorPage = async ({ params }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM d, yyyy"),
  }));

  return (
    <>
      <ColorClient colors={formattedColors} />
    </>
  );
};

export default ColorPage;
