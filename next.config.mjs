/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'figma-alpha-api.s3.us-west-2.amazonaws.com'
            },
            {
                protocol: 'https',
                hostname: 's3-alpha.figma.com'
            },
            {
                protocol: 'https',
                hostname: 's3-alpha-sig.figma.com'
            }
        ]
    }
};

export default nextConfig;
