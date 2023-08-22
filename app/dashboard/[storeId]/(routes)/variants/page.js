import prismadb from "@/lib/prismadb";
import VariantClient from "./components/client";
import { format } from "date-fns";

const VariantPage = async ({ params }) => {
  // const variants = await prismadb.variant.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  // const formattedVariant = variants.map((item) => ({
  //   id: item.id,
  //   name: item.name,
  //   value: item.value,
  //   createdAt: format(item.createdAt, "MMMM d, yyyy"),
  // }));

  return (
    <>
      {/* <VariantClient variants={formattedVariant} /> */}
      <p>Variant Page</p>
    </>
  );
};

export default VariantPage;
