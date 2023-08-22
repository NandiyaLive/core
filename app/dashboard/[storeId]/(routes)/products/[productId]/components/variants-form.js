"use clinet";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

const VariantsForm = ({ productId }) => {
  const router = useRouter();
  const params = useParams();

  const addVariant = (e) => {
    e.preventDefault();
    router.push(`/dashboard/${params.storeId}/variants/new?productId=${productId}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Variants</CardTitle>
          <CardDescription>Manage variants for this product</CardDescription>
        </div>
        <Button size="sm" onClick={addVariant}>
          <Plus className="mr-1 h-4" />
          Add Variant
        </Button>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default VariantsForm;
