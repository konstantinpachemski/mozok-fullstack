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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Login() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginForm = useForm<InferType<typeof loginFormSchema>>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = async (values: InferType<typeof loginFormSchema>) => {
    setPending(true);
    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Wrong username or password");
        }

        const data = await response.json();
        localStorage.setItem("authToken", data.access_token);
        router.push("/todo");
      } catch (error: any) {
        setError(error?.message);
      } finally {
        setPending(false);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username or email</FormLabel>
                        <FormControl>
                          <Input
                            type="username"
                            placeholder="username or you@example.com"
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full hover:scale-105 transition bg-green-600 hover:bg-green-500"
                >
                  {pending ? "Logging in..." : "Login"}
                </Button>
                {error && <p style={{ color: "red" }}>{error}</p>}
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
