"use client";

import React from "react";
import { FaTimes } from "react-icons/fa";
import CartItem from "./CartItem";
import styles from "./Cart.module.scss";
import { Equipment } from "@/types/equipment";
import Loader from "@/components/ui/Loader/Loader";

interface CartItem {
  id: number;
  quantity: number;
  cartId: number;
  equipmentId: number;
  equipment: Equipment;
}

interface CartDrawerProps {
  isOpen: boolean;
  toggleCart: () => void;
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  session: any;
  status: string;
  onUpdate: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  toggleCart,
  cartItems,
  loading,
  error,
  session,
  status,
  onUpdate,
}) => {
  return (
    <div className={`${styles.cartDrawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.cartHeader}>
        <h2>Корзина</h2>
        <button className={styles.closeButton} onClick={toggleCart}>
          <FaTimes />
        </button>
      </div>
      <div className={styles.cartContent}>
        {status === "loading" ? (
          <p>Загрузка...</p>
        ) : !session ? (
          <p>Пожалуйста, авторизуйтесь для просмотра содержимого корзины</p>
        ) : loading ? (
          <Loader/>
        ) : error ? (
          <p>{error}</p>
        ) : cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} onUpdate={onUpdate} />
            ))}
          </ul>
        ) : (
          <p>Ваша корзина пуста</p>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
