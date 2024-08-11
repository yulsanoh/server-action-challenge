"use client";

import { useFormStatus } from "react-dom";

interface IFormButton {
  btnName: string
}

export default function FormButton({ btnName }: IFormButton) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="bg-orange-500 disabled:bg-slate-400 text-white h-12 rounded-full hover:bg-orange-400 transition">
      {pending ? "로딩 중" : btnName}
    </button>
  );
}
