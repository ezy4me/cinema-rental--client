import React from "react";
import styles from "./EquipmentHeroSection.module.scss";

const EquipmentHeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>Аренда оборудования</h1>
          <p className={styles.description}>
            Аренда камер, оптики и операторского оборудования
          </p>
        </div>
      </div>
    </section>
  );
};

export default EquipmentHeroSection;
