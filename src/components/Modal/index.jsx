import React from "react";
import "./Modal.scss"; // Estilos para o modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Não renderiza o modal se ele estiver fechado

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
