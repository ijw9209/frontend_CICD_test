/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS_SSM_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_SSM_ACCESS_KEY,
    AWS_SSM_SECRET_KEY: process.env.NEXT_PUBLIC_AWS_SSM_SECRET_KEY,
    AWS_SSM_REGION: process.env.NEXT_PUBLIC_VOINOSIS_BASE_URL,
    // PARTNER_URL: process.env.NEXT_PUBLIC_PARTNER_URL,
  },
};

export default nextConfig;
