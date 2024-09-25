"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaDoorClosed, FaDoorOpen, FaTimes, FaUser } from "react-icons/fa";
import styles from "./Sidebar.module.scss";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Modal from "@/components/ui/Modal/Modal";
import AuthForm from "@/components/features/Forms/Auth/AuthForm";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={isOpen ? styles.sidebarBackdrop : ""}
      onClick={handleBackdropClick}>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/equipment" onClick={onClose}>
                Оборудование
              </Link>
            </li>
            <li>
              <Link href="/#contact" onClick={onClose}>
                Контакты
              </Link>
            </li>
            {status === "authenticated" ? (
              <>
                <li className={styles.icon}>
                  <FaUser size={24} onClick={() => router.push("/profile")} />
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
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title="Вход / Регистрация">
        <AuthForm onClose={toggleModal} />
      </Modal>
    </div>
  );
};

export default Sidebar;
