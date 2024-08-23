import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "bücher",
    description: "open-source physical library manager",
};

export default function RootLayout({
        children,
    }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <body className={`${inter.className} grid overflow-hidden h-screen`}
              style={{gridTemplateRows: "auto 1fr"}}>

        <header className="border-emerald-950 border-b-4 bg-emerald-700 py-2 px-4 flex flex-row justify-between items-center">
            <a href="/" className="text-4xl font-bold block">bücher</a>
            {/* put user thing here later */}
        </header>

        <main className="bg-emerald-100 grid max-h-full overflow-hidden"
              style={{gridTemplateColumns: 'auto 1fr'}}>

            <Sidebar/>

            {children}

        </main>

        </body>
        </html>
    );
}
