import { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import BackgroundLines from "../components/layout/BackgroundLines/BackgroundLines";
import Cart from "@/components/features/Cart/Cart";
import Providers from "@/components/Providers/Providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Аренда кинооборудования",
  description:
    "Платформа для аренды профессионального кинооборудования. Найдите и арендуйте всё необходимое для вашего проекта, от камер и микрофонов до освещения и аксессуаров.",
};

const interTight = Inter_Tight({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log(session);

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <html lang="en">
      <body className={interTight.className}>
        <AppRouterCacheProvider>
          <Providers>
            <Header />
            {!isAdmin && (
              <>
                <BackgroundLines />
                <Cart />
              </>
            )}
            <main>{children}</main>
            {!isAdmin && <Footer />}
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
