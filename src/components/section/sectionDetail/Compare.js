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
  const [showAddCST, setShowAddCST] = useState(false);
  const [loadingCST, setLoadingCST] = useState(false);
  const [dataCST, setDataCST] = useState([]);
  // addCST
  //   const [IdSelectionSST, setIdSelectionSST] = useState([]);
  const [Farm, setFarm] = useState([]);
  //   const [chooseID, setChooseID] = useState("");
  const [code, setCode] = useState("");
  const [addDate, setAddDate] = useState("");
  const [addFarm, setAddFarm] = useState("");
  const [addBlock, setAddBlock] = useState("");
  const [addUnit, setAddUnit] = useState("");
  const [addRepID, setAddRepID] = useState("");
  const [addCount, setAddCount] = useState("");
  const [variety, setVariety] = useState([]);
  const [chooseVariety, setChooseVariety] = useState("");
  //end addCST
  //Edit-Delete
  const [showEditCST, setShowEditCST] = useState(false);
  const [showDeleteCST, setShowDeleteCST] = useState(false);
  const [code2, setCode2] = useState("");
  const [ID_Breeder, setID_Breeder] = useState("");
  const [Date, setDate] = useState("");
  const [Amount, setAmount] = useState("");
  const [FarmName, setFarmName] = useState("");
  const [ID_Block, setID_Block] = useState("");
  const [ID_Compare, setID_Compare] = useState("");
  const [ID_Unit, setID_Unit] = useState("");
  const [Rep_ID, setRep_ID] = useState("");

  const [newDate, setNewDate] = useState("");

  const [newCount, setNewCount] = useState("");

  //end Edit-Delete
  const [maxSize, setMaxSize] = useState(0);
  const [page, setPage] = useState(1);
  const [idSearch, setIdSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
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
  useEffect(() => {
    const initGrowSST = async () => {
      const toProID = Cookies.get("IdProject");
      const size = 5;
      const getAll = await axios({
        url: "http://localhost:3005/getCompare",
        withCredentials: true,
        method: "POST",
        data: { toProID, size, page },
      });
      //   setIdSelectionSST(getAll.data.search);
      setVariety(getAll.data.getVarieties);
      setFarm(getAll.data.getFarmInFarm);
      setMaxSize(getAll.data.maxSize);
      setDataCST(getAll.data.dataCom);
      setDataSearch(getAll.data.num);
      //setAddFarm(getAll.data.getFarmInFarm[0].ID_Farm);
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
  const handlePre = () => {
    if (page === 1) {
    } else {
      setPage(page - 1);
    }
  };

  const handleAdd = async () => {
    if (
      addRepID === "" ||
      addCount === "" ||
      addBlock === "" ||
      addDate === "" ||
      addUnit === "" ||
      addFarm === "" ||
      chooseVariety === ""
    ) {
      setEr(true);
    } else {
      setLoadingCST(false);

      setShowAddCST(false);
      setEr(false);
      const toProID = Cookies.get("IdProject");
      const getAll = await axios({
        url: "http://localhost:3005/createCompare",
        withCredentials: true,
        method: "POST",
        data: {
          code,
          chooseVariety,
          addRepID,
          addCount,
          toProID,
          addBlock,
          addDate,
          addFarm,
          addUnit,
        },
      });
      console.log(getAll);
    }
  };
  const handleDelete = async () => {
    setLoadingCST(false);
    const ID_Project = Cookies.get("IdProject");
    const edit = await axios({
      url: "http://localhost:3005/deleteCompare",
      withCredentials: true,
      method: "POST",
      data: {
        ID_Project,
        ID_Compare,
      },
    });
    console.log(edit);
  };

  const handleEdit = async () => {
    setLoadingCST(false);
    const ID_Project = Cookies.get("IdProject");
    const edit = await axios({
      url: "http://localhost:3005/editCompare",
      withCredentials: true,
      method: "POST",
      data: {
        ID_Project,
        ID_Compare,
        newDate,
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
                <th>ID คู่เทียบ</th>
                <th>ขั้นตอน</th>
                <th>ชื่อสายพันธุ์การค้า</th>
                <th>Farm</th>
                <th>Block</th>
                <th>Plot unit</th>
                <th>RepID</th>
                <th>วันที่ปลูก</th>
                <th>จำนวนต่อ plot</th>
                <th>Edit</th>
              </tr>
              {dataCST.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.ID_Compare}</td>
                      <td>{data.code}</td>
                      <td>{data.ID_Breeder}</td>
                      <td>{data.FarmName}</td>
                      <td>{data.ID_Block}</td>
                      <td>{data.ID_Unit}</td>
                      <td>{data.Rep_ID}</td>
                      <td>{data.Date}</td>
                      <td>{data.Amount}</td>
                      <td>
                        <button
                          className="Button-Edit-Table-StepSST"
                          onClick={() => {
                            setCode2(data.code);
                            setID_Breeder(data.ID_Breeder);
                            setDate(data.Date);
                            setFarmName(data.FarmName);
                            setID_Block(data.ID_Block);
                            setAmount(data.Amount);
                            setID_Compare(data.ID_Compare);
                            setID_Unit(data.ID_Unit);
                            setRep_ID(data.Rep_ID);
                            setNewDate(data.Date);
                            setNewCount(data.Amount);
                            setShowEditCST(true);
                          }}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>

                        <button
                          className="Button-Delete-Table-StepSST"
                          onClick={() => {
                            setCode2(data.code);
                            setID_Breeder(data.ID_Breeder);
                            setDate(data.Date);
                            setFarmName(data.FarmName);
                            setID_Block(data.ID_Block);
                            setAmount(data.Amount);
                            setID_Compare(data.ID_Compare);
                            setID_Unit(data.ID_Unit);
                            setRep_ID(data.Rep_ID);
                            setNewDate(data.Date);
                            setNewCount(data.Amount);
                            setShowDeleteCST(true);
                          }}
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>

                        <button
                          onClick={() => {
                            Cookies.set("COM", data.ID_Compare);
                          }}
                        >
                          <Link
                            className="Link-Underline-Color"
                            to="/GrowComDetail"
                          >
                            เพิ่มข้อมูลการเจริญเติบโต
                          </Link>
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
                <th>ID คู่เทียบ</th>
                <th>ขั้นตอน</th>
                <th>ชื่อสายพันธุ์การค้า</th>
                <th>Farm</th>
                <th>Block</th>
                <th>Plot unit</th>
                <th>RepID</th>
                <th>วันที่ปลูก</th>
                <th>จำนวนต่อ plot</th>
                <th>Edit</th>
              </tr>
              <tr>
                <td>{ID_Compare}</td>
                <td>{code2}</td>
                <td>{ID_Breeder}</td>
                <td>{FarmName}</td>
                <td>{ID_Block}</td>
                <td>{ID_Unit}</td>
                <td>{Rep_ID}</td>
                <td>{Date}</td>
                <td>{Amount}</td>
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
        Title="คู่เทียบ"
        btnAdd="เพิ่มข้อมูลคู่เทียบ"
        handleBtnAdd={() => {
          setShowAddCST(true);
        }}
        Search={
          <Autocomplete
            id="combo-box-demo"
            options={dataSearch}
            onChange={(e, data) => {
              if (data) {
                setIdSearch(data.ID_Compare);
                setCode2(data.code);
                setID_Breeder(data.ID_Breeder);
                setDate(data.Date);
                setFarmName(data.FarmName);
                setID_Block(data.ID_Block);
                setAmount(data.Amount);
                setID_Compare(data.ID_Compare);
                setID_Unit(data.ID_Unit);
                setRep_ID(data.Rep_ID);
                setNewDate(data.Date);
                setNewCount(data.Amount);
              } else {
                setIdSearch("");
              }
            }}
            getOptionLabel={option => option.ID_Compare}
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
      <ModalAdd
        error={error.numSeed}
        show={showAddCST}
        handleClose={() => {
          setShowAddCST(false);
        }}
        handle={handleAdd}
        bu1="บันทึก"
        bu2="ปิด"
      >
        <div className="div-Area-modal">
          <h1 className="P-Delete-Center">เพิ่มข้อมูลคู่เทียบ</h1>
          <br />
          <p>เป็นคู่เทียบของการปลูกในขั้นตอนไหน</p>

          <div className="div-Area-inline">
            <div className="R-Self">
              <input
                type="radio"
                id="self"
                name="Type"
                value="SST"
                onChange={e => {
                  setCode(e.target.value);
                }}
              />
              <label htmlFor="self"> SST</label>
            </div>

            <div className="R-Self">
              <input
                type="radio"
                id="self"
                name="Type"
                value="CST"
                onChange={e => {
                  setCode(e.target.value);
                }}
              />
              <label htmlFor="self"> CST</label>
            </div>

            <div className="R-Self">
              <input
                type="radio"
                id="self"
                name="Type"
                value="PST"
                onChange={e => {
                  setCode(e.target.value);
                }}
              />
              <label htmlFor="self"> PST</label>
            </div>

            <div className="R-Self">
              <input
                type="radio"
                id="self"
                name="Type"
                value="AST"
                onChange={e => {
                  setCode(e.target.value);
                }}
              />
              <label htmlFor="self"> AST</label>
            </div>

            <div className="R-Self">
              <input
                type="radio"
                id="self"
                name="Type"
                value="RST"
                onChange={e => {
                  setCode(e.target.value);
                }}
              />
              <label htmlFor="self"> RST</label>
            </div>
          </div>

          <div className="div-Area-inline">
            <p> พันธุ์การค้า</p>
            <select
              className="Input-border-Mleft"
              id="M"
              onChange={e => {
                setChooseVariety(e.target.value);
              }}
            >
              <option> เลือกพันธุ์การค้า</option>
              {variety.map(data => {
                return (
                  <>
                    <option value={data.BreederName}>{data.BreederName}</option>
                  </>
                );
              })}
            </select>
          </div>

          <div className="div-Area-inline">
            <p>Farm Name</p>
            <select
              className="Input-border-Mleft"
              id="Farm"
              onChange={e => {
                setAddFarm(e.target.value);
              }}
            >
              <option> เลือกฟาร์ม</option>
              {Farm.map(data => {
                return (
                  <>
                    <option value={data.ID_Farm}>{data.FarmName}</option>
                  </>
                );
              })}
            </select>
          </div>
          <div className="div-Area-inline">
            <p>Block Name</p>
            <input
              className="Input-border-Mleft"
              type="text"
              onChange={e => {
                setAddBlock(e.target.value);
              }}
            />
          </div>
          <div className="div-Area-inline">
            <p>Plot Unit Name</p>
            <input
              className="Input-border-Mleft"
              type="text"
              onChange={e => {
                setAddUnit(e.target.value);
              }}
            />
          </div>

          <div className="div-Area-inline">
            <p>Rep ID </p>
            <input
              className="Input-border-Mleft"
              type="text"
              onChange={e => {
                setAddRepID(e.target.value);
              }}
            />
          </div>
          <div className="div-Area-inline">
            <p>วันที่ปลูก</p>
            <input
              className="Input-border-Mleft"
              type="date"
              onChange={e => {
                setAddDate(e.target.value);
              }}
            />
          </div>
          <div className="div-Area-inline">
            <p>จำนวนต่อ plot </p>
            <input
              className="Input-border-Mleft"
              type="number"
              onBlur={hadleBlurSeed}
              onChange={e => {
                setAddCount(e.target.value);
              }}
            />
          </div>
          {error.numSeed && <div className="error1">{error.massage1}</div>}
          {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
        </div>
      </ModalAdd>
      <ModalDelete
        show={showDeleteCST}
        handleClose={() => {
          setShowDeleteCST(false);
        }}
        handle={handleDelete}
        bu1="ใช่"
        bu2="ไม่"
      >
        <p className="Head-Edit-modal">คุณต้องการที่จะลบ </p>
        <p className="div-Area-inline">ID คู่เทียบ :{ID_Compare}</p>
        <p className="div-Area-inline">ขั้นตอน :{code2}</p>
        <p className="div-Area-inline">ชื่อสายพันธุ์การค้า :{ID_Breeder}</p>
        <p className="div-Area-inline">ฟาร์ม :{FarmName}</p>
        <p className="div-Area-inline">บล็อค :{ID_Block}</p>
        <p className="div-Area-inline">Unit :{ID_Unit}</p>
        <p className="div-Area-inline">RepID :{Rep_ID}</p>
        <p className="div-Area-inline">วันที่ปลูก :{Date}</p>
        <p className="div-Area-inline">จำนวนต่อ plot :{Amount}</p>
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
        <p className="Head-Edit-modal">แก้ไขข้อมูล</p>
        <div className="div-Area-modal">
          <p className="Head-Edit-modal">คุณต้องการที่จะลบ </p>
          <p className="div-Area-inline">ID คู่เทียบ :{ID_Compare}</p>
          <p className="div-Area-inline">ขั้นตอน :{code2}</p>
          <p className="div-Area-inline">ชื่อสายพันธุ์การค้า :{ID_Breeder}</p>
          <p className="div-Area-inline">ฟาร์ม :{FarmName}</p>
          <p className="div-Area-inline">บล็อค :{ID_Block}</p>
          <p className="div-Area-inline">Unit :{ID_Unit}</p>
          <p className="div-Area-inline">RepID :{Rep_ID}</p>
          <div className="div-Area-inline">
            <p>วันที่ปลูก :</p>
            <input
              className="Input-margin-left"
              type="date"
              value={newDate}
              onChange={e => {
                e ? setNewDate(e.target.value) : setNewDate("");
              }}
            />
          </div>

          <div className="div-Area-inline">
            <p>จำนวนต้นที่ปลูก :</p>
            <input
              className="Input-margin-left"
              type="number"
              value={newCount}
              min={0}
              onChange={e => {
                e ? setNewCount(e.target.value) : setNewCount("");
              }}
            />
          </div>
        </div>
      </ModalEdit>
    </>
  );
}
export default StepCST;
