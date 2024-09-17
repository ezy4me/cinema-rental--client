"use client";

import React, { useState } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import styles from "./Cart.module.scss";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.floatingButton} onClick={toggleCart}>
        <FaShoppingCart />
        <div className={styles.itemCount}>3</div>
      </div>

      <div className={`${styles.cartDrawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.cartHeader}>
          <h2>Корзина</h2>
          <button className={styles.closeButton} onClick={toggleCart}>
            <FaTimes />
          </button>
        </div>
        <div className={styles.cartContent}>
          <p>Здесь будут товары в корзине...</p>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={toggleCart}></div>}
    </>
  );
};

export default Cart;
