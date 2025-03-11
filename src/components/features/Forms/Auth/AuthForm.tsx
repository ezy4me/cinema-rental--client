"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./AuthForm.module.scss";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import { register, forgotPassword } from "@/services/auth.api";
import { signIn } from "next-auth/react";

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
  });

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    setServerError(null);
    setSuccessMessage(null);
    setIsForgotPassword(false);
  };

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      if (isForgotPassword) {
        await forgotPassword(data.email);
        setSuccessMessage("Новый пароль отправлен на вашу почту.");
        return;
      }

      if (isRegister) {
        await register({
          email: data.email,
          password: data.password,
        });
        setSuccessMessage("Регистрация успешна! Войдите в аккаунт.");
      } else {
        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false, // Отключаем редирект
        });

        if (result?.error) {
          setServerError("Неверный email или пароль.");
          return;
        }

        onClose();
      }
    } catch (error) {
      setServerError("Произошла ошибка, попробуйте позже.");
      console.error(error);
    }
  };

  return (
    <div className={styles.authForm}>
      <h3>
        {isForgotPassword
          ? "Восстановление пароля"
          : isRegister
          ? "Регистрация"
          : "Вход"}
      </h3>
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

        {!isForgotPassword && (
          <Input
            icon={<FaLock />}
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            {...registerInput("password", {
              required: isRegister ? "Пароль обязателен" : false,
              minLength: {
                value: 6,
                message: "Пароль должен содержать минимум 6 символов",
              },
            })}
            error={errors.password?.message}
          />
        )}
        {serverError && <p className={styles.serverError}>{serverError}</p>}
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}

        <Button type="submit">
          {isForgotPassword
            ? "Восстановить пароль"
            : isRegister
            ? "Зарегистрироваться"
            : "Войти"}
        </Button>
      </form>

      {isForgotPassword ? (
        <p className={styles.action}>
          <span onClick={() => setIsForgotPassword(false)}>
            Вернуться к входу
          </span>
        </p>
      ) : (
        <>
          <p
            className={styles.forgotPassword}
            onClick={() => setIsForgotPassword(true)}>
            Забыли пароль?
          </p>

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
        </>
      )}
    </div>
  );
};

export default AuthForm;
