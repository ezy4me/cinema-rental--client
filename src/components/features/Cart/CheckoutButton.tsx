import React from 'react';
import styles from './CheckoutButton.module.scss';

interface CheckoutButtonProps {
  disabled: boolean;
  onCheckout: () => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ disabled, onCheckout }) => {
  return (
    <button
      className={styles.checkoutButton}
      onClick={onCheckout}
      disabled={disabled}
    >
      Оформить заказ
    </button>
  );
};

export default CheckoutButton;
