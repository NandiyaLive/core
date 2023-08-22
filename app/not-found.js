import BackButon from "@/components/back-btn";
import { Button } from "@/components/ui/button";
import { AlertOctagon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "404 Not Found",
};

const NotFound = () => {
  return (
    <section class="bg-white dark:bg-gray-900 ">
      <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div class="flex flex-col items-center max-w-sm mx-auto text-center">
          <p class="p-3 text-sm font-medium text-yellow-500 rounded-full bg-yellow-50 dark:bg-gray-800">
            <AlertOctagon className="h-6" />
          </p>
          <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            We Lost This Page
          </h1>
          <p class="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for doesn&apos;t exist. Here are some helpful links:
          </p>

          <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <BackButon />

            <Link href="/dashboard">
              <Button>Take me home</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
