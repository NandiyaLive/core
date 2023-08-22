"use client";

import { Copy, Server } from "lucide-react";
import { toast } from "react-hot-toast";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const textMap = {
  public: "Public",
  admin: "Admin",
};

const variantMap = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert = ({ title, description, variant = "public" }) => {
  const onCopy = (description) => {
    navigator.clipboard.writeText(description);
    toast.success("API Route Copied to Clipboard.");
  };

  return (
    <Alert>
      <div className="flex items-center gap-2 text-sm">
        <Server className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </div>
      <AlertDescription className="ml-6 mt-4 flex gap-4">
        <code className="relative rounded bg-muted p-2 text-sm font-semibold w-full h-fit">
          {description}
        </code>
        <Button variant="outline" size="sm" onClick={() => onCopy(description)}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
