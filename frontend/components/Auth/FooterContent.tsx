import { CardDescription, CardTitle } from "../ui/card";

import Link from "next/link";

interface CardFooterContentProps {
  formType: "signin" | "signup";
}

const CardFooterContent: React.FC<CardFooterContentProps> = ({ formType }) => {
  if (formType === "signup") {
    return (
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/api/auth/login" className="underline">
          Sign in
        </Link>
      </div>
    );
  }
  return (
    <div className="text-center text-sm">
      Don&apos;t have an account?{" "}
      <Link href="/api/auth/signup" className="underline">
        Sign up
      </Link>
    </div>
  );
};

export default CardFooterContent;
