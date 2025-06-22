import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import crossIcon from "../../../assets/icons/cross.svg";

import styles from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.body}>{children}</div>
        <div className={styles.close_button} onClick={onClose}>
          <img src={crossIcon} alt="" />
        </div>
      </div>
    </div>,
    document.body
  );
};

