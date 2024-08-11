"use client";

import { useFormState } from "react-dom";
import { formSubmit } from "./action";
import FormButton from "@/components/form-button";
import Input from "@/components/form-input";

export default function LogIn() {
  const [state, action] = useFormState(formSubmit, null);
  return (
    <div className="flex mx-auto justify-center items-center w-full h-full max-w-screen-sm">
      <form className="flex flex-col w-full gap-3 *:outline-none" action={action}>
        <Input name="email" type="email" required placeholder="Email" errors={state?.error?.fieldErrors.email} />
        <Input name="password" type="password" required placeholder="Password" errors={state?.error?.fieldErrors.password} />
        <FormButton btnName="Sign In" />
      </form>
    </div>
  );
}
