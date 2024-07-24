// types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }

  interface Session {
    accessToken?: string;
    sid?: string;
    provider: string;
    providerAccountId: string;
    email?: string;
    isSubscriber?: boolean;
    user?: {
      id: string;
      email?: string;
    };
  }
}
