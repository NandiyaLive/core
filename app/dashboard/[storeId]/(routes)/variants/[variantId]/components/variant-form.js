"use client";

import * as z from "zod";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";

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

const formSchema = z.object({
  productId: z.string().uuid(),
  name: z.string().min(1),
  value: z.string().min(1),
});

const VariantForm = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log(searchParams);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optionsCount, setOptionsCount] = useState(1);

  const title = initialData ? "Edit Variant" : "Create Variant";
  const description = initialData ? "Edit Variant Preferences" : "Create a new Variant";
  const toastSuccess = initialData ? "Variant Updated!" : "Variant Created!";
  const actions = initialData ? "Save Changes" : "Create Variant";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      productId: searchParams.get("productId"),
      name: "",
      value: "",
    },
  });

  const onInvalid = (errors) => console.error(errors);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/variants/${params.variantId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/variants`, data);
      }

      router.refresh();
      router.push(`/dashboard/${params.storeId}/variants`);
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
      await axios.delete(`/api/${params.storeId}/variants/${params.variantId}`);
      toast.success("Variant deleted!");
      router.refresh();
      router.push(`/dashboard/${params.storeId}/variants`);
    } catch (error) {
      toast.error("Make sure you've removed all products use this variant");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const addOption = (e) => {
    e.preventDefault();

    setOptionsCount(optionsCount + 1);
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
            Delete Variant
          </Button>
        )}
      </div>

      <Separator className="my-2" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-4 w-full">
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product ID</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Variant Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <div className="flex gap-4 justify-between">
              <h2 className="text-2xl font-semibold">Options</h2>
              <Button onClick={addOption} size="sm">
                Add Option
              </Button>
            </div>

            {/* <div className="gird grid-cols-2 gap-8">
              <div className="w-full">
                <p className="text-sm font-medium">Name</p>
              </div>
              <div className="w-full">
                <p className="text-sm font-medium">Value</p>
              </div>
            </div> */}

            {Array.from(Array(optionsCount)).map((_, i) => (
              <div className="grid grid-cols-2 gap-8" key={i}>
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input disabled={loading} placeholder="Option Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input disabled={loading} placeholder="Option Value" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <Button disabled={loading} type="submit">
            {actions}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default VariantForm;
