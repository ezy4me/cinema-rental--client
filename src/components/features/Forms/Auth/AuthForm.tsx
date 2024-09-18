"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./AuthForm.module.scss";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import { login, register } from "@/services/auth.api";

interface AuthFormProps {
  onClose: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
  });

  const toggleAuthMode = () => setIsRegister(!isRegister);

  const onSubmit = async (data: FormData) => {
    setServerError(null); // Очищаем предыдущие ошибки

    try {
      if (isRegister) {
        // Вызов функции регистрации
        const response = await register({
          email: data.email,
          password: data.password,
        });
        console.log("Регистрация успешна", response);
        // После регистрации можно закрыть окно
        onClose();
      } else {
        // Вызов функции входа
        const response = await login({
          email: data.email,
          password: data.password,
        });
        console.log("Вход успешен", response);
        // После успешного входа можно закрыть окно
        onClose();
      }
    } catch (error) {
      setServerError("Произошла ошибка при выполнении запроса");
      console.error(error);
    }
  };

  return (
    <div className={styles.authForm}>
      <h3>{isRegister ? "Регистрация" : "Вход"}</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          icon={<FaEnvelope />}
          label="Email"
          type="email"
          placeholder="Введите email"
          {...registerInput("email", {
            required: "Email обязателен",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некорректный email",
            },
          })}
          error={errors.email?.message}
        />
        <Input
          icon={<FaLock />}
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          {...registerInput("password", {
            required: "Пароль обязателен",
            minLength: {
              value: 6,
              message: "Пароль должен содержать минимум 6 символов",
            },
          })}
          error={errors.password?.message}
        />
        {serverError && <p className={styles.serverError}>{serverError}</p>}
        <Button type="submit">
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </Button>
      </form>

      <p className={styles.action}>
        {isRegister ? (
          <>
            Уже есть аккаунт? <span onClick={toggleAuthMode}>Войти</span>
          </>
        ) : (
          <>
            Нет аккаунта?{" "}
            <span onClick={toggleAuthMode}>Зарегистрироваться</span>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
