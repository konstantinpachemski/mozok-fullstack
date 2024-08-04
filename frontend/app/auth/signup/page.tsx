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
import { signIn } from "next-auth/react";
import { signUpFormSchema } from "./form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignupForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpForm = useForm<InferType<typeof signUpFormSchema>>({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signup = async (values: InferType<typeof signUpFormSchema>) => {
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!res || !res.ok) {
        throw new Error("Signup failed");
      }

      router.push("/todo");
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signUpForm}>
            <form action={() => signup(signUpForm.getValues())}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={signUpForm.control}
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
                    control={signUpForm.control}
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
                  {pending ? "Signing up..." : "Create an account"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/api/auth/login" className="underline">
                  Sign in
                </Link>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
