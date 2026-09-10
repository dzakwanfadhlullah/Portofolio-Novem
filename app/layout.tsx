import type { Metadata } from "next";
import { SocialShell } from "@/components/SocialShell";
import "./globals.css";
export const metadata: Metadata={title:"Ira Desai — SocialFolio",description:"Design, software, stories, articles, and work by Ira Desai."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><SocialShell>{children}</SocialShell></body></html>}
