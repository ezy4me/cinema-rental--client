import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NotPermitted from "@/components/dashboard/NotPermitted";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Панель администратора CRS",
    description:
      "Платформа для аренды профессионального кинооборудования. Найдите и арендуйте всё необходимое для вашего проекта, от камер и микрофонов до освещения и аксессуаров.",
  };
  

export default async function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return <NotPermitted />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
