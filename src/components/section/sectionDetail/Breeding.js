import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Breeding.css";
import Bar from "./bar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ModalAddto from "./Modal/ModalAddto";
function Breeding() {
  const [showAddBreeding, setShowAddBreeding] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [id_Breeding, setId_Breeding] = useState("");
  const [id_F, setId_F] = useState("");
  const [id_M, setId_M] = useState("");
  const [dateB, setDateB] = useState("");
  const [type, setType] = useState("");
  const [self, setSelf] = useState("");
  const [flow, setFlow] = useState("");
  const [breeding, setBreeeding] = useState([]);
  const [loading2, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxSize, setMaxSize] = useState("");
  const [idSearch, setIdSearch] = useState("");
  const [br, setBr] = useState([]);
  const [dataSST, setDataSST] = useState([]);
  const [showSent, setShowSent] = useState(false);
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

  useEffect(() => {
    const init = async () => {
      const ProID = Cookies.get("IdProject");
      const size = 5;
      const get = await axios({
        url: "http://localhost:3005/getBreeding",
        withCredentials: true,
        method: "POST",
        data: { ProID, size, page },
      });
      setBreeeding(get.data.getBreeding);
      setMaxSize(get.data.maxSize);
      setBr(get.data.num);
      setDataSST(get.data.dataSST);
    };
    init();
    setLoading(true);
  }, [page, loading2]);

  const ModalShowAddBreeding = ({ handleClose, show }) => {
    const [Fchoose, setFChoose] = useState("");
    const [FBreeder, setFBreeder] = useState("");
    const [Mchoose, setMChoose] = useState("");
    const [MBreeder, setMBreeder] = useState("");
    const [BreedingDate, setBreedingDate] = useState();
    const [BreedingType, setBreedingType] = useState("");
    const [flower, setFlower] = useState("");
    const [chooseFarm, setChooseFarm] = useState("");
    const [selfNum, setSelfNum] = useState("");
    const [farm, setFarm] = useState([]);
    const [variety, setVariety] = useState([]);
    const [er, setEr] = useState(false);
    const [error, setError] = useState({
      flower: false,
      selfNum: false,

      massage1: "",
      massage2: "",
    });
    const hadleBlurFlower = e => {
      const Temail = e.target.value;
      if (Temail < 1) {
        setError({
          flower: true,
          massage1: "จำนวนดอกไม้ต้องมากกว่า 0",
        });
      } else if (!Temail) {
        setError({
          flower: true,
          massage1: "กรุณาระบุ จำนวนของดอกไม้",
        });
      } else {
        setError({
          flower: false,
        });
      }
    };
    const hadleBlurSelf = e => {
      const Temail = e.target.value;
      if (Temail < 1) {
        setError({
          selfNum: true,
          massage2: "จำนวนครั้งของ Self ต้องมากกว่า 0",
        });
      } else if (!Temail) {
        setError({
          selfNum: true,
          massage2: "กรุณาระบุ จำนวนครั้งของ Self",
        });
      } else {
        setError({
          selfNum: false,
        });
      }
    };
    useEffect(() => {
      const todo = async () => {
        const ProID = Cookies.get("IdProject");
        const get = await axios({
          url: "http://localhost:3005/getFarminProject",
          withCredentials: true,
          method: "POST",
          data: { ProID },
        });
        setVariety(get.data.getVarieties);
        setFarm(get.data.getFarmInFarm);
      };
      todo();
    }, []);

    const showChoiceF = () => {
      if (Fchoose === "") {
      } else {
        if (Fchoose === "yes") {
          return (
            <>
              {/* <label for="F">เลือกพ่อพันธุ์</label> */}

              <select
                className="Input-border"
                id="F"
                onChange={e => {
                  setFBreeder(e.target.value);
                }}
              >
                <option> เลือกพ่อพันธุ์</option>
                {variety.map(data => {
                  return (
                    <>
                      <option value={data.BreederName}>
                        {data.BreederName}
                      </option>
                    </>
                  );
                })}
              </select>
            </>
          );
        } else
          return (
            <>
              <select
                className="Input-border"
                id="F"
                onChange={e => {
                  setFBreeder(e.target.value);
                }}
              >
                <option> เลือกพ่อพันธุ์</option>
                {dataSST.map(data => {
                  return (
                    <>
                      <option value={data.ID_SST}>{data.ID_SST}</option>
                    </>
                  );
                })}
              </select>
            </>
          );
      }
    };
    const showChoiceM = () => {
      if (Mchoose === "") {
      } else {
        if (Mchoose === "yes") {
          return (
            <>
              {/* <label for="M">เลือกแม่พันธุ์</label> */}

              <select
                className="Input-border"
                id="M"
                onChange={e => {
                  setMBreeder(e.target.value);
                }}
              >
                <option> เลือกแม่พันธุ์</option>
                {variety.map(data => {
                  return (
                    <>
                      <option value={data.BreederName}>
                        {data.BreederName}
                      </option>
                    </>
                  );
                })}
              </select>
            </>
          );
        } else
          return (
            <>
              <select
                className="Input-border"
                id="M"
                onChange={e => {
                  setMBreeder(e.target.value);
                }}
              >
                <option> เลือกแม่พันธุ์</option>
                {dataSST.map(data => {
                  return (
                    <>
                      <option value={data.ID_SST}>{data.ID_SST}</option>
                    </>
                  );
                })}
              </select>
            </>
          );
      }
    };
    const showSelf = () => {
      if (BreedingType === "self") {
        return (
          <>
            <div className="div-Area-inline">
              <p>self ชั่วที่</p>
              <input
                className="Inputbox-Self"
                type="number"
                onBlur={hadleBlurSelf}
                onChange={e => {
                  setSelfNum(e.target.value);
                }}
              />
            </div>
            {error.selfNum && <div className="error1">{error.massage2}</div>}
          </>
        );
      }
    };
    const showFarm = () => {
      return (
        <>
          <select
            className="Option-FarmName"
            id="Farm"
            onChange={e => {
              setChooseFarm(e.target.value);
            }}
          >
            <option> เลือกฟาร์ม</option>
            {farm.map(data => {
              return (
                <>
                  <option value={data.ID_Farm}>{data.FarmName}</option>
                </>
              );
            })}
          </select>
        </>
      );
    };
    const handleSave = async () => {
      if (
        FBreeder === "" ||
        MBreeder === "" ||
        BreedingDate === "" ||
        BreedingType === "" ||
        farm === "" ||
        variety === ""
      ) {
        setEr(true);
      } else if (BreedingType === "self" && selfNum === "") {
        setEr(true);
      } else {
        setEr(false);
        setLoading(false);
        setShowAddBreeding(false);
        const ProID = Cookies.get("IdProject");
        const get = await axios({
          url: "http://localhost:3005/AddBreeding",
          withCredentials: true,
          method: "POST",
          data: {
            ProID,
            FBreeder,
            MBreeder,
            chooseFarm,
            BreedingDate,
            BreedingType,
            selfNum,
            flower,
          },
        });
        console.log(get);
      }
    };

    const showR_Self = () => {
      if (FBreeder === "" || MBreeder === "") {
        return <>{/* <p>Noooo</p> */}</>;
      } else {
        if (FBreeder === MBreeder) {
          return (
            <>
              <div className="R-Self">
                <input
                  type="radio"
                  id="self"
                  name="Type"
                  value="self"
                  onChange={e => {
                    setBreedingType(e.target.value);
                  }}
                />
                <label htmlFor="self"> Self</label>
              </div>
              <div className="R-Cross">
                <input
                  type="radio"
                  id="cross"
                  name="Type"
                  value="cross"
                  onChange={e => {
                    setBreedingType(e.target.value);
                  }}
                />
                <label htmlFor="cross"> Cross</label>
              </div>
              <div className="R-Top">
                <input
                  type="radio"
                  id="top"
                  name="Type"
                  value="Sib"
                  onChange={e => {
                    setBreedingType(e.target.value);
                  }}
                />
                <label htmlFor="top"> Sib</label>
              </div>
            </>
          );
        } else {
          return (
            <>
              <div className="R-Cross">
                <input
                  type="radio"
                  id="cross"
                  name="Type"
                  value="cross"
                  onChange={e => {
                    setBreedingType(e.target.value);
                  }}
                />
                <label htmlFor="cross"> Cross</label>
              </div>
              <div className="R-Top">
                <input
                  type="radio"
                  id="top"
                  name="Type"
                  value="Sib"
                  onChange={e => {
                    setBreedingType(e.target.value);
                  }}
                />
                <label htmlFor="top"> Sib</label>
              </div>
            </>
          );
        }
      }
    };

    return (
      <div className={show ? "Modal-AddBreeder" : "display-none"}>
        <section className="modal-main-Project">
          <p className="Form-LefiSide-P">
            แม่พันธุ์เป็นพันธุ์ที่มีอยู่แล้ว ใช่หรือไม่
          </p>
          <div className="Area-Choice">
            <div className="div-Area-Yes-Radio">
              <input
                className="Input-Yes-Radio-Breeding"
                type="radio"
                id="yes"
                name="gender"
                value="yes"
                onChange={e => {
                  setMChoose(e.target.value);
                }}
              />
              <p className="P-Yes-Radio-Breeding">yes</p>
            </div>

            <div className="div-Area-No-Radio">
              <input
                className="Input-No-Radio-Breeding"
                type="radio"
                id="n2"
                name="gender"
                value="no"
                onChange={e => {
                  setMChoose(e.target.value);
                }}
              />
              <p className="P-No-Radio-Breeding">no</p>
            </div>
            <div className="div-Show">{showChoiceM()}</div>
          </div>

          <p className="Form-LefiSide-P">
            พ่อพันธุ์เป็นพันธุ์ที่มีอยู่แล้ว ใช่หรือไม่
          </p>
          <div className="Area-Choice">
            <div className="div-Area-Yes-Radio">
              <input
                className="Input-Yes-Radio-Breeding"
                type="radio"
                id="yes"
                name="gender5"
                value="yes"
                onChange={e => {
                  setFChoose(e.target.value);
                }}
              />
              <p className="P-Yes-Radio-Breeding">yes</p>
            </div>
            <div className="div-Area-No-Radio">
              <input
                className="Input-No-Radio-Breeding"
                type="radio"
                id="no"
                name="gender5"
                value="no"
                onChange={e => {
                  setFChoose(e.target.value);
                }}
              />
              <p className="P-No-Radio-Breeding">no</p>
            </div>
            <div className="div-Show">{showChoiceF()}</div>
          </div>

          <div className="div-Area-inline">
            <div className="Date-Breeding">
              <p className="Form-LefiSide-P">วันที่ผสม :</p>
            </div>
            <div className="Input-Date">
              <input
                className="Input-border"
                type="date"
                min="2020-01-01"
                onChange={e => {
                  setBreedingDate(e.target.value);
                }}
              ></input>
            </div>
          </div>

          <div className="div-Area-inline">
            <p className="Form-LefiSide-P">ฟาร์ม</p>
            {showFarm()}
          </div>

          <div>
            <p>ประเภทของการผสมพันธุ์</p>
          </div>

          <div className="div-Area-Radio">{showR_Self()}</div>

          {showSelf()}

          <div className="div-Number-Breeding">
            <label htmlFor="s">จำนวนดอกที่ผสม</label>
            <input
              className="Input-Number-Breeding"
              type="number"
              onBlur={hadleBlurFlower}
              onChange={e => {
                setFlower(e.target.value);
              }}
            />
            <label htmlFor="s">ดอก</label>
          </div>
          {error.flower && <div className="error1">{error.massage1}</div>}
          {er && <div className="error1">กรุณากรอกข้อมูลให้ครบถ้วน</div>}

          <button
            className="Button-Save-Breeding"
            disabled={error.flower || error.selfNum}
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </button>
          <button className="Button-close-modal-Breeding" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    );
  };
  const ModalShowEdit = ({ handleClose, show }) => {
    const [selfNum, setSelfNum] = useState(self);
    const [date, setDate] = useState(dateB);
    const [nFlow, setNFlow] = useState(flow);

    const showSelf = () => {
      if (self === "") {
        return <></>;
      } else
        return (
          <>
            <div className="div-Self-Number">
              <p>ผสมแบบ Self ชั่วที่ </p>
              <input
                className="Input-Number-Self"
                type="number"
                min="0"
                placeholder={selfNum}
                value={selfNum}
                onChange={e => {
                  e ? setSelfNum(e.target.value) : setSelfNum(self);
                }}
              />
            </div>
          </>
        );
    };
    const handleEdit = async () => {
      setLoading(false);
      const ProID = Cookies.get("IdProject");
      const get = await axios({
        url: "http://localhost:3005/editBreeding",
        withCredentials: true,
        method: "POST",
        data: { ProID, id_Breeding, selfNum, date, nFlow },
      });
      console.log(get);
    };
    return (
      <>
        <div className={show ? "Modal-EditBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <p className="Head-Edit-modal">แก้ไขข้อมูล</p>
            <div className="div-Show-Detail-modal-BreedingEdite">
              <p>ID_Breeding: {id_Breeding}</p>
              <p>ID_Father: {id_F}</p>
              <p>ID_Mother: {id_M}</p>
              <p>ชนิดของการผสม: {type}</p>
            </div>
            <div className="div-Detail-modal-BreedingEdite">
              <div className="div-Date-Breed-modal">
                <p>วันที่ผสม:</p>
                <input
                  className="Input-Date-modal-BreedingEdite"
                  type="date"
                  value={date}
                  onChange={e => {
                    e ? setDate(e.target.value) : setDate(dateB);
                  }}
                />
              </div>

              {showSelf()}

              <div className="div-Number-Breed">
                <p>จำนวนดอกที่ผสม: </p>
                <input
                  className="Input-Number-Breed"
                  type="number"
                  min={0}
                  value={nFlow}
                  placeholder={nFlow}
                  onChange={e => {
                    e ? setNFlow(e.target.value) : setNFlow(flow);
                  }}
                />
              </div>
            </div>

            <button
              className="Button-Edite-modal-BreedingEdite"
              onClick={() => {
                handleEdit();
                handleClose();
              }}
            >
              Edit
            </button>
            <button
              className="Button-Close-modal-BreedingEdite"
              onClick={handleClose}
            >
              Close
            </button>
          </section>
        </div>
      </>
    );
  };
  const ModalShowDelete = ({ handleClose, show }) => {
    const handleDelete = async () => {
      setLoading(false);
      const ProID = Cookies.get("IdProject");
      const get = await axios({
        url: "http://localhost:3005/deleteBreeding",
        withCredentials: true,
        method: "POST",
        data: { ProID, id_Breeding },
      });
      console.log(get);
    };
    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <div className="div-Delete-Breeding-modal">
              <h1 className="P-Delete-Center">ลบข้อมูล</h1>
              <br />
              <p>
                คุณต้องการที่จะลบ การผสมพันธุ์<span> {id_Breeding} </span>
                นี้ใช่หรือไม่
              </p>
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

            {/* <button onClick={handleClose}>ปิด</button> */}
          </section>
        </div>
      </>
    );
  };
  const showAll = () => {
    if (idSearch === "") {
      return (
        <>
          <div className="div-Table-Breeding">
            <table id="t01">
              <tr>
                <th>ID การผสมพันธุ์</th>
                <th>พ่อพันธุ์</th>
                <th>แม่พันธุ์</th>
                <th>วันที่ผสม</th>
                <th>ชนิดของการผสม</th>
                {/* <th>Self ครั้งที่ </th> */}
                <th>จำนวนดอกที่ผสมได้</th>
                <th>Edit</th>
              </tr>

              {breeding.map(data => {
                if (data.Type_Breeding === "self") {
                  return (
                    <>
                      <tr>
                        <td>{data.ID_Breeding}</td>
                        <td>{data.ID_Father}</td>
                        <td>{data.ID_Mother}</td>
                        <td>{data.Date_Breeding}</td>
                        <td>
                          {data.Type_Breeding} ({data.Self_Round})
                        </td>
                        {/* <td></td> */}
                        <td>{data.Flower_Num}</td>
                        <td>
                          <button
                            className="Button-Edit-Table-Breeding"
                            onClick={() => {
                              setShowEdit(true);
                              setId_Breeding(data.ID_Breeding);
                              setId_F(data.ID_Father);
                              setId_M(data.ID_Mother);
                              setDateB(data.Date_Breeding);
                              setType(data.Type_Breeding);
                              setSelf(data.Self_Round);
                              setFlow(data.Flower_Num);
                            }}
                          >
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </button>

                          <button
                            className="Button-Delete-Table-Breeding"
                            onClick={() => {
                              setShowDelete(true);
                              setId_Breeding(data.ID_Breeding);
                            }}
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>

                          <button
                            onClick={() => {
                              setShowSent(true);
                              setChooseID_Breed(data.ID_Breeding);
                              setId_Breeding(data.ID_Breeding);
                            }}
                          >
                            นำเข้ากลุ่มเมล็ด
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                } else {
                  return (
                    <>
                      <tr>
                        <td>{data.ID_Breeding}</td>

                        <td>{data.ID_Father}</td>
                        <td>{data.ID_Mother}</td>
                        <td>{data.Date_Breeding}</td>

                        <td>{data.Type_Breeding}</td>
                        {/* <td></td> */}
                        <td>{data.Flower_Num}</td>
                        <td>
                          <button
                            className="Button-Edit-Table-Breeding"
                            onClick={() => {
                              setShowEdit(true);
                              setId_Breeding(data.ID_Breeding);
                              setId_F(data.ID_Father);
                              setId_M(data.ID_Mother);
                              setDateB(data.Date_Breeding);
                              setType(data.Type_Breeding);
                              setSelf(data.Self_Round);
                              setFlow(data.Flower_Num);
                            }}
                          >
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </button>

                          <button
                            className="Button-Delete-Table-Breeding"
                            onClick={() => {
                              setShowDelete(true);
                              setId_Breeding(data.ID_Breeding);
                            }}
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                          <button
                            onClick={() => {
                              setShowSent(true);
                              setChooseID_Breed(data.ID_Breeding);
                              setId_Breeding(data.ID_Breeding);
                            }}
                          >
                            นำเข้ากลุ่มเมล็ด
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                }
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
      if (type === "self") {
        return (
          <>
            <div className="div-Table-AddSeeding">
              <table id="t01">
                <tr>
                  <th>ID การผสมพันธุ์</th>
                  <th>พ่อพันธุ์</th>
                  <th>แม่พันธุ์</th>
                  <th>วันที่ผสม</th>
                  <th>ชนิดของการผสม</th>
                  {/* <th>Self ครั้งที่ </th> */}
                  <th>จำนวนดอกที่ผสมได้</th>
                  <th>Edit</th>
                </tr>
                <>
                  <tr>
                    <td>{id_Breeding}</td>
                    <td>{id_F}</td>
                    <td>{id_M}</td>
                    <td>{dateB}</td>
                    <td>
                      {type}({self})
                    </td>

                    <td>{flow}</td>

                    <button
                      className="Button-Edit-Table-AddSeeding"
                      onClick={() => {
                        setShowEdit(true);
                      }}
                    >
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>

                    <button
                      className="Button-Delete-Table-AddSeeding"
                      onClick={() => {
                        setShowDelete(true);
                      }}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button
                      onClick={() => {
                        setShowSent(true);
                        setChooseID_Breed(id_Breeding);
                      }}
                    >
                      นำเข้ากลุ่มเมล็ด
                    </button>
                  </tr>
                </>
              </table>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="div-Table-AddSeeding">
              <table id="t01">
                <tr>
                  <th>ID การผสมพันธุ์</th>
                  <th>พ่อพันธุ์</th>
                  <th>แม่พันธุ์</th>
                  <th>วันที่ผสม</th>
                  <th>ชนิดของการผสม</th>
                  {/* <th>Self ครั้งที่ </th> */}
                  <th>จำนวนดอกที่ผสมได้</th>
                  <th>Edit</th>
                </tr>
                <>
                  <tr>
                    <td>{id_Breeding}</td>
                    <td>{id_F}</td>
                    <td>{id_M}</td>
                    <td>{dateB}</td>
                    <td>{type}</td>

                    <td>{flow}</td>

                    <button
                      className="Button-Edit-Table-AddSeeding"
                      onClick={() => {
                        setShowEdit(true);
                      }}
                    >
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>

                    <button
                      className="Button-Delete-Table-AddSeeding"
                      onClick={() => {
                        setShowDelete(true);
                      }}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button
                      onClick={() => {
                        setShowSent(true);
                        setChooseID_Breed(id_Breeding);
                      }}
                    >
                      นำเข้ากลุ่มเมล็ด
                    </button>
                  </tr>
                </>
              </table>
            </div>
          </>
        );
      }
    }
  };
  // const handleSentToSeedling = async () => {
  //   const get = await axios({
  //     url: "http://localhost:3005/getBreeding",
  //     method: "POST",
  //     data: {},
  //   });
  // };
  const [chooseID_Breed, setChooseID_Breed] = useState("");
  const [numSeed, setNumSeed] = useState("");
  const [dateSeed, setDateSeed] = useState("");
  const [er, setEr] = useState(false);
  const handleCreateSeed = async () => {
    if (chooseID_Breed === "" || numSeed === "" || dateSeed === "") {
      setEr(true);
    } else {
      setLoading(false);
      setShowSent(false);
      const toProID = Cookies.get("IdProject");
      const get = await axios({
        url: "http://localhost:3005/createSetSeed",
        method: "POST",
        withCredentials: true,
        data: { toProID, chooseID_Breed, numSeed, dateSeed },
      });

      console.log(get);
    }
  };
  return (
    <>
      <div className="Body-Breeding">
        <Bar />
        <div className="Head-Breeding">
          <div className="div-Head-Left-Side">
            <p className="P-Step-Breeding">ขั้นตอนการเลือกคู่ผสมพันธุ์</p>
          </div>
          <div className="div-Head-Right-Side">
            <button
              onClick={() => {
                setShowAddBreeding(true);
              }}
            >
              เพิ่มการผสมพันธุ์
            </button>
          </div>

          <div class="div-Area-Search">
            <Autocomplete
              id="combo-box-demo"
              options={br}
              onChange={(e, value) => {
                if (value) {
                  setIdSearch(value.ID_Breeding);
                  setId_Breeding(value.ID_Breeding);
                  setId_F(value.ID_Father);
                  setId_M(value.ID_Mother);
                  setDateB(value.Date_Breeding);
                  setType(value.Type_Breeding);
                  setSelf(value.Self_Round);
                  setFlow(value.Flower_Num);
                } else {
                  setIdSearch("");
                }
              }}
              getOptionLabel={option => option.ID_Breeding}
              size="small"
              style={{ width: 300, height: 50 }}
              renderInput={params => (
                <TextField {...params} label="Search" variant="outlined" />
              )}
            />
          </div>
        </div>
        {showAll()}
        <ModalShowAddBreeding
          show={showAddBreeding}
          handleClose={() => {
            setShowAddBreeding(false);
          }}
        />
        <ModalShowEdit
          show={showEdit}
          handleClose={() => {
            setShowEdit(false);
          }}
        />
        <ModalShowDelete
          show={showDelete}
          handleClose={() => {
            setShowDelete(false);
          }}
        />
        <ModalAddto
          show={showSent}
          handleClose={() => {
            setShowSent(false);
          }}
          handle={() => {
            handleCreateSeed();
          }}
          bu1="ใช่"
          bu2="ไม่"
        >
          <h1 className="P-Delete-Center">ID การผสมพันธุ์ {id_Breeding} </h1>
          <br />
          <p>นำเข้าสู่ขั้นตอนกลุ่มเมล็ด</p>
          <br />
          <div className="div-Area-inline">
            <p>จำนวนเมล็ดที่ได้จากการผสม</p>
            <input
              className="Input-Number-From-Breeder"
              type="number"
              min={0}
              onChange={e => {
                e ? setNumSeed(e.target.value) : setNumSeed("");
              }}
            />
          </div>
          <div className="div-Area-inline">
            <p>วันที่เก็บเมล็ด</p>
            <input
              className="Input-Number-From-Breeder"
              type="date"
              onChange={e => {
                e ? setDateSeed(e.target.value) : setDateSeed("");
              }}
            />
          </div>

          {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
        </ModalAddto>
      </div>
    </>
  );
}
export default Breeding;
