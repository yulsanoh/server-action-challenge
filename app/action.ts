"use server";

import { z } from "zod";

const emailRegex = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@zod.com/);
const passwordRegex = new RegExp(/^(?=.*?[0-9]).{10,}$/);

const formSchema = z.object({
  email: z.string().email().regex(emailRegex, "Only @zod.com emails are allowed."),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z.string().min(10, "Password should be at least 10 characters long.").regex(passwordRegex, "Password should contain at least one number (0123456789)."),
});

export const formSubmit = async (prevData: any, formData: FormData) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.flatten(),
    };
  } else {
    return {
      success: ["Welcome back"],
    };
  }
};
