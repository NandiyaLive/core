"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const BackButon = (className) => {
  const router = useRouter();
  return (
    <Button variant="outline" onClick={() => router.back()} className={cn(className)}>
      <ArrowLeft className="mr-2 h-4" /> Go Back
    </Button>
  );
};

export default BackButon;
