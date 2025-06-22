import fileSvg from "../../assets/icons/file.svg";
import smileSvg from "../../assets/icons/smile.svg";
import smileSadSvg from "../../assets/icons/smile-sad.svg";
import trashSvg from "../../assets/icons/trash.svg";
import type { SaveReportData } from "../../services/report";

import styles from "./HistoryItem.module.css";

type Props = {
  data: SaveReportData;
  isDisabled: boolean;
  onClick: () => void;
  onDelete: () => void;
};

export const HistoryItem = ({ data, isDisabled, onClick, onDelete }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.content} ${!isDisabled && styles.disabled}`}
        onClick={onClick}
      >
        <div className={styles.item}>
          <img src={fileSvg} alt="" />
          <span>{data.fileName}</span>
        </div>
        <div className={styles.item}>{data.date}</div>
        <div
          className={`${styles.item} ${styles.status_cell} ${
            !data.isSuccess && styles.disabled_cell
          }`}
        >
          <span>Обработан успешно</span>
          <img src={smileSvg}></img>
        </div>
        <div
          className={`${styles.item} ${styles.status_cell} ${
            data.isSuccess && styles.disabled_cell
          }`}
        >
          <span>Не удалось обработать</span>
          <img src={smileSadSvg}></img>
        </div>
      </div>
      <div className={styles.delete} onClick={onDelete}>
        <img src={trashSvg} alt="" />
      </div>
    </div>
  );
};

