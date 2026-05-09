import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                // Y. Daniel Liang is the author of the primary Java book used in the ASDV program.
                hostname: "yongdanielliang.github.io",
            },
        ],
    },
};

export default nextConfig;
