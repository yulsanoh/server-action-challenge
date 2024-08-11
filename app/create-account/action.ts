"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";

const emailRegex = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@zod.com/);
const passwordRegex = new RegExp(/^(?=.*?[0-9]).{10,}$/);

const formSchema = z.object({
  email: z.string().email().regex(emailRegex, "Only @zod.com emails are allowed."),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z.string().min(10, "Password should be at least 10 characters long.").regex(passwordRegex, "Password should contain at least one number (0123456789)."),
})
.superRefine(async ({ email }, ctx) => {
  const user = await db.user.findUnique({
    where: {
      email: email
    },
    select: {
      id: true
    }

  })

  if(user) {
    ctx.addIssue({
      code: "custom",
      message: "this email is already exists",
      fatal: true,
      path: ["email"]
    })

    return z.NEVER;
  }
})
.superRefine(async ({ username }, ctx) => {
  const user = await db.user.findUnique({
    where: {
      username: username
    },
    select: {
      id: true
    }

  })

  if(user) {
    ctx.addIssue({
      code: "custom",
      message: "this username is already exists",
      fatal: true,
      path: ["username"]
    })

    return z.NEVER;
  }
})
;

export const formSubmit = async (prevData: any, formData: FormData) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  
  if (!result.success) {
    return {
      error: result.error.flatten(),
    };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword
      }
    })

    const session = await getSession();
    session.id = user.id;

    session.save();    
    redirect("/log-in");
  }
};
