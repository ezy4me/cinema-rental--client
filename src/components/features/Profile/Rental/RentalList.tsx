"use client";

import React, { useEffect, useState } from "react";
import styles from "./RentalList.module.scss";
import RentalItem from "@/components/features/Profile/Rental/RentalItem";
import { getUserRentals } from "@/services/rental.api";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/Loader/Loader";

const RentalList: React.FC = () => {
  const { data: session } = useSession();
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      if (session) {
        try {
          const rentalData = await getUserRentals(session.user.id);
          setRentals(rentalData);
        } catch (error) {
          console.error("Ошибка при получении заказов:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [session]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className={styles.rentalsSection}>
      <div className="container">
        <h2 className={styles.title}>Мои заказы</h2>
        {rentals.length === 0 ? (
          <p className={styles.noRentalsText}>У вас нет заказов.</p>
        ) : (
          <ul className={styles.rentalsList}>
            {rentals.map((rental) => (
              <RentalItem key={rental.id} rental={rental} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default RentalList;
