import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hunian Rumah",
  description: "Sistem Administrasi Rumah Tangga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div className="border-t">
            <div className="bg-background">
              <div className="flex flex-row">
                <div className="hidden lg:block w-[18%]">
                  <Sidebar />
                </div>
                <div className="col-span-3 overflow-auto lg:col-span-5 lg:border-l w-[82%]">
                  <div className="py-6 px-6 lg:px-8">
                    {/* <Header /> */}
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
