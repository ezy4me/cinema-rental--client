import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import OrderForm from "@/components/features/Order/OrderForm";
import OrderList from "@/components/features/Order/OrderList";
import { getCartEquipments } from "@/services/cart.api";
import { getCustomerInfo } from "@/services/customer.api";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const items = await getCartEquipments(session?.user.id!);

  console.log(session?.accessToken);
  
  const customer = await getCustomerInfo(session?.user.id!, session?.accessToken!);

  if (!session) {
    return (
      <div className="page">
        Пожалуйста, войдите в систему, чтобы оформить заказ.
      </div>
    );
  }

  return (
    <div className="page">
      <section>
        <h1 className="title">Оформление заказа</h1>

        <OrderList items={items} />

        <OrderForm items={items} customer={customer}/>
      </section>
    </div>
  );
}
