import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import { fetchImageUrl } from "@/utils/fetchImageUrl";
import { updateCartEquipment, deleteCartEquipment } from "@/services/cart.api";
import { useSession } from "next-auth/react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

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
  onUpdate: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, quantity, equipment, onUpdate }) => {
  const [image, setImage] = useState<string | null>(null);
  const { data: session } = useSession();

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

  const handleQuantityChange = async (delta: number) => {
    if (session) {
      try {
        const newQuantity = quantity + delta;
        if (newQuantity <= 0) {
          await deleteCartEquipment(session.user.id, equipment.id, session.accessToken);
        } else {
          await updateCartEquipment(session.user.id, equipment.id, newQuantity, session.accessToken);
        }
        onUpdate();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const handleRemove = async () => {
    if (session) {
      try {
        await deleteCartEquipment(session.user.id, equipment.id, session.accessToken);
        onUpdate(); 
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  return (
    <li className={styles.cartItem} key={id}>
      <div className={styles.equipmentImage}>
        <img
          src={image || "/images/placeholder.png"}
          alt={equipment.name}
          className={styles.image}
        />
      </div>
      <h3>{equipment.name}</h3>
      <p>Цена за день: {equipment.pricePerDay} руб.</p>
      <div className={styles.quantityControls}>
        <button onClick={() => handleQuantityChange(-1)} className={styles.controlButton}>
          <FaMinus />
        </button>
        <span>Количество: {quantity}</span>
        <button onClick={() => handleQuantityChange(1)} className={styles.controlButton}>
          <FaPlus />
        </button>
      </div>
      <button className={styles.removeButton} onClick={handleRemove}>
        <FaTrash />
      </button>
    </li>
  );
};

export default CartItem;
