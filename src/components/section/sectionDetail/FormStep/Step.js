import React from "react";
import Bar from "../bar";
import "./Step.css";
export default function Step({
  Title,
  btnAdd,
  handleBtnAdd,
  Search,
  children,
  checkBtn,
}) {
  return (
    <>
      <div className="Body-Form-Step">
        <Bar />

        <div className="Head-Form-Step">
          <div className="div-Head-Left-Side">
            <p>{Title} </p>
          </div>

          <div className="div-Head-Right-Side">
            {/* <button onClick={handleBtnAdd}>{btnAdd}</button> */}
            {checkBtn && <button onClick={handleBtnAdd}>{btnAdd}</button>}
          </div>
          <div class="div-Area-Search">{Search}</div>
        </div>

        {children}
      </div>
    </>
  );
}
