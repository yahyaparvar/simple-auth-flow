"use client";

import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      style={{ width: fullWidth ? "100%" : "auto" }}
      {...props}
      className={`${styles.button} ${className || ""}`}
    >
      {children}
    </button>
  );
}
