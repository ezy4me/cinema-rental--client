"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./ContactSection.module.scss";
import Input from "@/components/ui/Input/Input";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className={styles.contactSection}>
      <h2 className="title">Контакты</h2>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2 className={styles.title}>Свяжитесь с нами</h2>
          <p className={styles.description}>
            Если у вас есть вопросы или вам нужна помощь, заполните форму ниже,
            и мы свяжемся с вами как можно скорее.
          </p>
          <div className={styles.contactDetails}>
            <p>
              <strong>Адрес:</strong> ул. Примерная, д. 1, Казань, Россия
            </p>
            <p>
              <strong>Телефон:</strong> +7 123 456 7890
            </p>
            <p>
              <strong>Email:</strong> info@example.com
            </p>
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {isSubmitted && (
            <p className={styles.successMessage}>Ваше сообщение отправлено!</p>
          )}
          <div className={styles.formGroup}>
            <Input
              label="Имя"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              label="Сообщение"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required></Input>
          </div>
          <button type="submit" className={styles.submitButton}>
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
