import React, { useState, useRef, useEffect } from "react";
import styles from "./Select.module.scss";

interface SelectProps {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  error?: string;
  onChange: (value: string) => void;
  value: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  options,
  error,
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSelect = () => setIsOpen(!isOpen);
  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.inputContainer} ref={selectRef}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <div
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          onClick={toggleSelect}
        >
          {value || "Выберите..."}
          <div className={styles.icon}>▼</div>
        </div>
        {isOpen && (
          <div className={styles.optionsContainer}>
            {options.map((option) => (
              <div
                key={option.value}
                className={styles.option}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Select;
