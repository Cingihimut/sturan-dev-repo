/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname: "flowbite.s3.amazonaws.com"
            }
        ]
    }
};

export default nextConfig;
