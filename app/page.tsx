"use client";

import { useFormState } from "react-dom";
import { formSubmit } from "./action";
import FormButton from "@/components/form-button";

export default function Home() {
  const [state, action] = useFormState(formSubmit, null);
  return (
    <div className="flex mx-auto justify-center items-center w-full h-full max-w-screen-sm">
      <form className="flex flex-col w-full gap-3 *:outline-none" action={action}>
        <input
          name="email"
          className="focus:invalid:ring-red-500 invalid:ring-red-500 transition focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 focus:border-[#6b7280] rounded-full"
          type="email"
          required
          placeholder="Email"
        />
        <input
          name="username"
          className="focus:invalid:ring-red-500 invalid:ring-red-500 transition focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 focus:border-[#6b7280] rounded-full"
          type="text"
          required
          placeholder="Username"
        />
        <input
          name="password"
          className="transition focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 focus:invalid:ring-red-500 invalid:ring-red-500 focus:border-[#6b7280] rounded-full"
          type="password"
          required
          placeholder="Password"
        />
        {state?.errors ? <span className="text-red-500 font-medium">{state?.errors}</span> : null}
        <FormButton />
        {state?.success ? <span className="w-full h-14 bg-green-400 flex justify-center items-center rounded-xl">{state?.success}</span> : null}
      </form>
    </div>
  );
}
