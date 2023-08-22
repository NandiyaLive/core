import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

const CategoryPage = async ({ params }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  return (
    <>
      <CategoryForm initialData={category} />
    </>
  );
};

export default CategoryPage;
