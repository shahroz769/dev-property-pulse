/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // NOTE: Use VERCEL_URL to dynamically set NEXTAUTH_URL for Vercel deployments,
        // falling back to localhost for local development.
        NEXTAUTH_URL: process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [
            350, 420, 500, 640, 768, 900, 1024, 1200, 1440, 1920, 2048, 3840,
        ],
    },
};

export default nextConfig;
