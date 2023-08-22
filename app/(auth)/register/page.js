"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
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
import Logo from "@/components/logo";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email("Please enter a valid Email."),
  password: z.string().min(1),
  masterPassword: z.string().min(1),
});

const Register = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      masterPassword: "",
    },
  });

  const onInvalid = (errors) => console.error(errors);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("/api/auth/register", data);

      toast.success("User has been registered!");
      setTimeout(() => {
        router.push("/signin");
      }, 5000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="masterPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Master Password</FormLabel>
                    <FormControl>
                      <Input disabled={loading} type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={loading} type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
};

export default Register;
