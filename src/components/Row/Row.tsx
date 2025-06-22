import styles from "./Row.module.css";

export type RowProps = {
  value: number | string;
  text: string;
  variant?: "light" | "dark";
};

export const Row = ({ value, text, variant = "light" }: RowProps) => {
  return (
    <div
      className={`${styles.table_item} ${variant === "dark" && styles.dark}`}
    >
      <div className={styles.value}>{value}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

