import { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import BackgroundLines from "../components/layout/BackgroundLines/BackgroundLines";
import Cart from "@/components/features/Cart/Cart";
import Providers from "@/components/Providers/Providers";
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: "Аренда кинооборудования",
  description:
    "Платформа для аренды профессионального кинооборудования. Найдите и арендуйте всё необходимое для вашего проекта, от камер и микрофонов до освещения и аксессуаров.",
};

const interTight = Inter_Tight({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body className={interTight.className}>
        <Providers session={session}>
          <Header />
          <BackgroundLines />
          <Cart />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
