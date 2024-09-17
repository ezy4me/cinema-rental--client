"use client";

import Link from "next/link";
import { FaYoutube, FaTelegram, FaInstagram, FaBars } from "react-icons/fa";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import Sidebar from "../Sidebar/Sidebar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
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
            <Link href="/">Главная</Link>
          </li>
          <li>
            <Link href="/equipment">Оборудование</Link>
          </li>
          <li>
            <Link href="/contact">Контакты</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.hamburger} onClick={toggleSidebar}>
        <FaBars />
      </div>
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
    </header>
  );
};

export default Header;
