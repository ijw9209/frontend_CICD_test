"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Welcome to the JWT Auth Example</h1>
      {session ? (
        <Link href="/protected">Go to Protected Page</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
