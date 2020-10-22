import React, { useEffect, useState } from "react";
// import axios from "axios";
import Cookies from "js-cookie";
import ModalDelete from "./Modal/ModalDelete";
import "./Massage.css";
import axios from "../axiosIntance";
function Massage() {
  const [loading, setLoading] = useState(false);
  const [massage, setMassage] = useState([]);
  const [showCom, setShowCom] = useState(false);
  const [showCan, setShowCan] = useState(false);
  const [proName, setProNmae] = useState("");
  const [idPro, setIdPro] = useState("");
  useEffect(() => {
    const init = async () => {
      const idUser = Cookies.get("Id_User");
      const mas = await axios({
        url: "/getMassage",
        method: "POST",
        data: { idUser },
      });
      setMassage(mas.data.massage);
      console.log(mas.data.massage);
    };
    init();
    setLoading(true);
  }, [loading]);
  const accept = async () => {
    setLoading(false);
    const idUser = Cookies.get("Id_User");
    const mas = await axios({
      url: "http://localhost:3005/acceptMember",
      withCredentials: true,
      method: "POST",
      data: { idUser, idPro },
    });
    console.log(mas);
  };
  const ModalDelete2 = ({ show, handleClose, handle, bu1, bu2, children }) => {
    return (
      <div className={show ? "Modal-DetailFarm" : "display-none"}>
        <section className="modal-main-Project">
          {children}
          <button
            className="Button-1"
            onClick={() => {
              handle();
              handleClose();
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
  };
  const cancelAddMember = async () => {
    setLoading(false);
    const idUser = Cookies.get("Id_User");
    const mas = await axios({
      url: "http://localhost:3005/cancelAddMember",
      withCredentials: true,
      method: "POST",
      data: { idUser, idPro },
    });
    console.log(mas);
  };

  return (
    <>
      <div className="Body-MyFarm">
        <div className="Container-Home-Project">
          <div className="div-Area-Massage">
            <h1 className="Head-Page">กล่องข้อความ</h1>
            {/* {massage.length} */}
            {/* <button onClick={handleAdd}>add</button> */}
            {massage.map(data => {
              if (data.Massage === "คำเชิญเข้าร่วมโปรเจค") {
                return (
                  <>
                    <div className="overflow">
                      <div className="div-Area-inline">
                        <span class="dot"></span>
                        <p>
                          คุณมี{data.Massage} {data.ProjectName}
                        </p>
                        <div className="div-Area-Button-Massage">
                          <button
                            className="Button-OK-Massage"
                            onClick={() => {
                              setProNmae(data.ProjectName);
                              setIdPro(data.ID_Project);
                              setShowCom(true);
                            }}
                          >
                            ตกลง
                          </button>
                          <button
                            className="Button-Cancle-Massage"
                            onClick={() => {
                              setProNmae(data.ProjectName);
                              setIdPro(data.ID_Project);
                              setShowCan(true);
                            }}
                          >
                            ยกเลิก
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      </div>
      <ModalDelete
        show={showCom}
        handleClose={() => {
          setShowCom(false);
        }}
        handle={() => {
          accept();
        }}
        bu1="ใช่"
        bu2="ไม่"
      >
        ยืนยันการเข้าร่วมโปรเจค <span>highlight--{proName}--highlight</span>
        นี้ใช่หรือไม่
      </ModalDelete>
      <ModalDelete2
        show={showCan}
        handleClose={() => {
          setShowCan(false);
        }}
        handle={() => {
          cancelAddMember();
        }}
        bu1="ใช่"
        bu2="ไม่"
      >
        ยืนยันการเข้าร่วมโปรเจค <span>highlight--{proName}--highlight</span>
        นี้ใช่หรือไม่
      </ModalDelete2>
    </>
  );
}

export default Massage;
