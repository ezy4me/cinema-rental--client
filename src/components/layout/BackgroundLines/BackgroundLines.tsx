"use client"
import React, { useState, useEffect } from "react";
import styles from "./BackgroundLines.module.scss";

const BackgroundLines = () => {
  const [lineCount, setLineCount] = useState(23);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { 
        setLineCount(12);
      } else {
        setLineCount(23);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lines = new Array(lineCount).fill(null);

  return (
    <div className={styles["absolute-lines-wrapper"]}>
      <div className={styles["absolute-lines"]}>
        {lines.map((_, index) => (
          <div
            key={index}
            className={styles["absolute-lines__item"]}
            style={{ animationDelay: `${index * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundLines;
