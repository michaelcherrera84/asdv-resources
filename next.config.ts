import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                // Y. Daniel Liang is the author of the primary Java book used in the ASDV program.
                hostname: "yongdanielliang.github.io",
            },
            {
                hostname: "res.cloudinary.com",
            },
            {
                hostname: "www.pearson.com",
            },
            {
                hostname: "www.murach.com",
            },
            {
                hostname: "books.google.com",
            },
            {
                hostname: "content.packt.com",
            },
            {
                hostname: "www.informit.com",
            },
        ],
    },
};

export default nextConfig;
