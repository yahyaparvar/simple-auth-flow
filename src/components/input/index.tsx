"use client";

import React from "react";
import styles from "./Input.module.scss";

type InputProps = {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className={styles.inputGroup}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <input
        {...props}
        className={`${className || ""} ${error ? styles.errorInput : ""}`}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
