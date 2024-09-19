import React from 'react';
import { FaTimes } from 'react-icons/fa';
import CartItem from './CartItem';
import styles from './Cart.module.scss';

interface Equipment {
  id: number;
  name: string;
  description: string;
  pricePerDay: string;
  quantity: number;
  statusId: number;
  brandId: number;
  categoryId: number;
  fileId: number;
}

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
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, toggleCart, cartItems, loading, error, session, status }) => {
  return (
    <div className={`${styles.cartDrawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.cartHeader}>
        <h2>Корзина</h2>
        <button className={styles.closeButton} onClick={toggleCart}>
          <FaTimes />
        </button>
      </div>
      <div className={styles.cartContent}>
        {status === 'loading' ? (
          <p>Загрузка...</p>
        ) : !session ? (
          <p>Пожалуйста, авторизуйтесь для просмотра содержимого корзины</p>
        ) : loading ? (
          <p>Загрузка товаров из корзины...</p>
        ) : error ? (
          <p>{error}</p>
        ) : cartItems.length > 0 ? (
          <ul>
            {cartItems.map(item => (
              <CartItem key={item.id} {...item} />
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
