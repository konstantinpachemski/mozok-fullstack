import { object, string } from "yup";

export const userFormSchema = object({
  email: string().email().required("Email is required."),
  password: string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(30, { message: "Password must be less then 30 characters." })
    .required("Password is required."),
});
