"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { AxiosError } from "axios";
import CardFooterContent from "./FooterContent";
import CardHeaderContent from "./HeaderContent";
import { InferType } from "yup";
import { Input } from "@/components/ui/input";
import SubmitButton from "./SubmitButton";
import api from "@/app/api/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { userFormSchema } from "./formSchema";
import { yupResolver } from "@hookform/resolvers/yup";

interface AuthFormProps {
  formType: "signin" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ formType }) => {
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  const userForm = useForm<InferType<typeof userFormSchema>>({
    resolver: yupResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: InferType<typeof userFormSchema>) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); //Simulate network delay

      if (formType === "signup") {
        await api("/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(values),
        }).catch((error: AxiosError) => {
          if (error.response) {
            if (error.response?.status === 401) {
              throw new Error("Wrong email or password");
            } else if (error.response?.status === 409) {
              throw new Error("User already exists");
            } else {
              throw new Error("Something went wrong");
            }
          }
        });
      }

      const responseSignin = await signIn("credentials", {
        username: values.email,
        password: values.password,
        redirect: false,
      });

      if (!responseSignin?.ok) {
        if (responseSignin?.status === 401) {
          throw new Error("Wrong email or password");
        } else {
          throw new Error("Something went wrong");
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  }

  useEffect(() => {
    if (status === "loading") return;
    if (session) {
      router.push("/todo");
    }
  }, [session, status, router]);

  if (status === "loading") return;
  if (!session)
    return (
      <div className="flex flex-grow items-center justify-center">
        <Card className="min-w-96">
          <CardHeader>
            <CardHeaderContent formType={formType} />
          </CardHeader>
          <CardContent>
            <Form {...userForm}>
              <form onSubmit={userForm.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={userForm.control}
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
                      control={userForm.control}
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

                  <div>
                    <SubmitButton
                      formType={formType}
                      pending={userForm.formState.isSubmitting}
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-500 text-center">
                        {error}
                      </p>
                    )}
                  </div>
                  <CardFooterContent formType={formType} />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
};

export default AuthForm;
