"use client";

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

import { Button } from "@/components/ui/button";
import { InferType } from "yup";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginFormSchema } from "./form";
import { useForm } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Login() {
  const loginForm = useForm<InferType<typeof loginFormSchema>>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { pending } = useFormStatus();

  const login = async (values: InferType<typeof loginFormSchema>) => {
    //TODO: Implement login
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form action={() => login(loginForm.getValues())}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username or email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                        </div>

                        <FormControl>
                          <Input type="password" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {pending ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
