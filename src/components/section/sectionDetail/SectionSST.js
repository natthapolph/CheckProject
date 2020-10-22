import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Bar from "./bar";
import "./SectionSST.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ModalEdit from "./Modal/ModalEdit";
import ModalDelete from "./Modal/ModalDelete";

function SectionSST() {
  const [ID_Selection, setID_Selection] = useState("");
  const [ID_SST, setID_SST] = useState("");
  const [Date, setDate] = useState("");
  const [Amount, setAmount] = useState("");

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
  // addtoCST
  const [Farm, setFarm] = useState([]);
  const [showAddCST, setShowAddCST] = useState(false);
  //
  useEffect(() => {
    const initSelection = async () => {
      let size = 2;
      const toProID = Cookies.get("IdProject");
      const getAll = await axios({
        url: "http://localhost:3005/getSelectionSST",
        withCredentials: true,
        method: "POST",
        data: { toProID, size, page },
      });
      setSelection(getAll.data.dataSelection);
      setDataSST(getAll.data.dataSST);
      setMaxSize(getAll.data.maxSize);
      setFarm(getAll.data.getFarmInFarm);
      console.log(getAll.data.getFarmInFarm);
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

  const ModalShowAddtoCST = ({ handleClose, show }) => {
    const [chooseID, setChooseID] = useState(ID_SST);
    const [id, setID] = useState(ID_Selection);
    const [addDate, setAddDate] = useState("");
    const [addFarm, setAddFarm] = useState("");
    const [addBlock, setAddBlock] = useState("");
    const [addUnit, setAddUnit] = useState("");
    const [addRepID, setAddRepID] = useState("");
    const [addCount, setAddCount] = useState("");
    const [er, setEr] = useState(false);
    const [error, setError] = useState({
      numSeed: false,

      massage1: "",
    });
    const handleAdd = async () => {
      if (
        addRepID === "" ||
        addCount === "" ||
        addBlock === "" ||
        addDate === "" ||
        addUnit === "" ||
        addFarm === "" ||
        chooseID === ""
      ) {
        setEr(true);
      } else {
        setEr(false);
        setLoadingSectionSST(false);
        console.log(chooseID, ID_SST);
        setShowAddCST(false);

        const toProID = Cookies.get("IdProject");
        const getAll = await axios({
          url: "http://localhost:3005/createCST",
          withCredentials: true,
          method: "POST",
          data: {
            addRepID,
            addCount,
            toProID,
            addBlock,
            addDate,
            addFarm,
            addUnit,
            chooseID,
            id,
          },
        });
        console.log(getAll);
      }
    };
    const hadleBlurSeed = e => {
      const checkAmout = parseInt(Amount, 10);
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
      } else if (Temail > checkAmout) {
        setError({
          numSeed: true,
          massage1: "กรุณาระบุ จำนวนเมล็ด ไม่มากกว่าจำนวนท่อนที่เก็บได้",
        });
      } else {
        setAddCount(e.target.value);
        setError({
          numSeed: false,
        });
      }
    };

    return (
      <div className={show ? "Modal-DetailFarm" : "display-none"}>
        <section className="modal-main-Project">
          <div className="div-Area-modal">
            <h1 className="P-Delete-Center">
              คุณต้องการนำเข้าขั้นตอน CST ของ {ID_SST}
            </h1>
            <br />

            <div className="div-Area-inline">
              <p>วันที่ปลูก :</p>
              <input
                className="Input-border-Mleft"
                type="date"
                onChange={e => {
                  setAddDate(e.target.value);
                }}
              />
            </div>
            <div className="div-Area-inline">
              <p>Farm Name :</p>
              <select
                className="Input-border-Mleft"
                id="Farm"
                onChange={e => {
                  setAddFarm(e.target.value);
                }}
              >
                <option> เลือกฟาร์ม</option>
                {Farm.map(dataF => {
                  console.log(dataF.FarmName);
                  return (
                    <option value={dataF.ID_Farm}>{dataF.FarmName}</option>
                  );
                })}
              </select>
            </div>
            <div className="div-Area-inline">
              <p>Block Name :</p>
              <input
                className="Input-border-Mleft"
                type="text"
                onChange={e => {
                  setAddBlock(e.target.value);
                }}
              />
            </div>
            <div className="div-Area-inline">
              <p>Plot Unit Name :</p>
              <input
                className="Input-border-Mleft"
                type="text"
                onChange={e => {
                  setAddUnit(e.target.value);
                }}
              />
            </div>

            <div className="div-Area-inline">
              <p>Rep ID :</p>
              <input
                className="Input-border-Mleft"
                type="text"
                onChange={e => {
                  setAddRepID(e.target.value);
                }}
              />
            </div>
            <div className="div-Area-inline">
              <p>จำนวนต้นที่ปลูก :</p>
              <input
                className="Input-border-Mleft"
                type="number"
                placeholder={0}
                onChange={e => {
                  hadleBlurSeed(e);
                }}
              />
            </div>
            {error.numSeed && <div className="error1">{error.massage1}</div>}
            {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
          </div>

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

  const ModalShowAddSelection = ({ handleClose, show }) => {
    const [date, setDate] = useState("");
    const [idSST, setIDSST] = useState("");
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
        setError({
          numSeed: false,
        });
      }
    };
    const handleAdd = async () => {
      if (date === "" || idSST === "" || amount === "") {
        setEr(true);
      } else {
        setEr(false);
        setLoadingSectionSST(false);
        setShowAdd(false);
        const ID_Project = Cookies.get("IdProject");
        const add = await axios({
          url: "http://localhost:3005/createSectionSST",
          withCredentials: true,
          method: "POST",
          data: {
            ID_Project,
            date,
            idSST,
            amount,
          },
        });
        console.log(add);
      }
    };
    return (
      <div className={show ? "Modal-DetailFarm" : "display-none"}>
        <section className="modal-main-Project">
          <div className="div-Area-modal">
            <p>เลือกต้นเพื่อที่จะขยายพันธุ์ต่อ</p>
            <div className="div-Area-inline">
              <Autocomplete
                id="combo-box-demo"
                options={dataSST}
                onChange={(e, value) =>
                  value ? setIDSST(value.ID_SST) : setIDSST("")
                }
                getOptionLabel={option => option.ID_SST}
                style={{ width: 400, height: 50 }}
                renderInput={params => (
                  <TextField {...params} label="ID ต้นมัน" variant="outlined" />
                )}
              />
            </div>

            <div className="div-Area-inline">
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
            </div>
            <div className="div-Area-inline">
              <p>จำนวนท่อนพันธุ์ </p>
              <input
                className="Input-Number-Amount"
                type="number"
                onBlur={hadleBlurSeed}
                placeholder={0}
                min={0}
                onChange={e => {
                  e ? setAmount(e.target.value) : setAmount("");
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
  const handleDelete = async () => {
    setLoadingSectionSST(false);
    const ID_Project = Cookies.get("IdProject");
    const edit = await axios({
      url: "http://localhost:3005/deleteSelectionSST",
      withCredentials: true,
      method: "POST",
      data: {
        ID_Project,
        ID_Selection,
      },
    });
    console.log(edit);
  };
  const handleEdit = async () => {
    setLoadingSectionSST(false);
    const ID_Project = Cookies.get("IdProject");
    const edit = await axios({
      url: "http://localhost:3005/editSelectionSST",
      withCredentials: true,
      method: "POST",
      data: {
        ID_Project,
        ID_Selection,
        newAmount,
        newDate,
      },
    });
    console.log(edit);
  };

  return (
    <>
      <div className="Body-SectionSST">
        <Bar />
        <div className="Head-SectionSST">
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
        <div className="div-Table-SectionSST">
          <table id="t01">
            <tr>
              <th>ID SST</th>
              <th>ID ต้นมัน</th>
              <th>วันที่บันทึก</th>
              <th>จำนวนท่อน</th>

              <th>Edit</th>
            </tr>
            <tbody>
              {selection.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.ID_Selection}</td>
                      <td>{data.ID_SST}</td>
                      <td>{data.Date}</td>
                      <td>{data.Amount}</td>

                      <td>
                        <button
                          className="Button-Edit-Table-StepSST"
                          onClick={() => {
                            setID_Selection(data.ID_Selection);
                            setID_SST(data.ID_SST);
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
                            setID_Selection(data.ID_Selection);
                            setID_SST(data.ID_SST);
                            setDate(data.Date);
                            setAmount(data.Amount);
                            setShowDeleteSelectionSST(true);
                          }}
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>

                        <button
                          onClick={() => {
                            setAmount(data.Amount);
                            setID_SST(data.ID_SST);
                            setID_Selection(data.ID_Selection);
                            setShowAddCST(true);
                          }}
                        >
                          นำเข้าขั้นตอน CST
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
          <p className="Head-Edit-modal">แก้ไขข้อมูล</p>
          <p className="div-Area-inline">ID กลุ่มท่อน :{ID_Selection}</p>
          <p className="div-Area-inline">ID SST :{ID_SST}</p>

          <div className="div-Area-inline">
            <p>วันที่บันทึก :</p>
            <input
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
              type="number"
              placeholder={Amount}
              value={newAmount}
              min={0}
              onChange={e => {
                e ? setNewAmount(e.target.value) : setNewAmount(Amount);
              }}
            />
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
          <p className="div-Area-inline">ID กลุ่มท่อน :{ID_Selection}</p>
          <p className="div-Area-inline">ID SST :{ID_SST}</p>

          <p className="div-Area-inline">วันที่บันทึก :{Date}</p>
          <p className="div-Area-inline">จำนวนท่อน :{Amount}</p>
        </ModalDelete>

        <ModalShowAddtoCST
          show={showAddCST}
          handleClose={() => {
            setShowAddCST(false);
          }}
        />
      </div>
    </>
  );
}

export default SectionSST;
