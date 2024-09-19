"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CartButton from './CartButton';
import CartDrawer from './CartDrawer';
import { getCartEquipments } from '@/services/cart.api';
import styles from './Cart.module.scss';
import { Equipment } from '@/types/equipment';

interface CartItem {
  id: number;
  quantity: number;
  cartId: number;
  equipmentId: number;
  equipment: Equipment;
}

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession<any>();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const loadCartItems = async () => {
    if (session?.user.id) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const items = await getCartEquipments(session.user.id);
        setCartItems(items);
      } catch (err) {
        setError('Ошибка при загрузке товаров из корзины');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = () => {
    loadCartItems();
  };

  useEffect(() => {
    if (isOpen && session) {
      loadCartItems();
    }
  }, [isOpen, session]);

  return (
    <>
      <CartButton isOpen={isOpen} toggleCart={toggleCart} itemCount={cartItems.length} />
      <CartDrawer
        isOpen={isOpen}
        toggleCart={toggleCart}
        cartItems={cartItems}
        loading={loading}
        error={error}
        session={session}
        status={status}
        onUpdate={handleUpdate}
      />
      {isOpen && <div className={styles.overlay} onClick={toggleCart}></div>}
    </>
  );
};

export default Cart;
