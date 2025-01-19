/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables strict mode for highlighting potential issues
  images: {
    domains: ["www.anveshan.farm", "twobrothersindiashop.com"], // Allow external domains for images
  },
};

export default nextConfig;
