"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";

const formSchema = z.object({
  email: z.string().min(1).email("Please enter a valid Email."),
  password: z.string().min(1),
});

const Signin = () => {
  const router = useRouter();
  const session = useSession();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onInvalid = (errors) => console.error(errors);

  const onSubmit = async (data) => {
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
        setLoading(false);
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Logged in successfully!");
        setLoading(false);
        router.push("/dashboard");
      }
    });
  };

  return (
    <>
      <Logo />
      <section className="w-[28rem] border rounded p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input disabled={loading} type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={loading} type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
};

export default Signin;
