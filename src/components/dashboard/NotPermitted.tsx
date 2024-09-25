"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import styles from "./NotPermitted.module.scss";

const NotPermitted: React.FC = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <section>
      <div className="page">
        <div className={styles.notPermitted}>
          <h1>У вас нет доступа к этой странице</h1>
          <p>
            Пожалуйста, свяжитесь с администратором, если вы считаете, что это
            ошибка.
          </p>
          <Button onClick={goHome}>Вернуться на главную</Button>
        </div>
      </div>
    </section>
  );
};

export default NotPermitted;
