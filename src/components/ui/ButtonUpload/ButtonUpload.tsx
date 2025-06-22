import crossIcon from "../../../assets/icons/cross.svg";
import styles from "./ButtonUpload.module.css";

export type UploadStatus =
  | "uploaded"
  | "parsing"
  | "parsed"
  | "error"
  | "default";

interface UploadButtonProps {
  title: string;
  status: UploadStatus;
  onClick: () => void;
  onRemove: () => void;
  message?: string;
  isLoading: boolean;
}

const statusStyles: Record<UploadStatus, CSSModuleClasses[string]> = {
  uploaded: styles.btn_uploaded,
  parsing: styles.btn_parsing,
  parsed: styles.btn_parsed,
  error: styles.btn_error,
  default: styles.btn_default,
};

const showStatus: UploadStatus[] = ["uploaded", "parsed", "error"];

export const ButtonUpload = ({
  title,
  status,
  onRemove,
  onClick,
  message,
  isLoading,
}: UploadButtonProps) => {
  return (
    <div className={styles.upload_wrapper}>
      <div className={styles.button_wrapper}>
        <div
          className={`${styles.upload_button} ${statusStyles[status]}`}
          onClick={onClick}
        >
          {isLoading ? <>Loading...</> : title}
        </div>
        {showStatus.includes(status) && (
          <div
            className={styles.delete_button}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <img src={crossIcon} />
          </div>
        )}
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};
