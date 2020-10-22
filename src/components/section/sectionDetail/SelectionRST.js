import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Bar from "./bar";
import "./SectionCST.css";

function SectionCST() {
  // const [ID_Selection, setID_Selection] = useState("");
  const [ID, setID] = useState("");
  const [Amount, setAmount] = useState("");
  const [loadingSectionSST, setLoadingSectionSST] = useState(false);
  const [maxSize, setMaxSize] = useState(0);
  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState([]);
  const [dataSST, setDataSST] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showAddSelec, setShowAddSelec] = useState(false);
  //add Selec
  const [ID_Set, setID_Set] = useState("");
  const [ID_Stem, setID_Stem] = useState("");
  const [showNum, setShowNum] = useState("");
  const [showDate, setShowDate] = useState("");
  // end
  // add to AST
  const [showAddToPST, setShowAddToPST] = useState(false);
  const [Farm, setFarm] = useState([]);
  useEffect(() => {
    const initSelection = async () => {
      let size = 10;
      const toProID = Cookies.get("IdProject");
      const getAll = await axios({
        url: "http://localhost:3005/getSelectionRST",
        withCredentials: true,
        method: "POST",
        data: { toProID, size, page },
      });
      setSelection(getAll.data.dataSelection);
      setDataSST(getAll.data.dataPST);
      setMaxSize(getAll.data.maxSize);
      setFarm(getAll.data.getFarmInFarm);
      setLoadingSectionSST(true);
    };
    initSelection();
  }, [page, loadingSectionSST]);

  const handleNext = async () => {
    if (page === maxSize) {
    } else {
      setPage(page + 1);
    }
  };
  const handlePre = () => {
    if (page === 1) {
    } else {
      setPage(page - 1);
    }
  };
  const ModalShowToPST = ({ handleClose, show }) => {
    const [data, setData] = useState([]);
    const [date, setDate] = useState("");
    const [addFarm, setAddFarm] = useState("");
    const [addblock, setBlock] = useState("");
    const [addplot, setPlot] = useState("");
    const [addRep, setRep] = useState("");
    const [addamount, setAmount] = useState("");
    const [click, setClick] = useState(true);
    const [check_id, setCheck_Id] = useState("");
    const [showCom, setShowCom] = useState(false);
    const [n, setN] = useState(0);
    const [er, setEr] = useState(false);
    const [erNum, setErNum] = useState(false);
    const [erCheck, setErCheck] = useState(false);
    const handle = () => {
      if (
        date === "" ||
        addFarm === "" ||
        addblock === "" ||
        addplot === "" ||
        addRep === "" ||
        addamount === ""
      ) {
        setEr(true);
      } else {
        setEr(false);
        setN(n + 1);
        data.push({
          chooseID: ID,
          addDate: date,
          addFarm: addFarm,
          addBlock: addblock,
          addUnit: addplot,
          addCount: addamount,
          addRepID: addRep,
          id: n,
        });
        setData(data);
        setErCheck(false);
        setClick(false);
      }
    };

    const ModalshowComfirm = ({ show }) => {
      return (
        <>
          <div className={show ? "Modal-DetailFarm" : "display-none"}>
            <section className="modal-main-Project">
              <p>Comfirm{check_id}</p>
              <button onClick={handleRemove}>Yes</button>
              <button
                onClick={() => {
                  setShowCom(false);
                }}
              >
                No
              </button>
            </section>
          </div>
        </>
      );
    };

    const handleSave = e => {
      var item = parseInt(e.target.value, 10);
      var num = 0;
      if (item < 0) {
        setErNum(true);
      } else {
        for (let index = 0; index < data.length; index++) {
          num = num + parseInt(data[index].addCount);
        }
        if (num + item > Amount) {
          setErNum(true);
        } else {
          setErNum(false);
          setAmount(item);
        }
      }
    };
    const showAdd = () => {
      return (
        <>
          {/* ตรงนี้ */}
          <div className="App">
            วันที่ปลูก
            <input
              className="Input-border-Mleft"
              type="date"
              onChange={e => {
                setDate(e.target.value);
              }}
            />
            <br />
            <div className="div-Area-inline">
              <p>Farm Name :</p>
              <select
                className="Input-border-Mleft"
                id="Farm"
                onChange={e => {
                  setAddFarm(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option> เลือกฟาร์ม</option>
                {Farm.map(dataF => {
                  return (
                    <option value={dataF.ID_Farm}>{dataF.FarmName}</option>
                  );
                })}
              </select>
            </div>
            <div className="div-Area-inline">
              <p>block</p>
              <input
                className="Input-border-Mleft"
                type="text"
                onChange={e => {
                  setBlock(e.target.value);
                }}
              />
            </div>
            <div className="div-Area-inline">
              <p>plot unit</p>
              <input
                className="Input-border-Mleft"
                type="text"
                onChange={e => {
                  setPlot(e.target.value);
                }}
              />
            </div>
            <div className="div-Area-inline">
              <p>Rep ID</p>

              <input
                className="Input-border-Mleft"
                type="text"
                onChange={e => {
                  setRep(e.target.value);
                }}
              />
            </div>
            <div className="div-Area-inline">
              <p> จำนวนต้นที่ปลูก</p>

              <input
                className="Input-border-Mleft"
                type="number"
                onChange={e => {
                  handleSave(e);
                }}
              />
            </div>
            <button onClick={handle}>save</button>
            <br />
            {erNum && <div className="error1">กรุณาระบุข้อมูลให้ถูกต้อง</div>}
            {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
          </div>
        </>
      );
    };
    const showText = () => {
      var ckN = parseInt(n, 10);
      if (data.length === 0 && ckN !== 0) {
        return <>{showAdd()}</>;
      }
      return (
        <>
          {data.map((item, n) => {
            return (
              <>
                {/* ตรงนี้ */}
                <label>
                  {(n = n + 1)} วันที่ปลูก:{item.addDate}
                  block:{item.addBlock} plot unit:{item.addUnit} RepID:
                  {item.addRepID}
                  จำนวนที่ปลูก:{item.addCount}
                </label>

                <button
                  onClick={() => {
                    setClick(true);
                  }}
                >
                  เพิ่มการเพาะปลูก
                </button>
                <button
                  onClick={() => {
                    setCheck_Id(item.id);
                    setShowCom(true);
                  }}
                >
                  ลบการเพาะปลูก
                </button>
                <br />
              </>
            );
          })}
        </>
      );
    };
    const handleRemove = () => {
      const ck = parseInt(check_id, 10);
      setData(
        data.filter(item => {
          return item.id !== ck;
        })
      );
      setShowCom(false);
      setClick(false);
    };
    const handleAdd = async () => {
      if (data.length === 0) {
        setErCheck(true);
      } else {
        setErCheck(false);
        setShowAddToPST(false);
        const toProID = Cookies.get("IdProject");
        const getAll = await axios({
          url: "http://localhost:3005/addToFST",
          withCredentials: true,
          method: "POST",

          data: { toProID, data, ID },
        });
        alert(getAll.data.message);
      }
    };
    return (
      <div className={show ? "Modal-DetailFarm" : "display-none"}>
        <section className="modal-main-Project">
          <h1 clas="P-Delete-Center">คุณต้องการนำเข้าขั้นตอน FST ของ {ID}</h1>
          <br />
          <div className="div-Area-modal">
            {/* ตรงนี้ เอาหัวใส่ตรงนี้*/}
            {showText()}

            {click ? showAdd() : ""}
            <ModalshowComfirm show={showCom} />
            {erCheck && (
              <div className="error1">กรุณา กดยืนยันข้อมูบข้างต้น</div>
            )}
          </div>

          <button
            className="Button-AddFarm-modal"
            onClick={() => {
              handleAdd();
            }}
          >
            บันทึก
          </button>
          <button className="Button-close-Farm-modal" onClick={handleClose}>
            ปิด
          </button>
        </section>
      </div>
    );
  };
  const ModalEditSelec = ({ show, handleClose }) => {
    const [num, setNum] = useState(showNum);
    const [date, setDate] = useState(showDate);
    const [er, setEr] = useState(false);
    const [error, setError] = useState({
      numSeed: false,
      massage1: "",
    });
    const hadleBlurSeed = e => {
      const Temail = e.target.value;
      if (Temail < 1) {
        setError({
          numSeed: true,
          massage1: "จำนวนท่อน ต้องมากกว่า 0",
        });
      } else if (!Temail) {
        setError({
          numSeed: true,
          massage1: "กรุณาระบุ จำนวนท่อน",
        });
      } else {
        setNum(Temail);
        setError({
          numSeed: false,
        });
      }
    };
    const handle = async () => {
      if (num === "" || date === "") {
        setEr(true);
      } else {
        setEr(false);
        setLoadingSectionSST(false);
        handleClose();
        const toProID = Cookies.get("IdProject");
        const getAll = await axios({
          url: "http://localhost:3005/addSelecPST",
          withCredentials: true,
          method: "POST",
          data: { toProID, num, ID_Stem, ID_Set, date },
        });
        alert(getAll.data.message);
      }
    };
    return (
      <>
        <div className={show ? "Modal-DetailFarm" : "display-none"}>
          <section className="modal-main-Project">
            เพิ่ม{"&"}แก้ไข จำนวนท่อน ของ {ID_Stem}
            <input
              type="number"
              placeholder={showNum}
              onChange={e => {
                hadleBlurSeed(e);
              }}
            />
            วันที่เก็บท่อนพันธุ์
            <input
              type="date"
              value={showDate}
              onChange={e => {
                setDate(e.target.value);
              }}
            />
            {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
            {error.numSeed && <div className="error1">{error.massage1}</div>}
            <button
              className="Button-AddFarm-modal"
              disabled={error.numSeed}
              onClick={handle}
            >
              บันทึก
            </button>
            <button className="Button-close-Farm-modal" onClick={handleClose}>
              ปิด
            </button>
          </section>
        </div>
      </>
    );
  };
  const showMoreDetail = () => {
    if (showMore) {
      return (
        <>
          <button
            onClick={() => {
              setShowMore(false);
            }}
          >
            ปิด
          </button>
          <table id="t01">
            <tr>
              <th>ID ต้นมัน</th>
              {/* <th>PreviousTest</th>
              <th>SproutPlanting_ID</th> */}
              <th>วันที่ปลูก</th>
              <th>Farm</th>
              <th>Block</th>
              <th>Plot unit</th>
              <th>RepID</th>
              <th>จำนวนต้นที่ปลูก</th>
              <th>จำนวนท่อน</th>
              <th>วันที่เก็บท่อนพันธุ์</th>
              <th></th>
            </tr>
            <tbody>
              {dataSST.map(data => {
                if (data.ID_Set === ID)
                  return (
                    <>
                      <tr>
                        <td>{data.ID_Stem}</td>
                        {/* <td>{data.ID_Previous}</td>
                        <td>{data.ID_SproutPlanting}</td> */}
                        <td>{data.Date}</td>
                        <td>{data.FarmName}</td>
                        <td>{data.ID_Block}</td>
                        <td>{data.ID_Unit}</td>
                        <td>{data.ID_Rep}</td>
                        <td>{data.Count}</td>
                        <td>{data.numSelec}</td>
                        <td>{data.dateSelec}</td>
                        <button
                          onClick={() => {
                            setID_Set(data.ID_Set);
                            setID_Stem(data.ID_Stem);
                            setShowNum(data.numSelec);
                            setShowDate(data.dateSelec);
                            setShowAddSelec(true);
                          }}
                        >
                          แก้ไข{"&"}เพิ่มจำนวนท่อน
                        </button>
                      </tr>
                    </>
                  );
              })}
            </tbody>
          </table>
        </>
      );
    }
  };
  return (
    <>
      <div className="Body-SectionCST">
        <Bar />
        <div className="Head-SectionCST">
          <div className="div-Head-Left-Side">
            <p>ขั้นตอนการเลือกต้นมาทำท่อนพันธุ์ </p>
          </div>
        </div>
        <div className="div-Table-Center">
          <table id="t01">
            <tr>
              <th></th>
              <th>ID กลุ่มท่อนพันธุ์</th>
              <th>Group ID PST</th>
              <th>จำนวนท่อน</th>
              <th></th>
            </tr>
            <tbody>
              {selection.map(data => {
                return (
                  <>
                    <tr>
                      <button
                        onClick={() => {
                          setID(data.ID_Set);
                          setAmount(data.ToTalAmout);
                          setShowMore(true);
                        }}
                      >
                        V
                      </button>
                      <td>{data.ID_Set}</td>
                      <td>{data.SumID}</td>
                      <td>{data.ToTalAmout}</td>

                      <td>
                        <button
                          onClick={() => {
                            setID(data.ID_Set);
                            setAmount(data.ToTalAmout);
                            setShowAddToPST(true);
                          }}
                        >
                          นำเข้าขั้นตอน FST
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
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

        <div className="">{showMoreDetail()}</div>

        <ModalShowToPST
          show={showAddToPST}
          handleClose={() => {
            setShowAddToPST(false);
          }}
        />
        <ModalEditSelec
          show={showAddSelec}
          handleClose={() => {
            setShowAddSelec(false);
          }}
        />
      </div>
    </>
  );
}

export default SectionCST;
