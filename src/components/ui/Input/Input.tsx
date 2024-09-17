"use client";

import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ icon, label, error, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          {...props}
        />
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
