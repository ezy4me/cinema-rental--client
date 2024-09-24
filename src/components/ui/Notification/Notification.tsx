"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Notification.module.scss";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return createPortal(
    <div className={`${styles.notification} ${styles[type]}`}>
      <p>{message}</p>
    </div>,
    document.body
  );
};

export default Notification;
