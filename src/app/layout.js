import dotenv from "dotenv";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { AuthenticationProvider } from "@/contexts/authentication";

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Voting System",
  description: "Tohidule Rakib",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthenticationProvider>
          <ToastContainer />
          {children}
        </AuthenticationProvider>
      </body>
    </html>
  );
}
