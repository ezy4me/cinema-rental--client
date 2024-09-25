"use client";

import Link from "next/link";
import {
  FaYoutube,
  FaTelegram,
  FaInstagram,
  FaBars,
  FaUser,
  FaDoorClosed,
  FaDoorOpen,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Modal from "@/components/ui/Modal/Modal";
import AuthForm from "@/components/features/Forms/Auth/AuthForm";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation"; // Импортируйте usePathname

const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); // Получаем текущий маршрут
  const { data: session, status } = useSession();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleProfileClick = () => {
    if (session?.user?.role === "ADMIN") {
      router.push("/dashboard");
    } else {
      router.push("/profile");
    }
  };

  useEffect(() => {}, [session]);

  // Условие для скрытия Header на страницах dashboard
  if (pathname.startsWith("/dashboard")) {
    return null; // Если текущий путь начинается с /dashboard, то Header не отображается
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.socialIcons}>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaTelegram />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
        <div className={styles.logo}>
          <Link href="/">CRS</Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/equipment">Оборудование</Link>
            </li>
            <li>
              <Link href="/#contact">Контакты</Link>
            </li>
            {status === "authenticated" ? (
              <>
                <li className={styles.icon}>
                  <FaUser size={24} onClick={handleProfileClick} />
                </li>
                <li className={styles.icon}>
                  <FaDoorOpen size={32} onClick={() => signOut()} />
                </li>
              </>
            ) : (
              <li className={styles.icon} onClick={toggleModal}>
                <FaDoorClosed size={32} />
              </li>
            )}
          </ul>
        </nav>
        <div className={styles.hamburger} onClick={toggleSidebar}>
          <FaBars />
        </div>
        <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      </header>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title="Вход / Регистрация">
        <AuthForm onClose={toggleModal} />
      </Modal>
    </>
  );
};

export default Header;
