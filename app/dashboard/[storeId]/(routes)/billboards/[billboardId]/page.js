import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/billboard-form";

// @ts-ignore
const BillboardPage = async ({ params }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <>
      <BillboardForm initialData={billboard} />
    </>
  );
};

export default BillboardPage;
