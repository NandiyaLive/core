"use clinet";

import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

const VariantsForm = () => {
  const [variants, setVariants] = useState([{ variantIndex: 1, options: [{ optionIndex: 1 }] }]);

  const addVariant = (e) => {
    e.preventDefault();
    const len = variants.length + 1;
    setVariants((state) => [...state, { variantIndex: len, options: [{ optionIndex: 1 }] }]);
  };

  const addOption = (e) => {
    e.preventDefault();
    const id = e.target.id;

    const filteredVariant = variants[id];
    const options = filteredVariant.options;
    options.push({ optionIndex: options.len + 1 });

    setVariants((state) => [
      ...state.filter((variant) => variant.variantIndex != id),
      filteredVariant,
    ]);

    console.log(id, filteredVariant, variants);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Variants</CardTitle>
          <CardDescription>Add variants for this product</CardDescription>
        </div>
        <Button size="sm" onClick={addVariant}>
          <Plus className="mr-1 h-4" />
          Add Variant
        </Button>
      </CardHeader>
      <CardContent>
        {variants.map((variant, i) => (
          <div className="grid grid-cols-2 gap-8 mt-2 border rounded p-4" key={i}>
            <div className="space-y-2">
              <p className="text-sm">Name</p>
              <Input />
            </div>

            <div className="space-y-2">
              <p className="text-sm mb-1">Options</p>
              <div className="space-y-2">
                {variant.options.map((option, j) => (
                  <Input key={j} />
                ))}
              </div>
              <Button size="sm" onClick={addOption} id={i} className="mr-0 ml-auto w-fit">
                <Plus className="mr-1 h-4" />
                Add Option
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default VariantsForm;
