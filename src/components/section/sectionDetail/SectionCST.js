import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Bar from "./bar";
import "./SectionCST.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ModalEdit from "./Modal/ModalEdit";
import ModalDelete from "./Modal/ModalDelete";
function SectionCST() {
  // const [ID_Selection, setID_Selection] = useState("");
  const [ID, setID] = useState("");
  const [Date, setDate] = useState("");
  const [Amount, setAmount] = useState("");
  const [idSprout, SetIdSprout] = useState("");
  const [showAddEditSelectionSST, setShowEditSelectionSST] = useState(false);
  const [showAddDeletetSelectionSST, setShowDeleteSelectionSST] = useState(
    false
  );
  const [showAdd, setShowAdd] = useState(false);
  const [loadingSectionSST, setLoadingSectionSST] = useState(false);
  const [maxSize, setMaxSize] = useState(0);
  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState([]);
  const [dataSST, setDataSST] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newAmount, setNewAmount] = useState("");

  // add to PST
  const [showAddToPST, setShowAddToPST] = useState(false);
  const [Farm, setFarm] = useState([]);
  useEffect(() => {
    const initSelection = async () => {
      let size = 10;
      const toProID = Cookies.get("IdProject");
      const getAll = await axios({
        url: "http://localhost:3005/getSelectionCST",
        withCredentials: true,
        method: "POST",
        data: { toProID, size, page },
      });
      setSelection(getAll.data.dataSelection);
      setDataSST(getAll.data.dataCST);
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
          url: "http://localhost:3005/addToPST",
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
          <h1 clas="P-Delete-Center">คุณต้องการนำเข้าขั้นตอน PST ของ {ID}</h1>
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
  const ModalShowAddSelection = ({ handleClose, show }) => {
    const [date, setDate] = useState("");
    const [id, setID] = useState("");
    const [amount, setAmount] = useState("");
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
          massage1: "จำนวนเมล็ดที่ได้จากการผสม ต้องมากกว่า 0",
        });
      } else if (!Temail) {
        setError({
          numSeed: true,
          massage1: "กรุณาระบุ จำนวนเมล็ดที่ได้จากการผสม",
        });
      } else {
        setAmount(e.target.value);
        setError({
          numSeed: false,
        });
      }
    };
    const handleAdd = async () => {
      if (date === "" || id === "" || amount === "") {
        setEr(true);
      } else {
        setEr(false);
        setLoadingSectionSST(false);
        setShowAdd(false);
        const ID_Project = Cookies.get("IdProject");
        const add = await axios({
          url: "http://localhost:3005/createSectionCST",
          withCredentials: true,
          method: "POST",

          data: {
            ID_Project,
            date,
            id,
            amount,
          },
        });
        alert(add.data.message);
        console.log(add);
      }
    };
    return (
      <div className={show ? "Modal-DetailFarm" : "display-none"}>
        <section className="modal-main-Project">
          <p className="Head-Edit-modal">เลือกต้นเพื่อที่จะขยายพันธุ์ต่อ</p>
          <div className="div-Area-modal">
            <div className="div-Area-inline">
              <Autocomplete
                id="combo-box-demo"
                options={dataSST}
                onChange={(e, value) =>
                  value ? setID(value.ID_Stem) : setID("")
                }
                getOptionLabel={option => option.ID_Stem}
                size="small"
                style={{ width: 250, height: 50 }}
                renderInput={params => (
                  <TextField {...params} label="ID CST" variant="outlined" />
                )}
              />
            </div>
            <div className="div-Area-inline">
              <p>วันที่ที่ผลิตท่อนพันธุ์จากต้น </p>
              <input
                className="Input-border-Mleft"
                type="date"
                onChange={e => {
                  e ? setDate(e.target.value) : console.log("");
                }}
              />
            </div>

            <div className="div-Area-inline">
              <p>จำนวนท่อนพันธุ์ </p>
              <input
                className="Input-border-Mleft"
                type="number"
                // onBlur={hadleBlurSeed}
                placeholder={0}
                min={0}
                onChange={e => {
                  hadleBlurSeed(e);
                  // e ? setAmount(e.target.value) : setAmount("");
                }}
              />
            </div>
          </div>
          {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
          {error.numSeed && <div className="error1">{error.massage1}</div>}
          <button
            className="Button-AddFarm-modal"
            disabled={error.numSeed}
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
  const handleDelete = async () => {
    setLoadingSectionSST(false);
    const ID_Project = Cookies.get("IdProject");
    const edit = await axios({
      url: "http://localhost:3005/deleteSelectionCST",
      withCredentials: true,
      method: "POST",
      data: {
        ID_Project,
        ID,
      },
    });
    console.log(edit);
  };
  const handleEdit = async () => {
    setLoadingSectionSST(false);
    const ID_Project = Cookies.get("IdProject");
    const edit = await axios({
      url: "http://localhost:3005/editSelectionCST",
      withCredentials: true,
      method: "POST",
      data: {
        ID_Project,
        ID,
        newAmount,
        newDate,
      },
    });
    console.log(edit);
  };
  return (
    <>
      <div className="Body-SectionCST">
        <Bar />
        <div className="Head-SectionCST">
          <div className="div-Head-Left-Side">
            <p>ขั้นตอนการเลือกต้นมาทำท่อนพันธุ์ </p>
          </div>

          <div className="div-Head-Right-Side">
            <button
              onClick={() => {
                setShowAdd(true);
              }}
            >
              เพิ่มท่อนพันธุ์
            </button>
          </div>
        </div>
        <div className="div-Table-Center">
          <table id="t01">
            <tr>
              <th>ID CST</th>
              <th>SproutPlanting _ID</th>
              <th>วันที่บันทึก</th>
              <th>จำนวนท่อน</th>
              <th>Edit</th>
            </tr>
            <tbody>
              {selection.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.ID_Main}</td>
                      <td>{data.ID_SproutPlanting}</td>

                      <td>{data.Date}</td>
                      <td>{data.Amount}</td>
                      <td>
                        <button
                          className="Button-Edit-Table-StepSST"
                          onClick={() => {
                            SetIdSprout(data.ID_SproutPlanting);
                            setID(data.ID_Main);
                            setDate(data.Date);
                            setAmount(data.Amount);
                            setNewAmount(data.Amount);
                            setNewDate(data.Date);
                            setShowEditSelectionSST(true);
                          }}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>

                        <button
                          className="Button-Delete-Table-StepSST"
                          onClick={() => {
                            SetIdSprout(data.ID_SproutPlanting);
                            setID(data.ID_Main);
                            setDate(data.Date);
                            setAmount(data.Amount);

                            setShowDeleteSelectionSST(true);
                          }}
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button
                          onClick={() => {
                            setID(data.ID_Main);
                            setAmount(data.Amount);
                            setShowAddToPST(true);
                          }}
                        >
                          นำเข้าขั้นตอน PST
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
        <ModalShowAddSelection
          show={showAdd}
          handleClose={() => {
            setShowAdd(false);
          }}
        />
        <ModalEdit
          show={showAddEditSelectionSST}
          handleClose={() => {
            setShowEditSelectionSST(false);
          }}
          handle={handleEdit}
          bu1="บันทึก"
          bu2="ปิด"
        >
          <h1 className="P-Delete-Center">แก้ไขข้อมูล</h1>
          <br />
          <div className="div-Area-modal">
            <p className="div-Area-inline">ID กลุ่มท่อน :{idSprout}</p>
            <p className="div-Area-inline">ID CST :{ID}</p>
            <br />
            <div className="div-Area-inline">
              <p>วันที่บันทึก :</p>
              <input
                className="Input-border-Mleft"
                type="date"
                value={newDate}
                onChange={e => {
                  e ? setNewDate(e.target.value) : setNewDate(Date);
                }}
              />
            </div>

            <div className="div-Area-inline">
              <p>จำนวนท่อน :</p>
              <input
                className="Input-border-Mleft"
                type="number"
                placeholder={Amount}
                value={newAmount}
                min={0}
                onChange={e => {
                  e ? setNewAmount(e.target.value) : setNewAmount(Amount);
                }}
              />
            </div>
          </div>
        </ModalEdit>

        <ModalDelete
          show={showAddDeletetSelectionSST}
          handleClose={() => {
            setShowDeleteSelectionSST(false);
          }}
          handle={handleDelete}
          bu1="ใช่"
          bu2="ไม่"
        >
          <h1 className="P-Delete-Center">คุณต้องการที่จะลบ </h1>
          <br />
          <div className="div-Area-modal">
            <p className="div-Area-inline">ID CST :{ID}</p>
            <p className="div-Area-inline"> SproutPlanting _ID :{idSprout}</p>
            <p className="div-Area-inline">วันที่บันทึก :{Date}</p>
            <p className="div-Area-inline">จำนวนท่อน :{Amount}</p>
          </div>
        </ModalDelete>

        <ModalShowToPST
          show={showAddToPST}
          handleClose={() => {
            setShowAddToPST(false);
          }}
        />
      </div>
    </>
  );
}

export default SectionCST;
