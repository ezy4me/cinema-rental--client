import React from "react";
import styles from "./OrderList.module.scss";
import OrderItem from "./OrderItem";
import { Equipment } from "@/types/equipment";

interface OrderItem {
  id: number;
  quantity: number;
  cartId: number;
  equipmentId: number;
  equipment: Equipment;  
}

interface OrderListProps {
  items: OrderItem[]; 
}

const OrderList: React.FC<OrderListProps> = ({ items }) => {
  return (
    <div className="container">
      <div className={styles.orderList}>
        {items.map((item) => (
          <OrderItem
            key={item.id} 
            id={item.id}   
            quantity={item.quantity}  
            equipment={item.equipment}  
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
