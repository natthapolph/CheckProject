import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./Seeding.css";
import Bar from "./bar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import ModalAddto from "./Modal/ModalAddto";
function Seedling() {
  const [showSetSeed, setShowSetSeed] = useState(false);
  const [seedSet, setSeedSet] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [maxSize, setMaxSize] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id_Seed, setId_SetSeed] = useState("");
  const [numSeed, setNumSeed] = useState("");
  const [id_breeding, setId_Breeding] = useState("");
  const [date_Seed, setDate_Seed] = useState("");
  const [BreedSearch, setBreedSearch] = useState([]);
  const [Seed, setSeed] = useState([]);
  const [idSearch, setIdSearch] = useState("");
  const [showAddNum, setShowAddNum] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showSentTo, setShowSentTo] = useState(false);
  const [id_Gen, setIDGen] = useState("");
  const [check, setCheck] = useState("");
  const [id_seed_set, setId_Seed_Set] = useState("");
  const [checkNumAdd, setCheckNumAdd] = useState("");
  useEffect(() => {
    const init = async () => {
      let size = 20;
      const toProID = Cookies.get("IdProject");
      const get = await axios({
        url: "http://localhost:3005/getSeed",
        withCredentials: true,
        method: "POST",
        data: { toProID, page, size, loading },
      });
      setSeedSet(get.data.dataSeed);
      setMaxSize(get.data.maxSize);
      setBreedSearch(get.data.search);
      setSeed(get.data.num);
      setLoading(true);
      // console.log(get.data.dataSeed);
    };
    init();
  }, [loading, page]);

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

  const ModalShowAddNum = ({ handleClose, show }) => {
    const [addNewNumSeed, setAddNewNumSeed] = useState("");
    const [addNewDate, setAddNewDate] = useState("");
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
          massage1: "จำนวนเมล็ด ต้องมากกว่า 0",
        });
      } else if (!Temail) {
        setError({
          numSeed: true,
          massage1: "กรุณาระบุ จำนวนเมล็ด",
        });
      } else {
        setError({
          numSeed: false,
        });
      }
    };
    const handleDelete = async () => {
      if (addNewNumSeed === "" || addNewDate === "") {
        setEr(true);
      } else {
        setLoading(false);
        const ProID = Cookies.get("IdProject");
        const get = await axios({
          url: "http://localhost:3005/addNumSeed",
          withCredentials: true,
          method: "POST",
          data: { id_Gen, addNewNumSeed, addNewDate, ProID, id_Seed },
        });
        console.log(get);
      }
    };
    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <h1 className="P-Delete-Center">เพิ่มจำนวนเมล็ด</h1>
            <br />
            <p className="div-Area-inline">ID กลุ่มเมล็ด:{id_Seed}</p>
            <p className="div-Area-inline">การผสมพันธุ์:{id_breeding}</p>
            <br />
            <div className="div-Area-inline">
              <p>จำนวนเมล็ดที่ต้องการเพิ่ม: </p>
              <input
                className="Input-border-Add-Seed"
                type="number"
                // value={addNewNumSeed}
                min={0}
                placeholder={0}
                onBlur={hadleBlurSeed}
                onChange={e => {
                  e ? setAddNewNumSeed(e.target.value) : console.log("");
                }}
              />
            </div>
            {error.numSeed && <div className="error1">{error.massage1}</div>}
            <div className="div-Area-inline">
              <p>วันที่บันทึก:</p>
              <input
                className="Input-border-Add-Seed"
                type="date"
                onChange={e => {
                  e ? setAddNewDate(e.target.value) : console.log("");
                }}
              />
            </div>
            {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
            <div className="div-Area-Button-Breeding-Confirm">
              <button
                className="Button-Add-Seed-Modal"
                disabled={error.numSeed}
                onClick={() => {
                  handleDelete();
                  handleClose();
                }}
              >
                เพิ่มจำนวนเมล็ด
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
  const ModalShowAddSetSeed = ({ handleClose, show }) => {
    const [chooseID_Breed, setChooseID_Breed] = useState("");
    const [numSeed, setNumSeed] = useState("");
    const [dateSeed, setDateSeed] = useState("");
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
    const handleCreateSeed = async () => {
      try {
        if (chooseID_Breed === "" || numSeed === "" || dateSeed === "") {
          setEr(true);
        } else {
          console.log("Check log ");
          setLoading(false);
          setShowSetSeed(false);
          const toProID = Cookies.get("IdProject");

          const get = await axios({
            withCredentials: false,
            url: "http://localhost:3005/createSetSeed",
            withCredentials: true,
            method: "POST",
            data: { toProID, chooseID_Breed, numSeed, dateSeed },
          });

          console.log(get);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
      <div className={show ? "Modal-AddSetSeed" : "display-none"}>
        <section className="modal-main-Project">
          <p className="P-InputDtailGroupSeeding">
            เก็บข้อมูลกลุ่มของเมล็ดที่ได้จากการผสม
          </p>
          <div className="div-Area-modal-Line-Height">
            <Autocomplete
              id="combo-box-demo"
              options={BreedSearch}
              onChange={(e, value) =>
                value
                  ? setChooseID_Breed(value.ID_Breeding)
                  : setChooseID_Breed("")
              }
              getOptionLabel={option => option.ID_Breeding}
              size="small"
              style={{ width: 200, height: 50 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="id การผสมพันธุ์"
                  variant="outlined"
                />
              )}
            />

            <div className="div-Area-inline">
              <p>จำนวนเมล็ดที่ได้จากการผสม</p>
              <input
                className="Input-Number-Seeding"
                type="number"
                onBlur={hadleBlurSeed}
                placeholder={0}
                min={0}
                onChange={e => {
                  setNumSeed(e.target.value);
                }}
              />
            </div>
            <div className="div-Area-inline">
              <p>วันที่เก็บเมล็ด</p>
              <input
                className="Input-Date-Get-Seed"
                type="date"
                onChange={e => {
                  setDateSeed(e.target.value);
                }}
              />
            </div>
          </div>

          {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
          <button
            className="Button-Add-Group-of-Seed"
            disabled={error.numSeed}
            onClick={() => {
              handleCreateSeed();
            }}
          >
            Add
          </button>
          <button className="Button-close-Seeding-modal" onClick={handleClose}>
            close
          </button>
        </section>
      </div>
    );
  };
  const ModalShowDetail = ({ handleClose, show }) => {
    const [keep, setKeep] = useState([]);
    useEffect(() => {
      const init = async () => {
        const toProID = Cookies.get("IdProject");
        const get = await axios({
          url: "http://localhost:3005/getDetailSeedNum",
          withCredentials: true,
          method: "POST",
          data: { toProID, id_Gen },
        });
        setKeep(get.data.a);
      };
      init();
    }, []);
    return (
      <div className={show ? "Modal-AddSetSeed" : "display-none"}>
        <section className="modal-main-Project">
          <h1 className="P-Delete-Center">ข้อมูลการเพิ่มเมล็ด</h1>
          <br />
          {keep.map(data => {
            return (
              <>
                <p className="div-Area-inline">
                  จำนวน {data.Number_Seed}เมล็ด และ บันทึกวันที่ {data.Date}
                </p>
              </>
            );
          })}
          <p className="div-Area-inline">ทั้งหมด {numSeed} เมล็ด</p>
          <button className="Button-close-Seeding-modal" onClick={handleClose}>
            close
          </button>
        </section>
      </div>
    );
  };
  const ModalShowDelete = ({ handleClose, show }) => {
    const handleDelete = async () => {
      setLoading(false);
      const ProID = Cookies.get("IdProject");
      const get = await axios({
        url: "http://localhost:3005/deleteSetSeed",
        withCredentials: true,
        method: "POST",
        data: { ProID, id_Seed },
      });
      console.log(get);
    };
    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <div className="div-Delete-Breeding-modal">
              <h1 className="div-Area-inline">
                คุณต้องการที่จะลบข้อมูลนี้ ใช่หรือไม่
              </h1>
            </div>
            <br />
            <div className="div-Area-modal-Delete-Seedling">
              <p>ID กลุ่มเมล็ด:{id_Seed}</p>
              <p>การผสมพันธุ์:{id_breeding}</p>
              <p>จำนวนเมล็ดที่ได้:{numSeed}</p>
              <p>วันที่บันทึก:{date_Seed}</p>
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
  const ModalShowEdit = ({ handleClose, show }) => {
    const [numSeed2, setNumSeed2] = useState(numSeed);
    const [dateSeed, setDateSeed] = useState(date_Seed);

    const handleEdit = async () => {
      setLoading(false);
      const ProID = Cookies.get("IdProject");
      const get = await axios({
        url: "http://localhost:3005/EditSetSeed",
        withCredentials: true,
        method: "POST",
        data: { ProID, id_Seed, numSeed2, dateSeed },
      });
      console.log(get);
    };
    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <p className="Head-Edit-modal">แก้ไขข้อมูล</p>
            <br />
            <div className="div-Area-modal">
              <p className="div-Area-inline">ID กลุ่มเมล็ด : {id_Seed}</p>
              <p className="div-Area-inline">การผสมพันธุ์ : {id_breeding}</p>
              <br />
              <div className="div-Area-inline">
                <p>จำนวนเมล็ดที่ได้ :{/* {numSeed2} */}</p>
                <input
                  className="Input-Number-Seed"
                  type="number"
                  value={numSeed2}
                  placeholder={numSeed}
                  onChange={e => {
                    e ? setNumSeed2(e.target.value) : setNumSeed2(numSeed);
                  }}
                />
              </div>
              <div className="div-Area-inline">
                <p>วันที่บันทึก :</p>
                <input
                  className="Input-Date-Seed"
                  type="date"
                  value={dateSeed}
                  placeholder={date_Seed}
                  onChange={e => {
                    e ? setDateSeed(e.target.value) : setDateSeed(date_Seed);
                  }}
                />
              </div>

              <div className="div-Area-Button-Breeding-Confirm">
                <button
                  className="Button-Yes-modal-Breeding-confirm"
                  onClick={() => {
                    handleEdit();
                    handleClose();
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
          <div className="div-Table-Seeding">
            <table id="t01">
              <tr>
                <th>ID กลุ่มเมล็ด</th>
                <th>การผสมพันธุ์</th>
                <th>จำนวนเมล็ดที่ได้</th>
                <th>วันที่บันทึก</th>
                <th>Edit</th>
              </tr>
              {seedSet.map(data => {
                if (data.check === "0") {
                  return (
                    <>
                      <tr>
                        <td>{data.ID_Seed}</td>
                        <td>{data.ID_Breeding}</td>
                        <td>{data.Number_Seed}</td>
                        <td>{data.Date_Seed}</td>
                        <td>
                          <button
                            className="Button-Edit-Table-Seeding"
                            onClick={() => {
                              setId_SetSeed(data.ID_Seed);
                              setNumSeed(data.Number_Seed);
                              setId_Breeding(data.ID_Breeding);
                              setDate_Seed(data.Date_Seed);
                              setIDGen(data.ID_Gen);
                              setShowEdit(true);
                            }}
                          >
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </button>
                          {/* </td> */}
                          {/* <td> */}
                          <button
                            className="Button-Delete-Table-Seeding"
                            onClick={() => {
                              setId_SetSeed(data.ID_Seed);
                              setNumSeed(data.Number_Seed);
                              setId_Breeding(data.ID_Breeding);
                              setDate_Seed(data.Date_Seed);
                              setIDGen(data.ID_Gen);
                              setShowDelete(true);
                            }}
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                          {/* </td> */}
                          {/* <td> */}
                          <button
                            onClick={() => {
                              setIDGen(data.ID_Gen);
                              setNumSeed(data.Number_Seed);
                              setId_SetSeed(data.ID_Seed);
                              setShowDetail(true);
                            }}
                          >
                            ข้อมูลการเพิ่มเมล็ด
                          </button>
                          {/* </td> */}
                          {/* <td> */}
                          <button
                            className="Button-Add-Seed-Table"
                            onClick={() => {
                              setId_SetSeed(data.ID_Seed);
                              setNumSeed(data.Number_Seed);
                              setId_Breeding(data.ID_Breeding);
                              setDate_Seed(data.Date_Seed);
                              setIDGen(data.ID_Gen);
                              setShowAddNum(true);
                            }}
                          >
                            เพิ่มจำนวนเมล็ด
                          </button>

                          <button
                            className="Button-Input-Adseed"
                            onClick={() => {
                              setShowSentTo(true);
                              setId_Seed_Set(data.ID_Seed);
                              setId_SetSeed(data.ID_Seed);
                              setCheckNumAdd(data.Number_Seed);
                              setNumSeed(data.Number_Seed);
                              console.log(numSeed);
                            }}
                          >
                            นำเข้าการเพาะเมล็ด
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                }
                if (data.check === "1") {
                  return (
                    <>
                      <tr>
                        <td>{data.ID_Seed}</td>
                        <td>{data.ID_Breeding}</td>
                        <td>{data.Number_Seed}</td>
                        <td>{data.Date_Seed}</td>
                        <td>
                          <button
                            className="Button-Edit-Table-Seeding"
                            disabled={true}
                            // onClick={() => {
                            //   setId_SetSeed(data.ID_Seed);
                            //   setNumSeed(data.Number_Seed);
                            //   setId_Breeding(data.ID_Breeding);
                            //   setDate_Seed(data.Date_Seed);
                            //   setIDGen(data.ID_Gen);
                            //   setShowEdit(true);
                            // }}
                          >
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </button>
                          {/* </td> */}
                          {/* <td> */}
                          <button
                            className="Button-Delete-Table-Seeding"
                            onClick={() => {
                              setId_SetSeed(data.ID_Seed);
                              setNumSeed(data.Number_Seed);
                              setId_Breeding(data.ID_Breeding);
                              setDate_Seed(data.Date_Seed);
                              setIDGen(data.ID_Gen);
                              setShowDelete(true);
                            }}
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                          {/* </td> */}
                          {/* <td> */}
                          <button
                            onClick={() => {
                              setIDGen(data.ID_Gen);
                              setNumSeed(data.Number_Seed);
                              setId_SetSeed(data.ID_Seed);
                              setShowDetail(true);
                            }}
                          >
                            ข้อมูลการเพิ่มเมล็ด
                          </button>
                          {/* </td> */}
                          {/* <td> */}
                          <button
                            className="Button-Add-Seed-Table"
                            onClick={() => {
                              setId_SetSeed(data.ID_Seed);
                              setNumSeed(data.Number_Seed);
                              setId_Breeding(data.ID_Breeding);
                              setDate_Seed(data.Date_Seed);
                              setIDGen(data.ID_Gen);
                              setShowAddNum(true);
                            }}
                          >
                            เพิ่มจำนวนเมล็ด
                          </button>

                          <button
                            className="Button-Input-Adseed"
                            onClick={() => {
                              setId_Seed_Set(data.ID_Seed);
                              setId_SetSeed(data.ID_Seed);

                              setCheckNumAdd(data.Number_Seed);
                              console.log(data.Number_Seed);
                              setShowSentTo(true);
                            }}
                          >
                            นำเข้าการเพาะเมล็ด
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
              {" "}
              <i class="fa fa-step-forward" aria-hidden="true"></i>
            </button>
          </div>
        </>
      );
    } else {
      if (check === "0") {
        return (
          <>
            <div className="div-Table-AddSeeding">
              <table id="t01">
                <tr>
                  <th>ID กลุ่มเมล็ด</th>
                  <th>การผสมพันธุ์</th>
                  <th>จำนวนเมล็ดที่ได้</th>
                  <th>วันที่บันทึก</th>
                  <th>Edit</th>
                </tr>
                <>
                  <tr>
                    <td>{id_Seed}</td>
                    <td>{id_breeding}</td>
                    <td>{numSeed}</td>
                    <td>{date_Seed}</td>
                    <td>
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
                          setShowDetail(true);
                        }}
                      >
                        ข้อมูลการเพิ่มเมล็ด
                      </button>

                      <button
                        className="Button-Add-Seed-Table"
                        onClick={() => {
                          setShowAddNum(true);
                        }}
                      >
                        เพิ่มจำนวนเมล็ด
                      </button>

                      <button
                        className="Button-Input-Adseed"
                        onClick={() => {
                          setId_Seed_Set(id_Seed);
                          setId_SetSeed(id_Seed);
                          // setNumSeed(numSeed);
                          console.log(numSeed);
                          setShowSentTo(true);
                        }}
                      >
                        นำเข้าการเพาะเมล็ด
                      </button>
                    </td>
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
                  <th>ID กลุ่มเมล็ด</th>
                  <th>การผสมพันธุ์</th>
                  <th>จำนวนเมล็ดที่ได้</th>
                  <th>วันที่บันทึก</th>
                  <th>Edit</th>
                </tr>
                <>
                  <tr>
                    <td>{id_Seed}</td>
                    <td>{id_breeding}</td>
                    <td>{numSeed}</td>
                    <td>{date_Seed}</td>
                    <td>
                      <button
                        className="Button-Edit-Table-AddSeeding"
                        disabled={true}
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
                          setShowDetail(true);
                        }}
                      >
                        ข้อมูลการเพิ่มเมล็ด
                      </button>

                      <button
                        onClick={() => {
                          setShowAddNum(true);
                        }}
                      >
                        เพิ่มจำนวนเมล็ด
                      </button>
                    </td>
                  </tr>
                </>
              </table>
            </div>
          </>
        );
      }
    }
  };

  const ModalShowAddto = ({ handleClose, show }) => {
    const [dateSeedling, setDateSeedling] = useState("");
    const [location, setLocation] = useState("");
    const [seedNum, setSeedNum] = useState(0);

    const [er, setEr] = useState(false);
    const [error, setError] = useState({
      seedNum: false,

      massage1: "",
    });
    const hadleBlurSeed = e => {
      let check = parseInt(checkNumAdd, 10);
      console.log("checkNumAdd", check);
      console.log(" e.target.value", e.target.value);
      const Temail = e.target.value;
      if (Temail < 1) {
        setError({
          seedNum: true,
          massage1: "จำนวนเมล็ดที่ปลูก ต้องมากกว่า 0",
        });
      } else if (!Temail) {
        setError({
          seedNum: true,
          massage1: "กรุณาระบุ จำนวนเมล็ดที่ปลูก",
        });
      } else if (check < Temail) {
        setError({
          seedNum: true,
          massage1: "จำนวนเมล็ดที่ปลูก ต้องน้อยกว่า จำนวนเมล็ดที่ได้",
        });
      } else {
        setError({
          seedNum: false,
        });
        setSeedNum(e.target.value);
      }
    };
    const CreateSeedling = async () => {
      if (dateSeedling === "" || seedNum === "" || id_seed_set === "") {
        setEr(true);
      } else {
        setEr(false);
        setLoading(false);
        setShowSentTo(false);
        const ID_Project = Cookies.get("IdProject");
        const get = await axios({
          url: "http://localhost:3005/createSeedling",
          withCredentials: true,
          method: "POST",

          data: {
            ID_Project,
            dateSeedling,
            location,
            seedNum,
            id_seed_set,
          },
        });
      }
    };

    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <h1 className="P-Delete-Center">ID กลุ่มเมล็ด {id_seed_set} </h1>
            <br />
            <p>นำเข้าการเพาะเมล็ด </p>
            <br />
            <div className="div-Area-inline">
              <p>วันที่เพาะ*</p>
              <input
                className="Input-Date-Seed-AddSeeding"
                type="date"
                onChange={e => {
                  setDateSeedling(e.target.value);
                }}
              />
            </div>
            <p>สถานที่เพาะปลูก</p>
            <textarea
              className="Input-border"
              cols="70"
              rows="4"
              onChange={e => {
                setLocation(e.target.value);
              }}
            ></textarea>
            <div className="div-Area-inline">
              <p>จำนวนเมล็ดที่เพาะ*</p>
              <input
                className="Input-Number-Seed-Crop"
                type="number"
                // onBlur={hadleBlurSeed}
                min={0}
                placeholder={0}
                onChange={e => {
                  hadleBlurSeed(e);
                  // setSeedNum(e.target.value);
                }}
              />
            </div>{" "}
            <div className="div-Area-Button-Breeding-Confirm">
              {error.seedNum && <div className="error1">{error.massage1}</div>}

              {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
              <button
                className="Button-Yes-modal-Breeding-confirm"
                disabled={error.seedNum}
                onClick={() => {
                  CreateSeedling();
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
            {/* <button onClick={handleClose}>ปิด</button> */}
          </section>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="Body-Seeding">
        <Bar />

        <div className="Head-Seeding">
          <div className="div-Head-Left-Side">
            <p className="P-Group-Seed">กลุ่มของเมล็ด</p>
          </div>
          <div className="div-Head-Right-Side">
            <button
              onClick={() => {
                setShowSetSeed(true);
              }}
            >
              เพิ่มกลุ่มของเมล็ด
            </button>
          </div>
          <div class="div-Area-Search">
            <Autocomplete
              id="combo-box-demo"
              options={Seed}
              onChange={(e, value) => {
                if (value) {
                  setIdSearch(value.ID_Seed);
                  setId_SetSeed(value.ID_Seed);
                  setNumSeed(value.Number_Seed);
                  setId_Breeding(value.ID_Breeding);
                  setDate_Seed(value.Date_Seed);
                  setCheck(value.check);
                  setIDGen(value.ID_Gen);
                } else {
                  setIdSearch("");
                }
              }}
              getOptionLabel={option => option.ID_Seed}
              size="small"
              style={{ width: 300, height: 50 }}
              renderInput={params => (
                <TextField {...params} label="Search" variant="outlined" />
              )}
            />
          </div>
        </div>

        {showAll()}
      </div>
      <ModalShowAddSetSeed
        show={showSetSeed}
        handleClose={() => {
          setShowSetSeed(false);
        }}
      />
      <ModalShowDelete
        show={showDelete}
        handleClose={() => {
          setShowDelete(false);
        }}
      />
      <ModalShowEdit
        show={showEdit}
        handleClose={() => {
          setShowEdit(false);
        }}
      />
      <ModalShowAddNum
        show={showAddNum}
        handleClose={() => {
          setShowAddNum(false);
        }}
      />
      <ModalShowDetail
        show={showDetail}
        handleClose={() => {
          setShowDetail(false);
        }}
      />

      <ModalShowAddto
        show={showSentTo}
        handleClose={() => {
          setShowSentTo(false);
        }}
      />
      {/* <ModalAddto
        handleClose={() => {
          setShowSentTo(false);
        }}
        show={showSentTo}
        handle={() => {
          CreateSeedling();
        }}
        bu1="ใช่"
        bu2="ไม่"
        disBtn={error.seedNum || error.growNum}
      > */}
      {/* <h1>ID กลุ่มเมล็ด {id_seed_set} </h1>
        <h1>นำเข้าการเพาะเมล็ด </h1>
        <div className="div-Area-inline">
          <p>วันที่เพาะ*</p>
          <input
            className="Input-Date-Seed-AddSeeding"
            type="date"
            onChange={e => {
              setDateSeedling(e.target.value);
            }}
          />
        </div>{" "}
        <p>สถานที่เพาะปลูก</p>
        <textarea
          cols="70"
          rows="4"
          onChange={e => {
            setLocation(e.target.value);
          }}
        ></textarea>
        <div className="div-Area-inline">
          <p>จำนวนเมล็ดที่ปลูก*</p>
          <input
            className="Input-Number-Seed-Crop"
            type="number"
            onBlur={hadleBlurSeed}
            min={0}
            placeholder={0}
            onChange={e => {
              setSeedNum(e.target.value);
            }}
          />
        </div>{" "}
        {error.seedNum && <div className="error1">{error.massage1}</div>}
        {error.growNum && <div className="error1">{error.massage2}</div>}
        {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>} */}
      {/* </ModalAddto> */}
    </>
  );
}
export default Seedling;
