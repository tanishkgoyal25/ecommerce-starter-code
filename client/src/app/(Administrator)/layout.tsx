import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "../globals.css";

const GoogleSans = Google_Sans(
     {
          subsets: ["latin"],
     }
);

export const metadata: Metadata = {
     title: "Administrator",
     description: "E-Commerce Administrator",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
     return (
          <html lang="en" className={`${GoogleSans.className} h-full antialiased`}>
               <body className="min-h-full flex flex-col">
                    {children}
               </body>
          </html>
     );
}