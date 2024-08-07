import { CardDescription, CardTitle } from "../ui/card";

interface CardHeaderContentProps {
  formType: "signin" | "signup";
}

const CardHeaderContent: React.FC<CardHeaderContentProps> = ({ formType }) => {
  if (formType === "signup") {
    return (
      <>
        <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Enter your information to create an account
        </CardDescription>
      </>
    );
  }
  return (
    <>
      <CardTitle className="text-2xl text-center">Sign in</CardTitle>
      <CardDescription className="text-center">
        Enter your email below to login to your account
      </CardDescription>{" "}
    </>
  );
};

export default CardHeaderContent;
