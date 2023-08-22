import prismadb from "@/lib/prismadb";
import ColorForm from "./components/color-form";

// @ts-ignore
const ColorPage = async ({ params }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <>
      <ColorForm initialData={color} />
    </>
  );
};

export default ColorPage;
