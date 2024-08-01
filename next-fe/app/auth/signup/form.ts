import { object, string } from 'yup';

export const signUpFormSchema = object({
  email: string()
    .min(6, { message: 'Username must be at least 6 characters.' })
    .max(50, { message: 'Username must be at less then 50 characters.' })
    .required('Username is required.'),
  password: string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .max(30, { message: 'Password must be less then 30 characters.' })
    .required('Password is required.'),
});
