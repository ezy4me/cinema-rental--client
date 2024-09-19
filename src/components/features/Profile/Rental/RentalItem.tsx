import React from "react";
import styles from "./RentalItem.module.scss";

interface RentalItemProps {
  rental: {
    id: string;
    date: string;
    status: string;
    items: { id: string; name: string; quantity: number }[];
    totalPrice: number;
  };
}

const RentalItem: React.FC<RentalItemProps> = ({ rental }) => {
  return (
    <li className={styles.rentalItem}>
      <div className={styles.rentalSection}>
        <p>
          <span>Номер заказа:</span> {rental.id}
        </p>

        <p>
          <strong>Статус:</strong> {rental.status}
        </p>
      </div>
      <div className={styles.rentalSection}>
        <h4>Товары:</h4>
        <ul>
          {rental?.items?.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} шт.
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.rentalSummary}>
        <p>
          <span>Сумма заказа:</span> ${rental?.totalPrice?.toFixed(2)}
        </p>
        <p>
          <span>Дата:</span> {new Date(rental.date).toLocaleDateString()}
        </p>
      </div>
    </li>
  );
};

export default RentalItem;
