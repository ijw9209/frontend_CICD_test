import NextAuth from "next-auth";
import axios from "axios";
// import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post("http://localhost:3001/login", {
            username: credentials.username,
            password: credentials.password,
          });

          console.log("[res]", res);

          if (res.data) {
            return res.data;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log("token", token);
      // if (account) {
      //   token.accessToken = account.access_token;
      //   token.email = profile.email;
      // }
      return token;
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 365,
  },
  secret: process.env.NEXTAUTH_SECRET || "TEST",
});
export { handler as GET, handler as POST };
