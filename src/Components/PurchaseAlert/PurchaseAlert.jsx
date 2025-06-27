
import React, { useEffect } from "react";
import "./PurchaseAlert.css";

const PurchaseAlert = ({ message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`purchase-alert ${visible ? "show" : ""}`}>
      <div className="alert-header">
        <div className="alert-message">{message}</div>
        <span className="close-btn" onClick={onClose}>&times;</span>
      </div>
      <div className="progress-bar">
        <div className={`progress-fill ${visible ? "animate" : ""}`}></div>
      </div>
    </div>
  );
};

export default PurchaseAlert;