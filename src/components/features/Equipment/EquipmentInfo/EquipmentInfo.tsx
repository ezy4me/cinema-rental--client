"use client";

import React, { useEffect, useState } from "react";
import styles from "./EquipmentInfo.module.scss";
import { fetchImageUrl } from "@/utils/fetchImageUrl";
import { getEquipmentById } from "@/services/equipment.api";
import { useParams } from "next/navigation";
import { Equipment } from "@/types/equipment";
import Button from "@/components/ui/Button/Button";
import { getBrandById } from "@/services/brand.api";
import { addCartEquipment } from "@/services/cart.api";
import { useSession } from "next-auth/react";
import Notification from "@/components/ui/Notification/Notification";

const EquipmentInfo: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [brandName, setBrandName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false); 
  const [notificationMessage, setNotificationMessage] = useState(""); 
  const [notificationType, setNotificationType] = useState<
    "success" | "error"
  >("success"); 

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEquipment = await getEquipmentById(params.id);
        const brand = await getBrandById(fetchedEquipment.brandId);
        setEquipment(fetchedEquipment);
        setBrandName(brand.name);

        const imageUrl = await fetchImageUrl(fetchedEquipment.fileId);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleAddToCart = async () => {
    if (equipment && session?.user?.id && session.accessToken) {
      try {
        await addCartEquipment(session.user.id, equipment.id, session.accessToken);
        
        setNotificationMessage("Товар успешно добавлен в корзину!"); 
        setNotificationType("success");
        setShowNotification(true); 
      } catch (error) {
        console.error("Error adding item to cart:", error);
        
        setNotificationMessage("Ошибка при добавлении товара в корзину.");
        setNotificationType("error");
        setShowNotification(true); 
      }
    } else {
      console.error("User ID or access token is missing");
    }
  };

  return (
    <section>
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)} 
        />
      )}

      <div className={styles.equipmentInfo}>
        <h1 className={styles.equipmentName}>{equipment?.name}</h1>
        <h2 className={styles.equipmentBrand}>{brandName}</h2>
        <div className={styles.equipmentDescription}>
          {equipment?.description.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <p className={styles.equipmentPrice}>
          Цена: <span>{parseFloat(equipment?.pricePerDay!).toFixed(2)}</span> ₽ / день
        </p>
        <div className={styles.actions}>
          <div className={styles.equipmentQuantity}>
            <p>Кол-во: {equipment?.quantity}</p>
          </div>
          <Button size="large" variant="primary" onClick={handleAddToCart}>
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
