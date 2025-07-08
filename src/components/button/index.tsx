"use client";

import clsx from "clsx";
import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  size = "medium",
  variant = "primary",
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      style={{ width: fullWidth ? "100%" : "auto" }}
      className={clsx(styles.button, styles[variant], styles[size], className)}
    >
      {children}
    </button>
  );
}
