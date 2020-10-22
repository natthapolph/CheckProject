import React from "react";
import "./ModalButton.css";

export default function ModalDelete({
  handleClose,
  show,
  handle,
  children,
  bu1,
  bu2,
  disBtn,
}) {
  return (
    <div className={show ? "Modal-DetailFarm" : "display-none"}>
      <section className="modal-main-Project">
        {children}
        <button
          className="Button-1"
          onClick={() => {
            handle();
          }}
        >
          {bu1}
        </button>
        <button className="Button-2" onClick={handleClose} disabled={disBtn}>
          {bu2}
        </button>
      </section>
    </div>
  );
}
