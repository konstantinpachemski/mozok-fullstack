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
import { signUpFormSchema } from "./form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignupForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpForm = useForm<InferType<typeof signUpFormSchema>>({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signup = async (values: InferType<typeof signUpFormSchema>) => {
    setPending(true);
    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:3001/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Signup failed");
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
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username or email</FormLabel>
                        <FormControl>
                          <Input
                            type="username"
                            placeholder="username or email"
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
                <Button type="submit" className="w-full">
                  {pending ? "Signing up..." : "Create an account"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline">
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
