import { Inter } from "next/font/google";
import "./globals.css"
import Navbar from "../components/NavBar";
import Warning from "@/components/NavBar/Warning";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sturan | Equity CrowdFunding",
  description: "We help everyone to own a global company in the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Warning/>
        {children}
      </body>
    </html>
  );
}
