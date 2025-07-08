"use client";

import clsx from "clsx";
import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  size = "medium",
  variant = "primary",
  fullWidth,
  iconLeft,
  iconRight,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      style={{ width: fullWidth ? "100%" : "auto" }}
      className={clsx(styles.button, styles[variant], styles[size], className)}
    >
      {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
      <span className={styles.label}>{children}</span>
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
}
