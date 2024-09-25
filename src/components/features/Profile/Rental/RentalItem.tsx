"use client";

import React, { useEffect, useState } from "react";
import styles from "./RentalItem.module.scss";
import { fetchImageUrl } from "@/utils/fetchImageUrl";

const RentalItem: React.FC<{ rental: any }> = ({ rental }) => {
  const [equipmentImages, setEquipmentImages] = useState<{ [key: number]: string | null }>({});

  useEffect(() => {
    const fetchImages = async () => {
      const images: { [key: number]: string | null } = {};
      for (const item of rental.rentalEquipment) {
        try {
          const imageUrl = await fetchImageUrl(item.equipment.fileId);
          images[item.equipment.id] = imageUrl;
        } catch (error) {
          console.error(`Error fetching image for equipment ${item.equipment.id}:`, error);
          images[item.equipment.id] = null;
        }
      }
      setEquipmentImages(images);
    };

    fetchImages();
  }, [rental]);

  return (
    <li className={styles.rentalItem}>
      <div className={styles.rentalSection}>
        <h4>Заказ #{rental.id}</h4>

        <div className={styles.rentalDate}>
          <p>
            <span>Дата начала:</span>{" "}
            {new Date(rental.startDate).toLocaleDateString()}
          </p>
          <p>
            <span>Дата окончания:</span>{" "}
            {new Date(rental.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className={styles.rentalSummary}>
        <ul>
          {rental.rentalEquipment.map((item: any) => (
            <li key={item.id} className={styles.equipmentItem}>
              <div className={styles.equipmentImage}>
                {equipmentImages[item.equipment.id] ? (
                  <img
                    src={equipmentImages[item.equipment.id]!}
                    alt={item.equipment.name}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>Image not available</div>
                )}
              </div>
              <div className={styles.equipmentDetails}>
                <span>{item.equipment.name}</span> — {item.quantity} шт. по{" "}
                {item.equipment.pricePerDay} руб./день
              </div>
            </li>
          ))}
        </ul>

        <p>
          Итоговая сумма: <span>{rental.totalAmount} руб.</span>
        </p>
      </div>
    </li>
  );
};

export default RentalItem;
