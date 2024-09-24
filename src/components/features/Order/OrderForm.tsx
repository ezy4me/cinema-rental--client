"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./OrderForm.module.scss";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { Equipment } from "@/types/equipment";
import Select from "@/components/ui/Select/Select";
import { addCustomerInfo } from "@/services/customer.api";
import { addUserRental } from "@/services/rental.api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Notification from "@/components/ui/Notification/Notification";
import DateRangePicker from "@/components/ui/DateRangePicker/CustomDateRangePicker";
import { useTranslation } from "react-i18next";

interface OrderItem {
  id: number;
  quantity: number;
  cartId: number;
  equipmentId: number;
  equipment: Equipment;
}

interface OrderFormData {
  firstName: string;
  secondName: string;
  lastName: string;
  phone: string;
  paymentMethod: string;
}

interface OrderFormProps {
  items: OrderItem[];
  customer?: {
    firstName?: string;
    secondName?: string;
    lastName?: string;
    phone?: string;
  };
}

const OrderForm: React.FC<OrderFormProps> = ({ items, customer }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const { data: session } = useSession();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );

  const [rentalPeriod, setRentalPeriod] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onDateRangeChange = (ranges: any) => {
    setRentalPeriod(ranges);
    console.log(ranges);
    
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>();

  useEffect(() => {
    if (customer) {
      setValue("firstName", customer.firstName || "");
      setValue("secondName", customer.secondName || "");
      setValue("lastName", customer.lastName || "");
      setValue("phone", customer.phone || "");
    }
  }, [customer, setValue]);

  const calculateRentalDays = () => {
    const timeDiff = Math.abs(
      rentalPeriod.endDate.getTime() - rentalPeriod.startDate.getTime()
    );
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;
  };

  const calculateTotalPrice = () => {
    const rentalDays = calculateRentalDays();
    return items.reduce(
      (total, item) =>
        total + Number(item.equipment.pricePerDay) * item.quantity * rentalDays,
      0
    );
  };

  const handleDateRangeChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;

    if (startDate) {
      const calculatedEndDate = endDate
        ? new Date(endDate)
        : new Date(startDate);
      if (!endDate) {
        calculatedEndDate.setDate(startDate.getDate() + 7);
      }

      const newDateRange = {
        startDate: new Date(startDate),
        endDate: calculatedEndDate,
        key: "selection",
      };

      setRentalPeriod(newDateRange);
    }
  };

  const onSubmit = async (data: OrderFormData) => {
    try {
      console.log("Order Details: ", { ...data, paymentMethod, rentalPeriod });

      if (!customer) {
        const customerData = { ...data };
        await addCustomerInfo(
          session?.user.id!,
          customerData,
          session?.accessToken!
        );
      }

      const rentalData = {
        startDate: rentalPeriod.startDate.toISOString(),
        endDate: rentalPeriod.endDate.toISOString(),
        totalAmount: calculateTotalPrice(),
        userId: session?.user.id!,
      };

      const equipments = items.map((item) => ({
        id: item.equipmentId,
        quantity: item.quantity,
      }));

      await addUserRental(rentalData, session?.accessToken!, equipments);

      setNotificationMessage("Заказ успешно оформлен!");
      setNotificationType("success");
      setShowNotification(true);

      router.push("/profile");
    } catch (error) {
      console.error(
        "Ошибка при отправке информации о клиенте или аренде",
        error
      );
      setNotificationMessage("Произошла ошибка при оформлении заказа.");
      setNotificationType("error");
      setShowNotification(true);
    }
  };

  return (
    <div className="container">
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      <form className={styles.orderForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <Input
            label="Имя"
            id="firstName"
            type="text"
            {...register("firstName", { required: "Имя обязательно" })}
            error={errors.firstName?.message}
            disabled={!!customer}
          />
        </div>

        <div className={styles.field}>
          <Input
            label="Фамилия"
            id="secondName"
            type="text"
            {...register("secondName", { required: "Фамилия обязательна" })}
            error={errors.secondName?.message}
            disabled={!!customer}
          />
        </div>

        <div className={styles.field}>
          <Input
            label="Отчество"
            id="lastName"
            type="text"
            {...register("lastName", { required: "Отчество обязательно" })}
            error={errors.lastName?.message}
            disabled={!!customer}
          />
        </div>

        <div className={styles.field}>
          <Input
            label="Телефон"
            id="phone"
            type="text"
            {...register("phone", {
              required: "Телефон обязателен",
              pattern: {
                value: /^\+?[0-9]{10,12}$/,
                message: "Введите корректный номер телефона",
              },
            })}
            error={errors.phone?.message}
            disabled={!!customer}
          />
        </div>

        <div className={styles.field}>
          <Select
            label="Способ оплаты"
            id="paymentMethod"
            options={[
              { value: "Карта", label: "Карта" },
              { value: "Наличные", label: "Наличные" },
            ]}
            value={paymentMethod}
            onChange={setPaymentMethod}
            error={errors.paymentMethod?.message}
          />
        </div>

        <div className={styles.field}>
          <DateRangePicker onDateRangeChange={onDateRangeChange} />
        </div>

        <Button type="submit" className={styles.submitButton}>
          Подтвердить заказ
        </Button>
      </form>

      <div className={styles.totalPrice}>
        <h3>Итого:</h3>
        <p>{calculateTotalPrice()} руб.</p>
      </div>
    </div>
  );
};

export default OrderForm;
