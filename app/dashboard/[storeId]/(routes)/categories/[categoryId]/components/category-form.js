"use client";

import * as z from "zod";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/alert-modal";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink } from "lucide-react";
import { Dropzone } from "@/components/ui/dropzone";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(20),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slugs can only have lowercase letters, numbers, and hyphens.",
    }),
  bannerText: z.string().optional(),
  bannerImage: z.string().optional(),
});

const CategoryForm = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit Category Preferences" : "Create a new Category";
  const toastSuccess = initialData ? "Category Updated!" : "Category Created!";
  const actions = initialData ? "Save Changes" : "Create Category";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      slug: "",
      bannerText: "",
      bannerImage: "",
    },
  });

  const onInvalid = (errors) => console.error(errors);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }

      router.refresh();
      router.push(`/dashboard/${params.storeId}/categories`);
      toast.success(toastSuccess);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
      toast.success("Category deleted!");
      router.refresh();
      router.push(`/dashboard/${params.storeId}/categories`);
    } catch (error) {
      toast.error("Make sure you've removed all products use this category");
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
            Delete Category
          </Button>
        )}
      </div>

      <Separator className="my-2" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-4 w-full">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Category Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="A short description about this category..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h2 className="text-2xl font-semibold">Banner (Optional)</h2>

          <FormField
            control={form.control}
            name="bannerText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Text</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Banner Text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bannerImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Image</FormLabel>
                <FormControl>
                  {/* <Dropzone maxFiles={1} maxSize={1} /> */}
                  <Input disabled={loading} placeholder="https://" {...field} />
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

export default CategoryForm;
