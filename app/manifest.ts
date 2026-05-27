import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "ASDV Resources",
        short_name: "ASDV Resources",
        description:
            "Companion Site for the Application Software Development Program at South Louisiana Community Collage",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#163C74",
        icons: [
            {
                src: "/images/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/images/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
