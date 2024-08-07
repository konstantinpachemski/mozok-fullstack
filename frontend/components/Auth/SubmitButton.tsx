"use client";

import { Button } from "../ui/button";

interface SubmitButtonProps {
  formType: "signin" | "signup";
  pending: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ formType, pending }) => {
  const submitButtonText = () =>
    (formType === "signup"
      ? pending
        ? "Signing up..."
        : "Create an account"
      : pending
      ? "Signing in..."
      : "Sign in") as string;

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full hover:scale-105 transition bg-green-600 hover:bg-green-500"
    >
      {submitButtonText()}
    </Button>
  );
};

export default SubmitButton;
