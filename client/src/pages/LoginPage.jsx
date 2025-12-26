import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { cn } from "@lib/utils";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAPI } from "@/apis/auth";
const LoginPage = () => {
  const queryClient = useQueryClient();
  const loginSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync, error, isError } = useMutation({
    mutationFn: async (values) => {
      await loginAPI(values);
    },
    onSuccess: (data) => {
      toast.success("Login successfully");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  const onSubmit = async (values) => {
    await mutateAsync(values);
  };
  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Login to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isPending}
                    className={"w-full"}
                  >
                    <img
                      src={"/github.svg"}
                      alt="Github.logo"
                      className="w-5 h-5 object-cover"
                    />
                    Continue with GitHub
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isPending}
                    className={"w-full"}
                  >
                    <img
                      src={"/google.svg"}
                      alt="Google.logo"
                      className="w-5 h-5 object-cover"
                    />
                    Continue with Google
                  </Button>
                </div>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type={"email"}
                              placeholder="example@mail.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type={"password"}
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {isError && (
                    <div className="text-center text-sm">
                      {error?.response?.data?.message || "Login failed"}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className={"w-full"}
                    disabled={isPending}
                  >
                    Login
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don't have an account?
                  <Link to={"/register"} className="underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
