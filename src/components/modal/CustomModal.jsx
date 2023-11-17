import React from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../img/close-icon.svg";
import "./CustomModal.css";

export default function CustomModal({
  isOpen,
  onClose,
  submitBtn,
  cancelBtn,
  onDelete,
  onCancel,
  children,
}) {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={"modal-overlay"}
      className={"modal-content"}
      closeTimeoutMS={300}
      onRequestClose={() => onClose()}
      ariaHideApp={false}
    >
      <button className="modal-close-button" onClick={() => onClose()}>
        <CloseIcon />
      </button>
      {children}
      <div className="modal-btn-wrapper">
        {submitBtn && (
          <button className="modal-btn-submit" onClick={() => onDelete()}>
            {submitBtn}
          </button>
        )}
        {cancelBtn && (
          <button className="modal-btn-cancel" onClick={() => onCancel()}>
            {cancelBtn}
          </button>
        )}
      </div>
    </Modal>
  );
}
