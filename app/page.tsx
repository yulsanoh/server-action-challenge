"use client";

import { useFormState } from "react-dom";
import { formSubmit } from "./action";
import FormButton from "@/components/form-button";
import Input from "@/components/form-input";

export default function Home() {
  const [state, action] = useFormState(formSubmit, null);
  return (
    <div className="flex mx-auto justify-center items-center w-full h-full max-w-screen-sm">
      <form className="flex flex-col w-full gap-3 *:outline-none" action={action}>
        <Input name="email" type="email" required placeholder="Email" errors={state?.error?.fieldErrors.email} />
        <Input name="username" type="text" required placeholder="Username" errors={state?.error?.fieldErrors.username} />
        <Input name="password" type="password" required placeholder="Password" errors={state?.error?.fieldErrors.password} />
        <FormButton />
        {state?.success ? <span className="w-full h-14 bg-green-400 flex justify-center items-center rounded-xl">{state?.success}</span> : null}
      </form>
    </div>
  );
}
