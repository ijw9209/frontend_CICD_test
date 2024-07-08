"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ReactNode } from "react";

type Props = {
  session?: Session | null;
  children: ReactNode;
};

export default function AuthSessionProvider({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
