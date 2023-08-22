import prismadb from "@/lib/prismadb";
import VariantForm from "./components/variant-form";

// @ts-ignore
const VariantPage = async ({ params }) => {
  const variant = await prismadb.variant.findUnique({
    where: {
      id: params.variantId,
    },
  });

  return (
    <>
      <VariantForm initialData={variant} />
    </>
  );
};

export default VariantPage;
