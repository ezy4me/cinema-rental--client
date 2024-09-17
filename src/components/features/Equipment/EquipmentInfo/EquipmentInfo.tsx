"use client";

import React, { useEffect, useState } from "react";
import styles from "./EquipmentInfo.module.scss";
import { fetchImageUrl } from "@/utils/fetchImageUrl";
import { getEquipmentById } from "@/services/equipment.api";
import { useParams } from "next/navigation";
import { Equipment } from "@/types/equipment";

const EquipmentInfo: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [image, setImage] = useState<string | null>(null);

  console.log(params.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!params.id) return;

        const fetchedEquipment = await getEquipmentById(params.id);
        setEquipment(fetchedEquipment);

        const imageUrl = await fetchImageUrl(fetchedEquipment.fileId);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  if (!equipment) {
    return <div>Загрузка...</div>;
  }

  return (
    <section>
      <div className={styles.equipmentInfo}>
        <h1 className={styles.equipmentName}>{equipment.name}</h1>
        <p className={styles.equipmentDescription}>{equipment.description}</p>
        <p className={styles.equipmentPrice}>
          Цена: ${parseFloat(equipment.pricePerDay).toFixed(2)} / день
        </p>
        <p className={styles.equipmentQuantity}>
          Количество: {equipment.quantity}
        </p>
        <div className={styles.equipmentImage}>
          <img
            src={image || "/images/placeholder.png"}
            alt={equipment.name}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default EquipmentInfo;
