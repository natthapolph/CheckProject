import React from "react";
import "./Farm.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./Breeder.css";
import Bar from "./bar";
function Breeder() {
  const [showAddBreeder, setShowAddBreeder] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [Breeder, setBreeder] = useState([]);
  // const [idB, setIdB] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [nameB, setNameB] = useState("");
  const initBreeder = async () => {
    const toProID = Cookies.get("IdProject");
    const getAll = await axios({
      url: "http://localhost:3005/getBreeder",
      withCredentials: true,
      method: "POST",
      data: { toProID },
    });
    setBreeder(getAll.data.Breeder);
  };
  useEffect(() => {
    setLoading2(true);
    initBreeder();
  }, [loading2]);

  const ModalShowAddFarm = ({ handleClose, show }) => {
    const [BreederName, setBreederName] = useState("");
    const [er, setEr] = useState(false);

    const handleBreeder = async () => {
      if (BreederName === "") {
        setEr(true);
      } else {
        const ID_Project = Cookies.get("IdProject");
        const addFarm = await axios({
          url: "http://localhost:3005/createBreeder",
          withCredentials: true,
          method: "POST",
          data: { BreederName, ID_Project },
        });

        if (addFarm.data.massage === "success") {
          console.log("success");
          setShowAddBreeder(false);
          setLoading2(false);
        } else if (addFarm.data.massage) {
          console.log("false");
          alert(addFarm.data.massage);
          setShowAddBreeder(false);
        }
      }
    };

    return (
      <div className={show ? "Modal-AddBreeder" : "display-none"}>
        <section className="modal-main-Project">
          <h1 className="P-Delete-Center">เพิ่มสายพันธุ์</h1>
          <br />
          <div className="div-Area-inline">
            <p className="P-Collect-F-M">พันธุ์ / สายพันธุ์พ่อแม่ :</p>
            <input
              className="Input-Breeder-Name"
              type="text"
              onChange={e => {
                e ? setBreederName(e.target.value) : console.log("555");
              }}
            />
          </div>

          {er && <div className="error1">กรุณากรอกข้อมูล</div>}
          <button
            className="Button-Add-Breeder"
            onClick={() => {
              handleBreeder();
            }}
          >
            Add
          </button>
          <button className="Button-close-Breeder" onClick={handleClose}>
            close
          </button>
        </section>
      </div>
    );
  };
  const ModalShowDelete = ({ handleClose, show }) => {
    const deleteBreeder = async () => {
      setLoading2(true);
      const toProID = Cookies.get("IdProject");
      const getAll = await axios({
        url: "http://localhost:3005/deleteBreeder",
        withCredentials: true,
        method: "POST",
        data: { toProID, nameB },
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
            คุณต้องการที่จะลบ สายพันธุ์
            <label className="Label-Weight-Bold">{nameB}</label> นี้ออกจากโปรเจค
          </p>
          <button
            className="Button-yes-Breeder-modal"
            onClick={() => {
              deleteBreeder();
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
  return (
    <>
      <div className="Body-Breeder">
        <Bar />

        <div className="Head-Breeder">
          <div className="div-Species">
            <div className="div-Head-Left-Side">
              <p className="P-Species">สายพันธุ์การค้า</p>
            </div>
          </div>
          <div className="div-Head-Right-Side">
            <button
              onClick={() => {
                setShowAddBreeder(true);
              }}
            >
              เพิ่มสายพันธุ์
            </button>
          </div>
        </div>
        <div className="div-Table-Breeding">
          <table id="t01">
            <tr>
              <th>No</th>
              <th>ชื่อสายพันธุ์</th>
              <th>Edit</th>
            </tr>
            {Breeder.map((data, n) => {
              return (
                <>
                  <tr>
                    <td>{(n = n + 1)}</td>
                    <td>{data.BreederName}</td>

                    <td>
                      <button
                        onClick={() => {
                          setNameB(data.BreederName);
                          // setIdB(data.ID_ฺBreeder);
                          setShowDelete(true);
                        }}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                        {/* <div className="Box-Farm-Farm">
                      <div className="Area-Img-Farm">
                        <img
                          className="img-Farm-Farm"
                          src="https://image.flaticon.com/icons/svg/187/187039.svg"
                          alt=""
                        />
                      </div>
                      <div className="Area-Name-Farm-Farm">{data.FarmName}</div>
                    </div> */}
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}{" "}
          </table>
        </div>

        {/* {Breeder.map((data, index) => {
          return (
            <>
              <li className="List-Style-None" key={`${data}-${index}`}>
                <div className="div-Breeder">
                  <p> {data.BreederName}</p>
                </div>
              </li>
            </>
          );
        })} */}
      </div>
      <ModalShowAddFarm
        show={showAddBreeder}
        handleClose={() => {
          setShowAddBreeder(false);
        }}
      />
      <ModalShowDelete
        show={showDelete}
        handleClose={() => {
          setShowDelete(false);
        }}
      />
    </>
  );
}
export default Breeder;
