import React from "react";
import "./ModalButton.css";

export default function search({
  handleClose,
  show,
  handle,
  children,
  bu1,
  bu2,
  error,
}) {
  return (
    <>
      {" "}
      <div className="div-Table-Step-SST">
        <div className="div-Area-Button-Choose">
          <button
            className="Button-Choose-in-Table"
            onClick={() => {
              setShowSelec(true);
            }}
          >
            เลือก
          </button>
        </div>

        <table id="t01">
          <tr>
            <th>ID ต้นมัน</th>
            <th>ID การเพาะเมล็ด</th>
            <th>พ่อพันธุ์</th>
            <th>แม่พันธุ์</th>
            <th>สถานะ</th>
            <th>วันที่ปลูก</th>
            <th>ฟาร์ม</th>
            <th>บล็อค</th>
            <th>ยูนิต</th>
          </tr>
          {sea.map(data => {
            return (
              <>
                <tr>
                  <td>{data.ID_SST}</td>
                  <td>{data.ID_Seedling}</td>
                  <td>{data.ID_Father}</td>
                  <td>{data.ID_Mother}</td>
                  <td>{data.Status_SST}</td>
                  <td>{data.DateSST}</td>
                  <td>{data.FarmName}</td>
                  <td>{data.ID_Block}</td>
                  <td>{data.ID_Unit}</td>

                  <button
                    className="Button-Edit-Table-StepSST"
                    onClick={() => {
                      setIdSST(data.ID_SST);
                      setIdSeedling(data.ID_Seedling);
                      setFather(data.ID_Father);
                      setMother(data.ID_Mother);
                      setStatus(data.Status_SST);
                      setDate(data.DateSST);
                      setFarmName(data.FarmName);
                      setBlock(data.ID_Block);
                      setUnit(data.ID_Unit);
                      setShowEditSST(true);
                    }}
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>

                  <button
                    className="Button-Delete-Table-StepSST"
                    onClick={() => {
                      setIdSST(data.ID_SST);
                      setIdSeedling(data.ID_Seedling);
                      setFather(data.ID_Father);
                      setMother(data.ID_Mother);
                      setStatus(data.Status_SST);
                      setDate(data.DateSST);
                      setFarmName(data.FarmName);
                      setBlock(data.ID_Block);
                      setUnit(data.ID_Unit);
                      setShowDeleteSST(true);
                    }}
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() => {
                      Cookies.set("SST", data.ID_SST);
                    }}
                  >
                    <Link className="Link-Underline-Color" to="/growSSTDetail">
                      เพิ่มข้อมูลการเจริญเติบโต
                    </Link>
                  </button>
                </tr>
              </>
            );
          })}
        </table>
      </div>
      <div className="Area-Button-Pre-Next">
        <button className="Button-Pre-Page" onClick={handlePre}>
          <i class="fa fa-step-backward" aria-hidden="true"></i>
        </button>
        <label htmlFor="">
          {page} of {maxSize}
        </label>
        <button className="Button-Next-Page" onClick={handleNext}>
          <i class="fa fa-step-forward" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
}
