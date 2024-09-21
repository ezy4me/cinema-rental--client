"use client";

import React, { useEffect, useState } from "react";
import styles from "./OrderItem.module.scss";
import { Equipment } from "@/types/equipment";
import { fetchImageUrl } from "@/utils/fetchImageUrl";

interface OrderItemProps {
  id: number;
  quantity: number;
  equipment: Equipment;
}

const OrderItem: React.FC<OrderItemProps> = ({ quantity, equipment }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageUrl = await fetchImageUrl(equipment.fileId);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };

    fetchData();
  }, [equipment.fileId]);

  return (
    <div className={styles.orderItem}>
      <div className={styles.equipmentImage}>
        <img
          src={image || "/images/placeholder.png"}
          alt={equipment.name}
          className={styles.image}
        />
      </div>
      <div className={styles.equipmentInfo}>
        <p className={styles.itemName}>{equipment.name}</p>
        <p className={styles.itemQuantity}>Количество: {quantity}</p>
        <p className={styles.itemPrice}>Цена: {equipment.pricePerDay} руб.</p>
      </div>
    </div>
  );
};

export default OrderItem;
