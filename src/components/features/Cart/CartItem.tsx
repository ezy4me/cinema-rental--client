"use effect";

import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import { fetchImageUrl } from "@/utils/fetchImageUrl";

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

interface CartItemProps {
  id: number;
  quantity: number;
  equipment: Equipment;
}

const CartItem: React.FC<CartItemProps> = ({ id, quantity, equipment }) => {
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
  }, []);

  return (
    <li className={styles.cartItem} key={id}>
      <div className={styles.equipmentImage}>
        <img
          src={image || "/images/placeholder.png"}
          alt={equipment?.name}
          className={styles.image}
        />
      </div>
      <h3>{equipment.name}</h3>
      <p>Цена за день: {equipment.pricePerDay} руб.</p>
      <p>Количество: {quantity}</p>
    </li>
  );
};

export default CartItem;
