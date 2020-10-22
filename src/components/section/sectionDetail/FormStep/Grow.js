import React from "react";

export default function Grow({
  handleClose,
  show,
  handle,
  children,
  bu1,
  bu2,
}) {
  return (
    <div className={show ? "Modal-DetailFarm" : "display-none"}>
      <section className="modal-main-Project">
        {children}
        <button
          onClick={() => {
            handle();
            handleClose();
          }}
        >
          {bu1}
        </button>
        <button onClick={handleClose}>{bu2}</button>
      </section>
    </div>
  );
}
