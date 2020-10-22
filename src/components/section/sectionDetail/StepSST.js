import React from "react";
import "./Farm.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Bar from "./bar";
import "./StepSST.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ModalAddto from "./Modal/ModalAddto";
function StepSST() {
  const [idSST, setIdSST] = useState("");
  const [idSeedling, setIdSeedling] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [farmName, setFarmName] = useState("");
  const [block, setBlock] = useState("");
  const [unit, setUnit] = useState("");
  const [ShowDeleteSST, setShowDeleteSST] = useState(false);
  const [ShowEditSST, setShowEditSST] = useState(false);
  const [showAddSST, setShowAddSST] = useState(false);
  const [loading, setLoading3] = useState(false);
  const [farmInProject, setFarmInProject] = useState([]);
  const [sstInProject, setSsstInProject] = useState([]);

  // const [dataSeedling, SetDataSeedling] = useState([]);
  const [maxSize, setMaxSize] = useState(0);
  const [page, setPage] = useState(1);
  const [idSearch, setIdSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [showSelec, setShowSelec] = useState(false);
  const [selec, setSelec] = useState([]);
  const [secSearch, setSecSearch] = useState("0");
  const [searchFarm, setSearchFarm] = useState([]);
  const [searchBlock, setSearchBlock] = useState([]);
  const [searchPlot, setSearchPlot] = useState([]);
  const [farm, setFarm] = useState("");
  const [sblock, setSBlock] = useState("");
  const [plot, setPlot] = useState("");
  const [showAddtoSection, setShowAddtoSection] = useState(false);
  useEffect(() => {
    const initSST = async () => {
      let size = 10;
      const toProID = Cookies.get("IdProject");
      const getAll = await axios({
        url: "http://localhost:3005/getSST",
        withCredentials: true,
        method: "POST",
        data: { toProID, size, page },
      });
      setFarmInProject(getAll.data.getFarmInProject);
      // console.log(getAll.data.getSST);
      setSsstInProject(getAll.data.getSST);
      setMaxSize(getAll.data.maxSize);
      setDataSearch(getAll.data.num);
      // setSearchFarm(getAll.data.Farm);
      // console.log(getAll.data.Farm);
      setLoading3(true);
    };
    initSST();
  }, [page, loading]);

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

  // const ModalShowAddSST = ({ handleClose, show }) => {
  //   const [status, setStatus] = useState("");
  //   const [toFarm, setToFarm] = useState("");
  //   const [toBlock, setToBlock] = useState("");
  //   const [toUnit, setToUnit] = useState("");
  //   const [idSeedling, setIdSeedling] = useState("");
  //   const [dateSST, setDateSST] = useState("");
  //   const [er, setEr] = useState(false);
  //   const handleAddSST = async () => {
  //     if (
  //       status === "" ||
  //       toFarm === "" ||
  //       toBlock === "" ||
  //       toUnit === "" ||
  //       idSeedling === "" ||
  //       dateSST === ""
  //     ) {
  //       setEr(true);
  //     } else {
  //       setLoading3(false);
  //       setShowAddSST(false);
  //       const toProID = Cookies.get("IdProject");
  //       const addSST = await axios({
  //         url: "http://localhost:3005/createSST",
  //         method: "POST",
  //         data: {
  //           toProID,
  //           status,
  //           toFarm,
  //           toBlock,
  //           toUnit,
  //           idSeedling,
  //           dateSST,
  //         },
  //       });
  //       console.log(addSST);
  //     }
  //   };
  //   return (
  //     <div className={show ? "Modal-AddBreeder" : "display-none"}>
  //       <section className="modal-main-Project">
  //         <div className="div-Area-modal">
  //           <div className="div-Area-inline">
  //             <Autocomplete
  //               id="combo-box-demo"
  //               options={dataSeedling}
  //               onChange={(e, value) =>
  //                 value ? setIdSeedling(value.ID_Seedling) : setIdSeedling("")
  //               }
  //               getOptionLabel={(option) => option.ID_Seedling}
  //               style={{ width: 400, height: 100 }}
  //               renderInput={(params) => (
  //                 <TextField
  //                   {...params}
  //                   label="id การเพาะเมล็ด"
  //                   variant="outlined"
  //                 />
  //               )}
  //             />
  //           </div>

  //           <div className="div-Area-inline">
  //             <p> สถานะของต้นกล้า </p>

  //             <input
  //               className="R-Alive"
  //               type="radio"
  //               name="status"
  //               value="รอด"
  //               onChange={(e) => {
  //                 setStatus(e.target.value);
  //               }}
  //             />
  //             <label> รอด</label>

  //             <input
  //               className="R-Dead"
  //               type="radio"
  //               name="status"
  //               value="ตาย"
  //               onChange={(e) => {
  //                 setStatus(e.target.value);
  //               }}
  //             />
  //             <label>ตาย</label>
  //           </div>
  //           <div className="div-Area-inline">
  //             <p> วันที่ย้ายลงแปลง </p>
  //             <input
  //               className="Input-Date-Move-Crop"
  //               type="date"
  //               placeholder
  //               onChange={(e) => {
  //                 setDateSST(e.target.value);
  //               }}
  //             />
  //           </div>

  //           <div className="div-Area-inline">
  //             <p> ฟาร์มที่ปลูกต้นกล้า</p>

  //             <select
  //               className="Option-Select-ID-Seed-Croped"
  //               id="farm"
  //               onChange={(e) => {
  //                 setToFarm(e.target.value);
  //               }}
  //             >
  //               <option> เลือก ฟาร์ม</option>
  //               {farmInProject.map((data) => {
  //                 return (
  //                   <>
  //                     <option value={data.ID_Farm}>{data.FarmName}</option>
  //                   </>
  //                 );
  //               })}
  //             </select>
  //           </div>

  //           <div className="div-Area-inline">
  //             <p> Block ที่ปลูก</p>
  //             <input
  //               className="Blog-Crop"
  //               type="text"
  //               onChange={(e) => {
  //                 setToBlock(e.target.value);
  //               }}
  //             />
  //           </div>

  //           <div className="div-Area-inline">
  //             <p> Unit ที่ปลูก</p>
  //             <input
  //               className="Unit-Crop"
  //               type="text"
  //               onChange={(e) => {
  //                 setToUnit(e.target.value);
  //               }}
  //             />
  //           </div>
  //         </div>

  //         {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
  //         <button
  //           className="Button-Add-modal-StepSST"
  //           onClick={() => {
  //             handleAddSST();
  //           }}
  //         >
  //           Add
  //         </button>
  //         <button className="Button-close-modal-StepSST" onClick={handleClose}>
  //           Close
  //         </button>
  //       </section>
  //     </div>
  //   );
  // };

  const ModalShowDeleteSST = ({ handleClose, show }) => {
    const handleDelete = async () => {
      setLoading3(false);
      const ProID = Cookies.get("IdProject");
      const get = await axios({
        url: "http://localhost:3005/deleteSST",
        withCredentials: true,
        method: "POST",
        data: { ProID, idSST },
      });
      console.log(get);
    };
    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <h1 className="P-Delete-Center">คุณต้องการที่จะลบ ใช่หรือไม่ </h1>
            <br />
            <div className="div-Area-modal">
              <p className="div-Area-inline">ID SST : {idSST}</p>
              <p className="div-Area-inline">ID การเพาะเมล็ด : {idSeedling}</p>
              <p className="div-Area-inline">พ่อพันธุ์ : {father}</p>
              <p className="div-Area-inline">แม่พันธุ์ : {mother}</p>
              <p className="div-Area-inline">สถานะ : {status}</p>
              <p className="div-Area-inline">วันที่เพาะปลูกต้นกล้า : {date}</p>
              <p className="div-Area-inline">Farm : {farmName}</p>
              <p className="div-Area-inline">Block : {block}</p>
              <p className="div-Area-inline">Plot unit : {unit}</p>
            </div>

            <div className="div-Area-Button-Breeding-Confirm">
              <button
                className="Button-Yes-modal-Breeding-confirm"
                onClick={() => {
                  handleDelete();
                  handleClose();
                }}
              >
                ใช่
              </button>
              <button
                className="Button-No-modal-Breeding-confirm"
                onClick={handleClose}
              >
                ไม่
              </button>
            </div>
          </section>
        </div>
      </>
    );
  };
  const ModalAddSST = ({ handleClose, show }) => {
    const [farm, setFarm] = useState("");
    const [date, setDate] = useState("");
    const [block, setBlock] = useState("");
    const [plot, setPlot] = useState("");
    const [status2, setStatus2] = useState("");
    const [er, setEr] = useState(false);
    const handleDelete = async () => {
      if (
        farm === "" ||
        status2 === "" ||
        date === "" ||
        block === "" ||
        plot === ""
      ) {
        setEr(true);
      } else {
        setLoading3(false);
        setShowAddSST(false);
        setShowSelec(false);
        //Mark point
        const ProID = Cookies.get("IdProject");
        const get = await axios({
          url: "http://localhost:3005/AddGroupSST",
          withCredentials: true,
          method: "POST",
          data: { ProID, selec, farm, status2, date, block, plot },
        });
        console.log(get);
      }
    };
    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <div className="div-Area-Button-Breeding-Confirm">
              <p>วันที่ปลูก</p>{" "}
              <input
                type="date"
                onChange={e => {
                  e ? setDate(e.target.value) : setDate("");
                }}
              />
              <div className="div-Area-inline">
                <p> ฟาร์มที่ปลูกต้นกล้า</p>
                <select
                  className="Option-Select-ID-Seed-Croped"
                  id="farm"
                  onChange={e => {
                    setFarm(e.target.value);
                  }}
                >
                  <option> เลือก ฟาร์ม</option>
                  {farmInProject.map(data => {
                    return (
                      <>
                        <option value={data.ID_Farm}>{data.FarmName}</option>
                      </>
                    );
                  })}
                </select>
              </div>
              <p>Block</p>
              <input
                type="text"
                onChange={e => {
                  e ? setBlock(e.target.value) : setBlock("");
                }}
              />
              <p>Plot unit</p>
              <input
                type="text"
                onChange={e => {
                  e ? setPlot(e.target.value) : setPlot("");
                }}
              />
              <label>สถานะ</label>
              <div className="div-Area-inline">
                <div className="R-Alive">
                  <input
                    type="radio"
                    name="status"
                    value="รอด"
                    onChange={e => {
                      setStatus2(e.target.value);
                    }}
                  />
                  <label htmlFor="">รอด</label>
                </div>
                <div className="R-Dead">
                  <input
                    type="radio"
                    name="status"
                    value="ตาย"
                    onChange={e => {
                      setStatus2(e.target.value);
                    }}
                  />
                  <label htmlFor="">ตาย</label>
                </div>
              </div>
              {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
              <button
                className="Button-Yes-modal-Breeding-confirm"
                onClick={() => {
                  handleDelete();
                }}
              >
                เพิ่มข้อมูล
              </button>
              <button
                className="Button-No-modal-Breeding-confirm"
                onClick={handleClose}
              >
                ปิด
              </button>
            </div>
          </section>
        </div>
      </>
    );
  };
  const ModalShowEditSST = ({ handleClose, show }) => {
    const [status2, setStatus2] = useState(status);
    const [date2, setDate2] = useState(date);
    const [farm, setFarm] = useState("");
    const [block, setBlock] = useState("");
    const [plot, setPlot] = useState("");
    const [er, setEr] = useState("");
    const handleEdit = async () => {
      if (
        status2 === "" ||
        date2 === "" ||
        farm === "" ||
        block === "" ||
        plot === ""
      ) {
        setEr(true);
      } else {
        setEr(false);
        setShowEditSST(false);
        setLoading3(false);
        const ProID = Cookies.get("IdProject");
        const get = await axios({
          url: "http://localhost:3005/EditSST",
          withCredentials: true,
          method: "POST",
          data: { ProID, idSST, status2, date2, farm, block, plot },
        });
        console.log(get);
      }
    };
    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <h1 className="P-Delete-Center">แก้ไขข้อมูล</h1>
            <div>
              <br />
              <p className="div-Area-inline">ID SST : {idSST}</p>
              <p className="div-Area-inline">ID การเพาะเมล็ด : {idSeedling}</p>
              <p className="div-Area-inline">พ่อพันธุ์ : {father}</p>
              <p className="div-Area-inline">แม่พันธุ์ : {mother}</p>
              <br />
              <div className="div-Area-inline">
                <p> ฟาร์มที่ปลูกต้นกล้า</p>
                <select
                  className="Option-Select-ID-Seed-Croped"
                  id="farm"
                  onChange={e => {
                    setFarm(e.target.value);
                  }}
                >
                  <option> เลือก ฟาร์ม</option>
                  {farmInProject.map(data => {
                    return (
                      <>
                        <option value={data.ID_Farm}>{data.FarmName}</option>
                      </>
                    );
                  })}
                </select>
              </div>

              <div className="div-Area-inline">
                <p>Block Name:</p>
                <input
                  className="Option-Select-ID-Seed-Croped"
                  type="text"
                  onChange={e => {
                    e ? setBlock(e.target.value) : setBlock("");
                  }}
                />
              </div>
              <div className="div-Area-inline">
                <p>Plot :</p>
                <input
                  className="Option-Select-ID-Seed-Croped"
                  type="text"
                  onChange={e => {
                    e ? setPlot(e.target.value) : setPlot("");
                  }}
                />
              </div>

              <label>สถานะ</label>
              <div className="div-Area-inline">
                <div className="R-Alive">
                  <input
                    type="radio"
                    name="status"
                    value="รอด"
                    onChange={e => {
                      setStatus2(e.target.value);
                    }}
                  />
                  <label htmlFor="">รอด</label>
                </div>
                <div className="R-Dead">
                  <input
                    type="radio"
                    name="status"
                    value="ตาย"
                    onChange={e => {
                      setStatus2(e.target.value);
                    }}
                  />
                  <label htmlFor="">ตาย</label>
                </div>
              </div>
              <div className="div-Area-inline">
                <p>วันที่เพาะปลูกต้นกล้า</p>
                <input
                  className="Input-Date-Seedling"
                  type="date"
                  value={date2}
                  onChange={e => {
                    setDate2(e.target.value);
                  }}
                />
              </div>
            </div>

            {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
            <div className="div-Area-Button-Breeding-Confirm">
              <button
                className="Button-Yes-modal-Breeding-confirm"
                onClick={() => {
                  handleEdit();
                }}
              >
                บันทึก
              </button>
              <button
                className="Button-No-modal-Breeding-confirm"
                onClick={handleClose}
              >
                ปิด
              </button>
            </div>
          </section>
        </div>
      </>
    );
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
        setLoading3(false);
        setShowAddtoSection(false);
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
            <p>ต้นมันที่จะนำมาทำท่อนพันธุ์ {idSST}</p>

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
              <p>จำนวนท่อนพันธุ์ที่ได้ </p>
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

  // const [checklist, setChecklist] = useState(false);
  const checkList = () => {
    var checklist = false;
    for (let index = 0; index < sstInProject.length; index++) {
      if (
        sstInProject[index].DateSST === "" &&
        sstInProject[index].FarmName === "" &&
        sstInProject[index].ID_Block === "" &&
        sstInProject[index].ID_Unit === ""
      ) {
        checklist = true;
        // console.log(664, checklist);
      } else {
        // console.log(666, checklist);
      }
    }

    console.log(checklist);
    if (checklist === true) {
      setShowSelec(true);
    } else {
      setShowSelec(false);
      alert("ไม่พบข้อมูล ที่สามารถเพิ่มได้");
    }
  };
  const showAll = () => {
    if (secSearch === "0") {
      if (idSearch === "") {
        return (
          <>
            <div className="div-Table-Step-SST">
              <div className="div-Area-Button-Choose">
                <button
                  className="Button-Choose-in-Table"
                  onClick={() => {
                    checkList();
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
                  <th>Farm</th>
                  <th>Block</th>
                  <th>Plot unit</th>
                  <th>Edit</th>
                </tr>
                {sstInProject.map(data => {
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
                        <td>
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
                            <Link
                              className="Link-Underline-Color"
                              to="/growSSTDetail"
                            >
                              เพิ่มข้อมูลการเจริญเติบโต
                            </Link>
                          </button>
                          <button
                            className="Button-Input-Grow"
                            onClick={() => {
                              setShowAddtoSection(true);
                              setIdSST(data.ID_SST);
                            }}
                          >
                            นำเข้าสู่การทำท่อนพันธุ์
                          </button>
                        </td>
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
      } else {
        return (
          <>
            <div className="div-Table-AddSeeding">
              <table id="t01">
                <tr>
                  <th>ID ต้นมัน</th>
                  <th>ID การเพาะเมล็ด</th>
                  <th>พ่อพันธุ์</th>
                  <th>แม่พันธุ์</th>
                  <th>สถานะ</th>
                  <th>วันที่ปลูก</th>
                  <th>Farm</th>
                  <th>Block</th>
                  <th>Plot unit</th>
                  <th>Edit</th>
                </tr>
                <>
                  <tr>
                    <td>{idSST}</td>
                    <td>{idSeedling}</td>
                    <td>{father}</td>
                    <td>{mother}</td>
                    <td>{status}</td>
                    <td>{date}</td>
                    <td>{farmName}</td>
                    <td>{block}</td>
                    <td>{unit}</td>
                    <td>
                      <button
                        className="Button-Edit-Table-AddSeeding"
                        onClick={() => {
                          setShowEditSST(true);
                        }}
                      >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>

                      <button
                        className="Button-Delete-Table-AddSeeding"
                        onClick={() => {
                          setShowDeleteSST(true);
                        }}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>

                      <button
                        onClick={() => {
                          Cookies.set("SST", idSST);
                        }}
                      >
                        <Link
                          className="Link-Underline-Color"
                          to="/growSSTDetail"
                        >
                          เพิ่มข้อมูลการเจริญเติบโต
                        </Link>
                      </button>
                      <button
                        className="Button-Input-Grow"
                        onClick={() => {
                          setShowAddtoSection(true);
                          // setIdSST(data.ID_SST);
                        }}
                      >
                        นำเข้าสู่การทำท่อนพันธุ์
                      </button>
                    </td>
                  </tr>
                </>
              </table>
            </div>
          </>
        );
      }
    } else if (secSearch === "1") {
      return (
        <>
          <div className="div-Table-Step-SST">
            <div className="div-Area-Button-Choose">
              {/* <button
                className="Button-Choose-in-Table"
                onClick={() => {
                  setShowSelec(true);
                }}
              >
                เลือก
              </button> */}
            </div>

            <table id="t01">
              <tr>
                <th>ID ต้นมัน</th>
                <th>ID การเพาะเมล็ด</th>
                <th>พ่อพันธุ์</th>
                <th>แม่พันธุ์</th>
                <th>สถานะ</th>
                <th>วันที่ปลูก</th>
                <th>Farm</th>
                <th>Block</th>
                <th>Plot unit</th>
                <th>Edit</th>
              </tr>
              {searchFarm.map(data => {
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
                      <td>
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
                          <Link
                            className="Link-Underline-Color"
                            to="/growSSTDetail"
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
    } else if (secSearch === "2") {
      return (
        <>
          <div className="div-Table-Step-SST">
            <div className="div-Area-Button-Choose">
              {/* <button
                className="Button-Choose-in-Table"
                onClick={() => {
                  setShowSelec(true);
                }}
              >
                เลือก
              </button> */}
            </div>

            <table id="t01">
              <tr>
                <th>ID ต้นมัน</th>
                <th>ID การเพาะเมล็ด</th>
                <th>พ่อพันธุ์</th>
                <th>แม่พันธุ์</th>
                <th>สถานะ</th>
                <th>วันที่ปลูก</th>
                <th>Farm</th>
                <th>Block</th>
                <th>Plot unit</th>
                <th>Edit</th>
              </tr>
              {searchBlock.map(data => {
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
                      <td>
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
                          <Link
                            className="Link-Underline-Color"
                            to="/growSSTDetail"
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
    } else if (secSearch === "3") {
      return (
        <>
          <div className="div-Table-Step-SST">
            <div className="div-Area-Button-Choose">
              {/* <button
                className="Button-Choose-in-Table"
                onClick={() => {
                  setShowSelec(true);
                }}
              >
                เลือก
              </button> */}
            </div>

            <table id="t01">
              <tr>
                <th>ID ต้นมัน</th>
                <th>ID การเพาะเมล็ด</th>
                <th>พ่อพันธุ์</th>
                <th>แม่พันธุ์</th>
                <th>สถานะ</th>
                <th>วันที่ปลูก</th>
                <th>Farm</th>
                <th>Block</th>
                <th>Plot unit</th>
                <th>Edit</th>
              </tr>
              {searchPlot.map(data => {
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
                      <td>
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
                          <Link
                            className="Link-Underline-Color"
                            to="/growSSTDetail"
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
  };
  const clear = () => {
    setSelec([]);

    setShowSelec(false);
  };
  const [er, setEr] = useState(false);
  const save = () => {
    if (parseInt(selec.length) === 0) {
      setEr(true);
    } else {
      setEr(false);
      setShowAddSST(true);
    }
  };
  const checked1 = e => {
    if (e.target.checked === true) {
      selec.push({ ID_SST: e.target.value });
      setSelec(selec);
    } else {
      setSelec(
        selec.filter(item => {
          return item.ID_SST !== e.target.value;
        })
      );
    }
  };
  const showS = () => {
    return (
      <>
        {sstInProject.map(data => {
          if (data.DateSST === "") {
            return (
              <>
                <div className="div-Table-Step-SST">
                  <table id="t01">
                    <tr>
                      <th>เลือก</th>
                      <th>ID ต้นมัน</th>
                      <th>ID การเพาะเมล็ด</th>
                      <th>พ่อพันธุ์</th>
                      <th>แม่พันธุ์</th>
                      <th>สถานะ</th>
                      <th>วันที่ปลูก</th>
                      <th>Farm</th>
                      <th>Block</th>
                      <th>Plot unit</th>
                    </tr>
                    {sstInProject.map(data => {
                      if (data.DateSST === "") {
                        return (
                          <>
                            {/* Mark */}
                            <tr>
                              <td>
                                <input
                                  type="checkbox"
                                  value={data.ID_SST}
                                  onChange={e => {
                                    checked1(e);
                                  }}
                                />
                              </td>

                              <td>{data.ID_SST}</td>
                              <td>{data.ID_Seedling}</td>
                              <td>{data.ID_Father}</td>
                              <td>{data.ID_Mother}</td>
                              <td>{data.Status_SST}</td>
                              <td>{data.DateSST}</td>
                              <td>{data.FarmName}</td>
                              <td>{data.ID_Block}</td>
                              <td>{data.ID_Unit}</td>
                            </tr>
                          </>
                        );
                      }
                    })}
                  </table>
                  <div className="div-Area-Button-AddData-Close-StepSST">
                    <button
                      className="Button-Add-Data-StepSST"
                      onClick={() => {
                        save();
                      }}
                    >
                      เพิ่มข้อมูล
                    </button>
                    <button
                      className="Button-Close-StepSST"
                      onClick={() => {
                        clear();
                      }}
                    >
                      ปิด
                    </button>
                  </div>
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
                {er && <div className="error1">กรุณาเลือกข้อมูลที่ต้องการ</div>}
              </>
            );
          }
        })}
      </>
    );
  };

  // const searchFarmXX = async () => {
  //   let size = 10;
  //   const toProID = Cookies.get("IdProject");
  //   const getAll = await axios({
  //     url: "http://localhost:3005/SearchFarmSST",
  //     withCredentials: true,
  //     method: "POST",
  //     data: { toProID, size, page, farm },
  //   });
  //   console.log(getAll.data.Farm);
  //   setSearchFarm(getAll.data.Farm);
  // };
  // const searchBlockXX = async () => {
  //   let size = 10;
  //   const toProID = Cookies.get("IdProject");
  //   const getAll = await axios({
  //     url: "http://localhost:3005/SearchBlockSST",
  //     withCredentials: true,
  //     method: "POST",
  //     data: { toProID, size, page, sblock },
  //   });
  //   console.log(getAll.data.Farm);
  //   setSearchBlock(getAll.data.Farm);
  // };

  // const searchPlotXX = async () => {
  //   let size = 10;
  //   const toProID = Cookies.get("IdProject");
  //   const getAll = await axios({
  //     url: "http://localhost:3005/SearchPlotSST",
  //     withCredentials: true,
  //     method: "POST",
  //     data: { toProID, size, page, plot },
  //   });
  //   console.log(getAll.data.Farm);
  //   setSearchPlot(getAll.data.Farm);
  // };
  const showAutocomplete = () => {
    if (secSearch === "0") {
      return (
        <>
          <div class="div-Area-Search">
            <Autocomplete
              id="combo-box-demo"
              options={dataSearch}
              onChange={(e, value) => {
                if (value) {
                  setIdSearch(value.ID_SST);
                  setIdSST(value.ID_SST);
                  setIdSeedling(value.ID_Seedling);
                  setFather(value.ID_Father);
                  setMother(value.ID_Mother);
                  setStatus(value.Status_SST);
                  setDate(value.DateSST);
                  setFarmName(value.FarmName);
                  setBlock(value.ID_Block);
                  setUnit(value.ID_Unit);
                } else {
                  setIdSearch("");
                }
              }}
              getOptionLabel={option => option.ID_SST}
              size="small"
              style={{ width: 300, height: 50 }}
              renderInput={params => (
                <TextField {...params} label="Search" variant="outlined" />
              )}
            />
          </div>
        </>
      );
    } else if (secSearch === "1") {
      return (
        <>
          <div class="div-Area-Search">
            <Autocomplete
              id="combo-box-demo"
              options={farmInProject}
              onChange={(e, value) => {
                value ? setFarm(value.ID_Farm) : setFarm("");
              }}
              getOptionLabel={option => option.FarmName}
              size="small"
              style={{ width: 300, height: 50 }}
              renderInput={params => (
                <TextField {...params} label="Search" variant="outlined" />
              )}
            />
          </div>
          {/* 
          <button
            onClick={() => {
              setPage(1);
              searchFarmXX();
              // setLoading3(false);
            }}
          >
            search
          </button> */}
        </>
      );
    } else if (secSearch === "2") {
      return (
        <>
          <div class="div-Area-Search">
            <Autocomplete
              id="combo-box-demo"
              options={dataSearch}
              onChange={(e, value) => {
                value ? setSBlock(value.ID_Block) : setSBlock("");
              }}
              getOptionLabel={option => option.ID_Block}
              size="small"
              style={{ width: 300, height: 50 }}
              renderInput={params => (
                <TextField {...params} label="Search" variant="outlined" />
              )}
            />
          </div>
          {/* <button
            onClick={() => {
              setPage(1);
              searchBlockXX();
              // setLoading3(false);
            }}
          >
            search
          </button> */}
        </>
      );
    } else if (secSearch === "3") {
      return (
        <>
          <div class="div-Area-Search">
            <Autocomplete
              id="combo-box-demo"
              options={dataSearch}
              onChange={(e, value) => {
                value ? setPlot(value.ID_Unit) : setPlot("");
              }}
              getOptionLabel={option => option.ID_Unit}
              size="small"
              style={{ width: 300, height: 50 }}
              renderInput={params => (
                <TextField {...params} label="Search" variant="outlined" />
              )}
            />
          </div>
          {/* <button
            onClick={() => {
              setPage(1);
              searchPlotXX();
              // setLoading3(false);
            }}
          >
            search
          </button> */}
        </>
      );
    }
  };

  return (
    <>
      <div className="Body-StepSST">
        <Bar />
        <div className="Head-StepSST">
          <div className="div-Head-Left-Side">
            <p> ขั้นตอน Seeding Selection Trial</p>
          </div>
          <div className="div-Head-Right-Side">
            {/* <select
              id="search"
              onChange={e => {
                e ? setSecSearch(e.target.value) : setIdSearch(0);
              }}
            >
              <option value={0}>Search ID ต้นมัน</option>
              <option value={1}>Search Farm</option>
              <option value={2}>Search Block</option>
              <option value={3}>Search Plot</option>
            </select> */}
          </div>
          {showAutocomplete()}
        </div>
        {/* <button
          onClick={() => {
            setShowSelec(true);
          }}
        >
          เลือก
        </button> */}
        {!showSelec ? showAll() : showS()}
      </div>
      <ModalAddSST
        show={showAddSST}
        handleClose={() => {
          setShowAddSST(false);
        }}
      />
      <ModalShowDeleteSST
        show={ShowDeleteSST}
        handleClose={() => {
          setShowDeleteSST(false);
        }}
      />
      <showS
        show={showSelec}
        handleClose={() => {
          setShowSelec(false);
        }}
      />
      <ModalShowEditSST
        show={ShowEditSST}
        handleClose={() => {
          setShowEditSST(false);
        }}
      />
      <ModalShowAddSelection
        show={showAddtoSection}
        handleClose={() => {
          setShowAddtoSection(false);
        }}
      />
    </>
  );
}
export default StepSST;
