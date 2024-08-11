"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const emailRegex = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@zod.com/);
const passwordRegex = new RegExp(/^(?=.*?[0-9]).{10,}$/);

const formSchema = z.object({
  email: z.string().email().regex(emailRegex, "Only @zod.com emails are allowed."),
  password: z.string().min(10, "Password should be at least 10 characters long.").regex(passwordRegex, "Password should contain at least one number (0123456789)."),
}).superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true
        }
    })

    if(!user) {
        ctx.addIssue({
            code: "custom",
            message: "this email is not exists",
            fatal: true,
            path: ["email"]
        })

        return z.NEVER;
    }
});

export const formSubmit = async (prevData: any, formData: FormData) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      error: result.error.flatten(),
    };
  } else {
    const user = await db.user.findUnique({
        where: {
            email: result.data.email
        },
        select: {
            id: true,
            password: true
        }
    })
    
    const isPasswordCorrect = await bcrypt.compare(result.data.password, user?.password ?? "xxx");

    if(isPasswordCorrect) {
      const session = await getSession();
      session.id = user!.id

      session.save()
      redirect("/profile")
    } else {
      return {
        fieldErrors: {
          password: ["Wrong Password."],
          email: []
        }
      }
    }
    
  }
};
