"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { updateCustomerInfo } from "@/services/customer.api";
import { useSession } from "next-auth/react";
import styles from "./CustomerForm.module.scss";

interface CustomerInfoFormProps {
  customer?: {
    firstName?: string;
    secondName?: string;
    lastName?: string;
    phone?: string;
  };
}

interface CustomerFormData {
  firstName: string;
  secondName: string;
  lastName: string;
  phone: string;
}

const CustomerForm: React.FC<CustomerInfoFormProps> = ({ customer }) => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>();

  useEffect(() => {
    if (customer) {
      setValue("firstName", customer.firstName || "");
      setValue("secondName", customer.secondName || "");
      setValue("lastName", customer.lastName || "");
      setValue("phone", customer.phone || "");
    }
  }, [customer, setValue]);

  const onSubmit = async (data: CustomerFormData) => {
    try {
      await updateCustomerInfo(session?.user.id!, data, session?.accessToken!);
      alert("Информация о клиенте успешно обновлена!");
    } catch (error) {
      console.error("Ошибка при обновлении информации о клиенте", error);
      alert(
        "Ошибка при сохранении информации. Пожалуйста, попробуйте еще раз."
      );
    }
  };

  return (
    <form className={styles.customerInfoForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <Input
          label="Имя"
          id="firstName"
          type="text"
          {...register("firstName", { required: "Имя обязательно" })}
          error={errors.firstName?.message}
        />
      </div>

      <div className={styles.field}>
        <Input
          label="Фамилия"
          id="secondName"
          type="text"
          {...register("secondName", { required: "Фамилия обязательна" })}
          error={errors.secondName?.message}
        />
      </div>

      <div className={styles.field}>
        <Input
          label="Отчество"
          id="lastName"
          type="text"
          {...register("lastName", { required: "Отчество обязательно" })}
          error={errors.lastName?.message}
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
        />
      </div>

      <Button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}>
        {isSubmitting ? "Сохранение..." : "Сохранить"}
      </Button>
    </form>
  );
};

export default CustomerForm;
