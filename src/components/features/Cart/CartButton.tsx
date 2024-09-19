import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './Cart.module.scss';

interface CartButtonProps {
  isOpen: boolean;
  toggleCart: () => void;
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ isOpen, toggleCart, itemCount }) => {
  return (
    <div
      className={`${styles.floatingButton} ${isOpen ? styles.open : ''}`}
      onClick={toggleCart}
    >
      <FaShoppingCart />
      <div className={styles.itemCount}>{itemCount}</div>
    </div>
  );
};

export default CartButton;
