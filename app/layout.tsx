import type { Metadata } from "next";
import { JetBrains_Mono, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/navbar";
import { Analytics } from "@vercel/analytics/next";

const lato = Lato({
    variable: "--font-lato",
    weight: ["100", "300", "400", "700", "900"],
});

const jetBrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ASDV Resources",
    description: "Companion Site for the Application Software Development Program at South Louisiana Community Collage",
    openGraph: {
        title: "ASDV Resources",
        description:
            "Companion Site for the Application Software Development Program at South Louisiana Community Collage",
        url: "https://asdv-resources.vercel.app",
        siteName: "ASDV Resources",
        images: [
            {
                url: "https://asdv-resources.vercel.app/image/asdv-resources-og.png",
                width: 1200,
                height: 630,
                alt: "ASDV Resources",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${lato.variable} ${jetBrainsMono.variable} h-screen antialiased`}>
            <body className="flex min-h-full flex-col">
                <Navbar />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
