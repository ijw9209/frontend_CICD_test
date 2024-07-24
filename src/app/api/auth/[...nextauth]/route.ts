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
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/login`,
            // 'http://localhost:8000/login',
            {
              id: credentials.username,
              password: credentials.password,
            }
          );

          if (res.data.data && res.data.data.admin) {
            // return { ...res.data, accessToken: res.data.token }; // accessToken을 포함하여 반환
            //백엔드 세팅 값에 따라 토큰 있는곳을 변경해줘야함, 지금 어드민과 연결되어있어서 어드민 토큰
            return {
              ...res.data.data.admin,
              accessToken: res.data.data.admin.loginToken,
            }; // accessToken을 포함하여 반환
          } else {
            console.log("Login failed:", res.data.error);
            return null;
          }
        } catch (error) {
          console.log("Error during authentication ", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 로그아웃 후 기본 리다이렉션 URL을 설정합니다.
      // baseUrl은 NEXTAUTH_URL 환경 변수를 사용합니다.

      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  // secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  secret: "knpixAxQvOHbh8vxdWD5b4ldP/4bJqFSbL9lqEOT2uQ=",
});
export { handler as GET, handler as POST };
