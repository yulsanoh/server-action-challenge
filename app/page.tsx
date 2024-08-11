import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center p-6">
      <div className="flex flex-col w-full items-center gap-3 *:text-lg *:rounded-full *:py-2.5 *:primary-btn">
        <Link href="/create-account">Sign up</Link>
        <Link href="/log-in">Sign in</Link>
      </div>
    </div>
  );
}
