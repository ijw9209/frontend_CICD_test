"use client";
import { useSession, signIn, signOut } from "next-auth/react";

import Link from "next/link";
import { useEffect } from "react";
export default function Home() {
  const { data: session } = useSession();

  console.log("session", session);

  useEffect(() => {}, []);

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
