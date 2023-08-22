"use client";

import * as z from "zod";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import VariantsForm from "./variants-form";

const formSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  isArchived: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

const ProductForm = ({ initialData, categories, colors, sizes }) => {
  const params = useParams();
  const router = useRouter();

  const productId = uuidv4();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData ? "Edit Product Preferences" : "Create a new Product";
  const toastSuccess = initialData ? "Product Updated!" : "Product Created!";
  const actions = initialData ? "Save Changes" : "Create Product";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          id: productId,
          name: "",
          images: [],
          price: null,
          categoryId: "",
          sizeId: "",
          colorId: "",
          isArchived: false,
          isFeatured: false,
        },
  });

  const onInvalid = (errors) => console.error(errors);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }

      router.refresh();
      router.push(`/dashboard/${params.storeId}/products`);
      toast.success(toastSuccess);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      toast.success("Product deleted!");
      router.refresh();
      router.push(`/dashboard/${params.storeId}/products`);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <div className="flex justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Product
          </Button>
        )}
      </div>

      <Separator className="my-2" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="3450.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem value={category.id} key={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a Size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem value={size.id} key={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a Color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem value={color.id} key={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div className="gap-4 space-y-2">
                      <Textarea
                        {...field}
                        placeholder="Create a description using Mardown (Try **Bold Text** or check the Markdown Guide)"
                      />

                      <div className="border rounded p-2 min-h-[5rem]">
                        <MarkdownPreview
                          source={
                            form.getValues("description")
                              ? form.getValues("description")
                              : "Preview"
                          }
                          rehypeRewrite={(node, index, parent) => {
                            if (
                              node.tagName === "a" &&
                              parent &&
                              /^h(1|2|3|4|5|6)/.test(parent.tagName)
                            ) {
                              parent.children = parent.children.slice(1);
                            }
                          }}
                          wrapperElement={{
                            "data-color-mode": "light",
                          }}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm flex items-center mr-0 ml-auto w-fit">
                    <a
                      href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Markdown Guide
                    </a>
                    <ExternalLink className="h-4" />
                  </p>
                </FormItem>
              )}
            /> */}
          </div>

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    disabled={loading}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <div className="leading-none space-y-1">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will be appered on the home page.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    disabled={loading}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <div className="leading-none space-y-1">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appere on anywhere in the store.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <VariantsForm productId={productId} />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) => {
                      field.onChange([...field.value, { url }]);
                    }}
                    onRemove={(url) =>
                      field.onChange([...field.value.filter((current) => current.url !== url)])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit">
            {actions}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
