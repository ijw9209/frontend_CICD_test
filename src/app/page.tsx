"use client";
import { useSession, signIn, signOut } from "next-auth/react";

import { PAGE_URL_ENUM } from "@/common";

import Link from "next/link";
import { Fragment, useEffect } from "react";
export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Welcome to the JWT Auth Example</h1>
      {session ? (
        <Fragment>
          {/* <Link href="/protected">Go to Protected Page</Link> */}
          <Link href={PAGE_URL_ENUM.SENIORLIFE_LIST}>SeniorLife</Link>
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            로그아웃
          </button>
        </Fragment>
      ) : (
        <Link href={PAGE_URL_ENUM.LOGIN}>Login</Link>
      )}
    </div>
  );
}
