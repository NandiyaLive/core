import prismadb from "@/lib/prismadb";
import CategoryClient from "./components/client";
import { format } from "date-fns";

const CategoriesPage = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    createdAt: format(item.createdAt, "MMMM d, yyyy"),
  }));

  return (
    <>
      <CategoryClient categories={formattedCategories} />
    </>
  );
};

export default CategoriesPage;
