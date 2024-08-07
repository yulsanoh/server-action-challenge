import { InputHTMLAttributes } from "react";

interface IInput {
  errors?: string[];
  name: string;
}

export default function Input({ errors = [], name, ...rest }: IInput & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input name={name} className="focus:invalid:ring-red-500 invalid:ring-red-500 transition focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 focus:border-[#6b7280] rounded-full" {...rest} />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </>
  );
}
