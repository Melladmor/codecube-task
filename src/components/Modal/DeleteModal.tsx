import React, { useState } from "react";
import styles from "./style.module.css"; // 👈 استدعاء الـ css module
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Spinner from "../Spinner/Spinner";
import Button from "../Buttons/Button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName,
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modal_backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>{title}</h2>
          <button
            className={styles.modal_close}
            onClick={onClose}
            aria-label="Close modal">
            <IoClose size={24} />
          </button>
        </div>

        <div className={styles.modal_content}>
          <div className={styles.modal_icon}>
            <MdDelete size={32} />
          </div>

          <p className={styles.modal_message}>{message}</p>

          {itemName && (
            <div className={styles.modal_item_name}>
              <strong>{itemName}</strong>
            </div>
          )}
        </div>

        <div className={styles.modal_footer}>
          <Button
            className={`${styles.modal_btn} ${styles.modal_btn_cancel}`}
            onClick={onClose}
            disabled={isDeleting}>
            {cancelText}
          </Button>
          <Button
            className={`${styles.modal_btn} ${styles.modal_btn_delete}`}
            onClick={handleConfirm}
            disabled={isDeleting}>
            {isDeleting ? <Spinner /> : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
