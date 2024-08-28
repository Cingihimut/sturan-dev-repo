import { Inter } from "next/font/google";
import "./globals.css"
import Navbar from "../components/NavBar";
import Footer from "@/components/Footer";
import { cookieStorage, cookieToInitialState } from "wagmi";
import { config } from "../../config";
import Web3ModalProvider from "../../context";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sturan | Equity CrowdFunding",
  description: "We help everyone to own a global company in the world",
};

export default function RootLayout({ children }) {

  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Web3ModalProvider initialState={initialState}>
        {children}
        </Web3ModalProvider>
        <Footer />
      </body>
    </html>
  );
}
