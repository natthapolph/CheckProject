import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Step from "./FormStep/Step";
import ModalAdd from "./Modal/ModalAdd";
import TextField from "@material-ui/core/TextField";
import ModalEdit from "./Modal/ModalEdit";
import ModalDelete from "./Modal/ModalDelete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import "./StepCST.css";
function StepCST() {
  const [loadingCST, setLoadingCST] = useState(false);
  const [dataCST, setDataCST] = useState([]);
  //Edit-Delete
  const [showEditCST, setShowEditCST] = useState(false);
  const [showDeleteCST, setShowDeleteCST] = useState(false);
  const [ID_Stem, setID_Stem] = useState("");
  const [ID_Previous, setID_Previous] = useState("");
  const [ID_SproutPlanting, setID_SproutPlanting] = useState("");
  const [Date, setDate] = useState("");
  const [FarmName, setFarmName] = useState("");
  const [ID_Block, setID_Block] = useState("");
  const [ID_Unit, setID_Unit] = useState("");
  const [ID_Rep, setID_Rep] = useState("");
  const [Count, setCount] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newID_Rep, setNewID_Rep] = useState("");
  const [newCount, setNewCount] = useState("");
  //end Edit-Delete
  const [maxSize, setMaxSize] = useState(0);
  const [page, setPage] = useState(1);
  const [idSearch, setIdSearch] = useState("");
  // การทำท่อนพันธุ์
  const [showSelection, setShowSelection] = useState(false);
  const [ID_Set, setID_Set] = useState("");
  //
  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    const initGrowSST = async () => {
      const toProID = Cookies.get("IdProject");
      const size = 10;
      const getAll = await axios({
        url: "http://localhost:3005/getPST",
        withCredentials: true,
        method: "POST",
        data: { toProID, size, page },
      });

      setMaxSize(getAll.data.maxSize);
      setDataCST(getAll.data.dataCST);
      setDataSearch(getAll.data.num);
    };
    initGrowSST();
    setLoadingCST(true);
  }, [page, loadingCST]);
  const handleNext = async () => {
    if (page === maxSize) {
    } else {
      setPage(page + 1);
    }
  };

  const ModalShowAddSelection = ({ handleClose, show }) => {
    const [date, setDate] = useState("");
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
      if (
        date === "" ||
        // || idSST === ""
        amount === ""
      ) {
        setEr(true);
      } else {
        setEr(false);
        setLoadingCST(false);
        setShowSelection(false);
        const id = ID_Stem;
        const ID_Project = Cookies.get("IdProject");
        const add = await axios({
          url: "http://localhost:3005/createSectionPST",
          withCredentials: true,
          method: "POST",

          data: {
            ID_Project,
            date,
            id,
            amount,
            ID_Set,
          },
        });
        alert(add.data.message);
      }
    };
    return (
      <div className={show ? "Modal-DetailFarm" : "display-none"}>
        <section className="modal-main-Project">
          <h1 className="P-Delete-Center">การทำท่อนพันธุ์</h1>
          <br />
          <div className="div-Area-modal">
            <p>ต้นมันที่จะนำมาทำท่อนพันธุ์ {ID_Stem}</p>
            <br />
            <div className="div-Area-inline">
              <p>วันที่ที่ผลิตท่อนพันธุ์จากต้น </p>
              <input
                className="Input-Date-Timber"
                type="date"
                onChange={e => {
                  e ? setDate(e.target.value) : console.log("");
                }}
              />
            </div>
            <div className="div-Area-inline">
              <p>จำนวนท่อนพันธุ์ที่ได้ </p>
              <input
                className="Input-Number-Amount"
                type="number"
                placeholder={0}
                min={0}
                onChange={e => {
                  hadleBlurSeed(e);
                }}
              />
            </div>
          </div>

          {error.numSeed && <div className="error1">{error.massage1}</div>}
          {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
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

  const handlePre = () => {
    if (page === 1) {
    } else {
      setPage(page - 1);
    }
  };

  const handleDelete = async () => {
    setLoadingCST(false);
    const ID_Project = Cookies.get("IdProject");
    const edit = await axios({
      url: "http://localhost:3005/deletePST",
      withCredentials: true,
      method: "POST",
      data: {
        ID_Project,
        ID_Stem,
        ID_Set,
      },
    });
    console.log(edit);
  };

  const handleEdit = async () => {
    setLoadingCST(false);
    const ID_Project = Cookies.get("IdProject");
    const edit = await axios({
      url: "http://localhost:3005/editPST",
      withCredentials: true,
      method: "POST",
      data: {
        ID_Project,
        ID_Stem,
        newDate,
        newID_Rep,
        newCount,
      },
    });
    console.log(edit);
  };
  const showAll = () => {
    if (idSearch === "") {
      return (
        <>
          <div className="div-Table-Center">
            <table id="t01">
              <tr>
                <th>ID ต้นมัน</th>
                <th>PreviousTest</th>
                <th>SproutPlanting_ID</th>
                <th>วันที่ปลูก</th>
                <th>Farm</th>
                <th>Block</th>
                <th>Plot unit</th>
                <th>RepID</th>
                <th>จำนวนต้นที่ปลูก</th>
                <th>Edit</th>
              </tr>
              {dataCST.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.ID_Stem}</td>
                      <td>{data.ID_Previous}</td>
                      <td>{data.ID_SproutPlanting}</td>
                      <td>{data.Date}</td>
                      <td>{data.FarmName}</td>
                      <td>{data.ID_Block}</td>
                      <td>{data.ID_Unit}</td>
                      <td>{data.ID_Rep}</td>
                      <td>{data.Count}</td>
                      <td>
                        <button
                          className="Button-Edit-Table-StepSST"
                          onClick={() => {
                            setID_Stem(data.ID_Stem);
                            setID_Previous(data.ID_Previous);
                            setID_SproutPlanting(data.ID_SproutPlanting);
                            setDate(data.Date);
                            setFarmName(data.FarmName);
                            setID_Block(data.ID_Block);
                            setID_Unit(data.ID_Unit);
                            setID_Rep(data.ID_Rep);
                            setCount(data.Count);
                            setNewDate(data.Date);
                            setNewID_Rep(data.ID_Rep);
                            setNewCount(data.Count);
                            setID_Set(data.ID_Set);
                            setShowEditCST(true);
                          }}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>

                        <button
                          className="Button-Delete-Table-StepSST"
                          onClick={() => {
                            setID_Stem(data.ID_Stem);
                            setID_Previous(data.ID_Previous);
                            setID_SproutPlanting(data.ID_SproutPlanting);
                            setDate(data.Date);
                            setFarmName(data.FarmName);
                            setID_Block(data.ID_Block);
                            setID_Unit(data.ID_Unit);
                            setID_Rep(data.ID_Rep);
                            setCount(data.Count);
                            setID_Set(data.ID_Set);
                            setShowDeleteCST(true);
                          }}
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>

                        <button
                          className="Button-Delete-Table-StepSST"
                          onClick={() => {
                            Cookies.set("PST", data.ID_Stem);
                          }}
                        >
                          <Link
                            className="Link-Underline-Color"
                            to="/growPSTDetail"
                          >
                            เพิ่มข้อมูลการเจริญเติบโต
                          </Link>
                        </button>
                        <button
                          onClick={() => {
                            setID_Stem(data.ID_Stem);
                            setID_Previous(data.ID_Previous);
                            setID_SproutPlanting(data.ID_SproutPlanting);
                            setCount(data.Count);
                            setID_Set(data.ID_Set);
                            setShowSelection(true);
                          }}
                        >
                          เข้าสู่การทำท่อนพันธุ์
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
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
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="div-Table-Center">
            <table id="t01">
              <tr>
                <th>ID ต้นมัน</th>
                <th>PreviousTest</th>
                <th>SproutPlanting_ID</th>
                <th>วันที่ปลูก</th>
                <th>Farm</th>
                <th>Block</th>
                <th>Plot unit</th>
                <th>RepID</th>
                <th>จำนวนต้นที่ปลูก</th>
                <th>Edit</th>
              </tr>
              <tr>
                <td>{ID_Stem}</td>
                <td>{ID_Previous}</td>
                <td>{ID_SproutPlanting}</td>
                <td>{Date}</td>
                <td>{FarmName}</td>
                <td>{ID_Block}</td>
                <td>{ID_Unit}</td>
                <td>{ID_Rep}</td>
                <td>{Count}</td>
                <td>
                  <button
                    className="Button-Edit-Table-StepSST"
                    onClick={() => {
                      setShowEditCST(true);
                    }}
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>

                  <button
                    className="Button-Delete-Table-StepSST"
                    onClick={() => {
                      setShowDeleteCST(true);
                    }}
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                  <button
                    className="Button-Delete-Table-StepSST"
                    onClick={() => {
                      Cookies.set("PST", ID_Stem);
                    }}
                  >
                    <Link className="Link-Underline-Color" to="/growPSTDetail">
                      เพิ่มข้อมูลการเจริญเติบโต
                    </Link>
                  </button>
                  <button
                    onClick={() => {
                      setShowSelection(true);
                    }}
                  >
                    เข้าสู่การทำท่อนพันธุ์
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <Step
        Title="ขั้นตอน CST"
        btnAdd=""
        // btnAdd="เพิ่มข้อมูลขั้นตอน CST"
        handleBtnAdd={() => {}}
        Search={
          <Autocomplete
            id="combo-box-demo"
            options={dataSearch}
            onChange={
              (e, data) => {
                if (data) {
                  setIdSearch(data.ID_Stem);
                  setID_Stem(data.ID_Stem);
                  setID_Previous(data.ID_Previous);
                  setID_SproutPlanting(data.ID_SproutPlanting);
                  setDate(data.Date);
                  setFarmName(data.FarmName);
                  setID_Block(data.ID_Block);
                  setID_Unit(data.ID_Unit);
                  setID_Rep(data.ID_Rep);
                  setCount(data.Count);
                  setNewDate(data.Date);
                  setNewID_Rep(data.ID_Rep);
                  setNewCount(data.Count);
                  setID_Set(data.ID_Set);
                } else {
                  setIdSearch("");
                }
              }
              // value ? setIdSearch(value.ID_Stem) : setChooseID("")
            }
            getOptionLabel={option => option.ID_Stem}
            size="small"
            style={{ width: 300, height: 50 }}
            renderInput={params => (
              <TextField {...params} label="Search" variant="outlined" />
            )}
          />
        }
      >
        {showAll()}
      </Step>

      <ModalDelete
        show={showDeleteCST}
        handleClose={() => {
          setShowDeleteCST(false);
        }}
        handle={handleDelete}
        bu1="ใช่"
        bu2="ไม่"
      >
        <h1 className="P-Delete-Center">คุณต้องการที่จะลบ </h1>
        <br />
        <p className="div-Area-inline">Current trial ID : {ID_Stem}</p>
        <p className="div-Area-inline">Previous trial ID : {ID_Previous}</p>
        <p className="div-Area-inline">Line ID : {ID_SproutPlanting}</p>
        <p className="div-Area-inline">Farm Name :{FarmName}</p>
        <p className="div-Area-inline">Block Name :{ID_Block}</p>
        <p className="div-Area-inline">Plot unit Name :{ID_Unit}</p>
        <p className="div-Area-inline">วันที่ปลูก :{Date}</p>
        <p className="div-Area-inline">RepID :{ID_Rep}</p>
        <p className="div-Area-inline">จำนวนต้นที่ปลูก :{Count}</p>
      </ModalDelete>
      <ModalEdit
        show={showEditCST}
        handleClose={() => {
          setShowEditCST(false);
        }}
        handle={handleEdit}
        bu1="บันทึก"
        bu2="ปิด"
      >
        <h1 className="P-Delete-Center">แก้ไขข้อมูล</h1>
        <div className="div-Area-modal">
          <p className="div-Area-inline">Current trial ID : {ID_Stem}</p>
          <p className="div-Area-inline">Previous trial ID : {ID_Previous}</p>
          <p className="div-Area-inline">Line ID : {ID_SproutPlanting}</p>
          <p className="div-Area-inline">Farm Name : {FarmName}</p>
          <p className="div-Area-inline">Block Name : {ID_Block}</p>
          <p className="div-Area-inline">Plot unit Name : {ID_Unit}</p>
          <div className="div-Area-inline">
            <p>วันที่ปลูก :</p>
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
            <p>RepID :</p>
            <input
              className="Input-border-Mleft"
              type="id"
              value={newID_Rep}
              onChange={e => {
                e ? setNewID_Rep(e.target.value) : setNewID_Rep(ID_Rep);
              }}
            />
          </div>
          <div className="div-Area-inline">
            <p>จำนวนต้นที่ปลูก :</p>
            <input
              className="Input-border-Mleft"
              type="number"
              value={newCount}
              min={0}
              onChange={e => {
                e ? setNewCount(e.target.value) : setNewCount(Count);
              }}
            />
          </div>
        </div>
      </ModalEdit>

      <ModalShowAddSelection
        show={showSelection}
        handleClose={() => {
          setShowSelection(false);
        }}
      />
    </>
  );
}
export default StepCST;
