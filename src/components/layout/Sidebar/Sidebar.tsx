"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import styles from "./Sidebar.module.scss";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeButton} onClick={onClose}>
        <FaTimes />
      </button>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/" onClick={onClose}>
              Главная
            </Link>
          </li>
          <li>
            <Link href="/equipment" onClick={onClose}>
              Оборудование
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={onClose}>
              Контакты
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
