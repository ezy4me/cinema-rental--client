import React from "react";
import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>Cinema Rental Studio</h1>
          <p className={styles.description}>
            Арендуйте первоклассное кинооборудование для вашего следующего
            крупного проекта.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
