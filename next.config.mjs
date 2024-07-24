// @ts-check
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  // dir: './src',     // 루트 디렉토리 설정
  // outDir: './build' // 빌드 디렉토리 설정
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
