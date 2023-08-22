import prismadb from "@/lib/prismadb";
import SizeForm from "./components/size-form";

// @ts-ignore
const SizePage = async ({ params }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <>
      <SizeForm initialData={size} />
    </>
  );
};

export default SizePage;
