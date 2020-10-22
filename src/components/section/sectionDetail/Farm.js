import React from "react";
import "./Farm.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Bar from "./bar";
function Farm() {
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [showDetailFarm, setShowDetailFarm] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [idFarm, setIdFarm] = useState("");
  const [detailFarmN, setDetailFarmN] = useState("");
  const [listFarm, setListFarm] = useState([]);
  const [ck, setCk] = useState(false);
  const [FarmInProject, setFarmInProject] = useState([]);
  // const [chk, setChk] = useState([{ x: 1 }]);
  var _ = require("lodash");
  useEffect(() => {
    const initInProject = async () => {
      const ID_user = Cookies.get("Id_User");
      const toProID = Cookies.get("IdProject");
      const getAll = await axios({
        url: "http://localhost:3005/getDetailFarm",
        withCredentials: true,
        method: "POST",
        data: { toProID, ID_user },
      });
      setFarmInProject(getAll.data.Farm);
      setListFarm(getAll.data.getFarmAddProject);
      console.log(getAll.data.Farm);
      setLoading2(true);
      // console.log(loading2);
    };
    initInProject();
    return () => {
      initInProject();
    };
  }, [loading2]);

  const ModalShowAddFarm = ({ handleClose, show }) => {
    const [selec, setSelec] = useState([]);

    const [er, setEr] = useState(false);
    // if (listFarm.length === 0) {
    //   setCk(true);
    // } else {
    //   setCk(false);
    // }
    const handleAddFarm = async () => {
      if (selec.length === 0) {
        // if (AddFarmName === "" || ID_Farm === "") {
        setEr(true);
      } else {
        console.log(selec);
        setShowAddFarm(false);
        setLoading2(false);
        const toProID = Cookies.get("IdProject");

        const addFarm = await axios({
          url: "http://localhost:3005/myProject/AddFarm",
          withCredentials: true,
          method: "POST",
          data: { selec, toProID },
        });
        alert(addFarm.data.mes);
      }
    };

    const checked1 = e => {
      console.log(e.target.value);
      console.log(selec);
      if (e.target.checked === true) {
        selec.push({ ID_Farm: e.target.value });
        setSelec(selec);
      } else {
        console.log("Check Remove");
        console.log(selec);

        setSelec(
          selec.filter(item => {
            console.log(item.ID_Farm, e.target.value);
            return item.ID_Farm !== e.target.value;
          })
        );
        console.log("After Remove");
        console.log(selec);
      }
    };

    return (
      <div className={show ? "Modal-AddBreeder" : "display-none"}>
        <section className="modal-main-Project">
          <h1 className="P-Delete-Center">เพิ่มฟาร์ม</h1>
          <br />
          <p className="P-Choose-Farm-You-Want">
            เลือก ฟาร์มที่คุณต้องการที่เพิ่ม
          </p>
          <div className="ex3">
            {listFarm.map(data => {
              return (
                <>
                  <input
                    className="Checkbox-list-Farm"
                    type="checkbox"
                    value={data.ID_Farm}
                    name={data.FarmName}
                    onChange={e => {
                      checked1(e);
                    }}
                  />
                  <label htmlFor="">{data.FarmName}</label>
                  <br />
                </>
              );
            })}
          </div>

          <div className="div-Lowwer-modal"></div>
          {er && <div className="error1">กรุณาเลือกฟาร์มที่ต้องการเพิ่ม</div>}
          {ck && (
            <button
              className="Button-AddFarm-modal"
              onClick={() => {
                handleAddFarm();
              }}
            >
              AddFarm
            </button>
          )}

          <button className="Button-close-Farm-modal" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    );
  };

  const ModalShowDelete = ({ handleClose, show }) => {
    const deleteFarm = async () => {
      setLoading2(false);
      const toProID = Cookies.get("IdProject");
      const getAll = await axios({
        url: "http://localhost:3005/deleteFarm",
        withCredentials: true,
        method: "POST",
        data: { toProID, idFarm },
      });
      console.log(getAll.data.massage);
      alert(getAll.data.massage);
    };
    return (
      <div className={show ? "Modal-DetailFarm" : "display-none"}>
        <section className="modal-main-Project">
          <h1 className="P-Delete-Center">ลบข้อมูล</h1>
          <br />
          <p className="P-Delete-Center">
            คุณต้องการที่จะลบ ฟาร์ม
            <label className="Label-Weight-Bold">{detailFarmN}</label>
            นี้ออกจากโปรเจค
          </p>
          <button
            className="Button-yes-Breeder-modal"
            onClick={() => {
              deleteFarm();
              handleClose();
            }}
          >
            ใช่
          </button>

          <button className="Button-close-Farm-modal" onClick={handleClose}>
            ไม่
          </button>
        </section>
      </div>
    );
  };
  const handleCheck = () => {
    console.log(parseInt(listFarm.length, 10) === 0);
    if (parseInt(listFarm.length, 10) === 0) {
      setCk(false);
    } else {
      setCk(true);
    }
  };
  return (
    <>
      <div className="Body-Farm">
        <Bar />

        <div className="Head-Farm">
          <div className="div-Head-Left-Side">
            <p className="P-Farm">ฟาร์ม</p>
          </div>
          <div className="div-Head-Right-Side">
            <button
              className="Button-Bar"
              onClick={() => {
                handleCheck();
                setShowAddFarm(true);
              }}
            >
              เพิ่มฟาร์ม
            </button>
          </div>
        </div>
        <div className="div-Table-Breeding">
          <table id="t01">
            <tr>
              <th>No</th>
              <th>ชื่อฟาร์ม</th>
              <th>สถานที่</th>
              <th>Edit</th>
            </tr>
            {FarmInProject.map((data, n) => {
              return (
                <>
                  <tr>
                    <td>{(n = n + 1)}</td>
                    <td>{data.FarmName}</td>
                    <td>{data.Location}</td>
                    <td>
                      <button
                        onClick={() => {
                          setDetailFarmN(data.FarmName);
                          setIdFarm(data.ID_Farm);
                          setShowDetailFarm(true);
                        }}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
      <ModalShowAddFarm
        show={showAddFarm}
        handleClose={() => {
          setShowAddFarm(false);
        }}
      />
      <ModalShowDelete
        show={showDetailFarm}
        handleClose={() => {
          setShowDetailFarm(false);
        }}
      />
    </>
  );
}
export default Farm;
