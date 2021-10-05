import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";
const modalRoot = document.getElementById("modal");

export default function Modal({ children, toggleModal }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") toggleModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleBackdropClick = (e) => {
    const { target, currentTarget } = e;
    if (target === currentTarget) {
      toggleModal();
    }
  };
  return createPortal(
    <div onClick={handleBackdropClick} className="backdrop">
      <div className="content">{children}</div>
    </div>,
    modalRoot
  );
}
