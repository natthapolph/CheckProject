import React from "react";
import "./ModalButton.css";

export default function ModalAdd({
  handleClose,
  show,
  handle,
  children,
  bu1,
  bu2,
  error,
}) {
  return (
    <div className={show ? "Modal-DetailFarm" : "display-none"}>
      <section className="modal-main-Project">
        {children}
        <button
          className="Button-1"
          disabled={error}
          onClick={() => {
            handle();
          }}
        >
          {bu1}
        </button>
        <button className="Button-2" onClick={handleClose}>
          {bu2}
        </button>
      </section>
    </div>
  );
}
