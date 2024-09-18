"use client";

import React, { useEffect, useState } from "react";
import styles from "./EquipmentInfo.module.scss";
import { fetchImageUrl } from "@/utils/fetchImageUrl";
import { getEquipmentById } from "@/services/equipment.api";
import { useParams } from "next/navigation";
import { Equipment } from "@/types/equipment";
import Button from "@/components/ui/Button/Button";
import { getCategoryById } from "@/services/category.api";
import { getBrandById } from "@/services/brand.api";

const EquipmentInfo: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [caregoryName, setCategoryName] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEquipment = await getEquipmentById(params.id);
        const caregory = await getCategoryById(fetchedEquipment.categoryId);
        const brand = await getBrandById(fetchedEquipment.brandId);
        setEquipment(fetchedEquipment);
        setCategoryName(caregory.name);
        setBrandName(brand.name);

        const imageUrl = await fetchImageUrl(fetchedEquipment.fileId);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <section>
      <div className={styles.equipmentInfo}>
        <h1 className={styles.equipmentName}>{equipment?.name}</h1>
        <h2 className={styles.equipmentBrand}>{brandName}</h2>
        <div className={styles.equipmentDescription}>
          {equipment?.description.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <p className={styles.equipmentPrice}>
          Цена: <span>${parseFloat(equipment?.pricePerDay!).toFixed(2)}</span> /
          день
        </p>
        <div className={styles.actions}>
          <div className={styles.equipmentQuantity}>
            <p>Кол-во: {equipment?.quantity}</p>
          </div>
          <Button size="large" variant="primary" type="submit">
            В корзину
          </Button>
        </div>

        <div className={styles.equipmentImage}>
          <img
            src={image || "/images/placeholder.png"}
            alt={equipment?.name}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default EquipmentInfo;
