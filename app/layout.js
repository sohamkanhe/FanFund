import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FanFund - Fund your projects",
  description: "This website is a crowdfunding platform for creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white`}>
        <SessionWrapper> 
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}