"use client";

import React, { useEffect, useState } from "react";
import styles from "./ProfileInfo.module.scss";
import { useSession } from "next-auth/react";
import CustomerForm from "../../Forms/Customer/CustomerForm";
import { getCustomerInfo } from "@/services/customer.api";

const ProfileInfo: React.FC = () => {
  const { data: session } = useSession();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (session?.user.id && session?.accessToken) {
        try {
          const customerData = await getCustomerInfo(
            session.user.id,
            session.accessToken
          );
          setCustomer(customerData);
        } catch (error) {
          console.error("Ошибка при получении информации о клиенте", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (session) {
      fetchCustomerData();
    }
  }, [session]);

  if (loading) {
    return <div></div>;
  }

  return (
    <section style={{ paddingBottom: 20 }}>
      <div className="container">
        <h1 className={styles.title}>Профиль пользователя</h1>
        <div className={styles.userDetails}>
          <p>{session?.user.email}</p>
        </div>
        <CustomerForm customer={customer} />
      </div>
    </section>
  );
};

export default ProfileInfo;
