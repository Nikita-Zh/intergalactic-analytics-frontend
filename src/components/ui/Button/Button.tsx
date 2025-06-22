import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export type ButtonType = "success" | "warning" | "dark" | "disabled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonType;
};

const statusStyles: Record<ButtonType, CSSModuleClasses[string]> = {
  success: styles.success,
  warning: styles.warning,
  dark: styles.dark,
  disabled: styles.disabled,
};

export const Button = ({
  variant,
  children,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${statusStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
