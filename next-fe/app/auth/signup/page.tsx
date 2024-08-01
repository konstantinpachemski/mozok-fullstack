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
import { useFormStatus } from "react-dom";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignupForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUpForm = useForm<InferType<typeof signUpFormSchema>>({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signup = async (values: InferType<typeof signUpFormSchema>) => {
    //TODO: Implement signup
  };

  const { pending } = useFormStatus();

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
              {searchParams?.message && (
                <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
                  {searchParams.message}
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
