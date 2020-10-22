import React from "react";
import "./Farm.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./AddSeedling.css";
import Bar from "./bar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
function AddSeedling() {
  const [showAddSeedling, setShowAddSeedling] = useState(false);
  const [showEditSeedling, setShowEditSeedling] = useState(false);
  const [showDeleteSeedling, setShowDeleteSeedling] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [maxSize, setMaxSize] = useState(0);
  const [page, setPage] = useState(1);
  const [seedling, setSeedling] = useState([]);
  const [seedSet, setSeedSet] = useState([]);
  const [idSeedling, setIDSeedling] = useState("");
  const [idSeedSet, setIDSeedSet] = useState("");
  const [Location, setLocation] = useState("");
  const [DateSeedling, setDateSeedling] = useState("");
  const [NumSeedling, setNumSeedling] = useState("");
  const [NumGrowSeedling, setNumGrowSeedling] = useState("");
  const [search, setSearch] = useState([]);
  const [idSearch, setIdSearch] = useState("");
  const [showAddGrow, setShowAddGrow] = useState(false);
  const [showAddToSST, setShowAddToSST] = useState(false);
  const [numtoSST, setNumtoSST] = useState("");
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
    const initSeedling = async () => {
      let size = 5;
      const toProID = Cookies.get("IdProject");
      const get = await axios({
        url: "http://localhost:3005/getSeedling",
        withCredentials: true,
        method: "POST",
        data: { toProID, size, page },
      });
      setSeedling(get.data.dataSeedling);
      console.log(get.data.dataSeedling);
      setSeedSet(get.data.dataSeedSet);
      setMaxSize(get.data.maxSize);
      setSearch(get.data.num);
      setLoading2(true);
    };
    initSeedling();
  }, [page, loading2]);

  const ModalShowAddSeedling = ({ handleClose, show }) => {
    const [dateSeedling, setDateSeedling] = useState("");
    const [location, setLocation] = useState("");
    const [seedNum, setSeedNum] = useState(0);
    const [id_seed_set, setId_Seed_Set] = useState("");
    const [er, setEr] = useState(false);
    const [checkNumAdd, setCheckNumAdd] = useState("");
    const [error, setError] = useState({
      seedNum: false,
      growNum: false,
      massage1: "",
      massage2: "",
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
        setLoading2(false);
        setShowAddSeedling(false);
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
        console.log(get);
      }
    };
    const showNum = () => {
      if (id_seed_set !== "") {
        return (
          <>
            <div className="div-Area-inline">
              <p>จำนวนเมล็ดที่ปลูก*</p>
              <input
                className="Input-Number-Seed-Crop"
                type="number"
                // onBlur={hadleBlurSeed}
                min={0}
                placeholder={0}
                onChange={e => {
                  hadleBlurSeed(e);
                }}
              />
            </div>
          </>
        );
      }
    };
    return (
      <div className={show ? "Modal-AddBreeder" : "display-none"}>
        <section className="modal-main-Project">
          <h1 className="P-Delete-Center">เพิ่มสายพันธุ์</h1>
          <br />
          <Autocomplete
            id="combo-box-demo"
            size="small"
            options={seedSet}
            onChange={(e, value) => {
              if (value) {
                setId_Seed_Set(value.ID_Seed);
                setCheckNumAdd(value.Number_Seed);
              } else {
                setId_Seed_Set("");
              }
            }}
            getOptionLabel={option => option.ID_Seed}
            style={{ width: 250, height: 50 }}
            renderInput={params => (
              <TextField
                {...params}
                label="id กลุ่มของเมล็ด*"
                variant="outlined"
              />
            )}
          />
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
            cols="65"
            rows="4"
            onChange={e => {
              setLocation(e.target.value);
            }}
          ></textarea>
          {showNum()}
          {error.seedNum && <div className="error1">{error.massage1}</div>}
          {error.growNum && <div className="error1">{error.massage2}</div>}
          {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
          <button
            className="Button-Add-Seed-modal"
            disabled={error.seedNum}
            onClick={() => {
              CreateSeedling();
            }}
          >
            Add
          </button>
          <button className="Button-close-AddSeeding" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    );
  };
  console.log(loading2);
  const ModalShowAddGrow = ({ handleClose, show }) => {
    const [growNum, setGrowNum] = useState("");
    const [er, setEr] = useState(false);
    const [er2, setEr2] = useState(false);
    const handleDelete = async () => {
      var growNumX = parseInt(growNum, 10);

      if (growNum === "") {
        setEr(true);
      } else if (growNumX > NumSeedling) {
        setEr2(true);
      } else {
        setEr(false);
        setEr2(false);
        setLoading2(false);
        setShowAddGrow(false);
        const ProID = Cookies.get("IdProject");
        const get = await axios({
          url: "http://localhost:3005/addGrowNumSeedling",
          withCredentials: true,
          method: "POST",
          data: { ProID, idSeedling, growNumX },
        });
        console.log(get);
      }
    };
    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <div className="div-Delete-Breeding-modal">
              <h1 className="P-Delete-Center">แก้ไขจำนวนเมล็ดที่งอก</h1>
              <br />{" "}
            </div>
            <div className="div-Area-inline">
              <p>จำนวนเมล็ดที่งอก :</p>
              <input
                className="Input-border-Number-Seed"
                type="number"
                min={0}
                onChange={e => {
                  e ? setGrowNum(e.target.value) : setGrowNum("");
                }}
              />
            </div>

            {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
            {er2 && (
              <div className="error1">
                จำนวนเมล็ดที่งอกต้องน้อยกว่า เมล็ดที่เพาะ
              </div>
            )}
            <div className="div-Area-Button-Breeding-Confirm">
              <button
                className="Button-Yes-modal-Breeding-confirm"
                onClick={() => {
                  handleDelete();
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
  const ModalShowDeleteSeedling = ({ handleClose, show }) => {
    const handleDelete = async () => {
      setLoading2(false);
      const ProID = Cookies.get("IdProject");
      const get = await axios({
        url: "http://localhost:3005/deleteSeedling",
        withCredentials: true,
        method: "POST",
        data: { ProID, idSeedling },
      });
      console.log(get);
    };
    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <div className="div-Delete-Breeding-modal">
              <p className="Head-Edit-modal">คุณต้องการที่จะลบ ใช่หรือไม่ </p>
              <br />
            </div>
            <p className="div-Area-inline">ID การเพาะเมล็ด : {idSeedling}</p>
            <p className="div-Area-inline">ID กลุ่มเมล็ด : {idSeedSet}</p>
            <p className="div-Area-inline">สถานที่เพาะปลูก : {Location}</p>
            <p className="div-Area-inline">วันที่เพาะปลูก : {DateSeedling}</p>
            <p className="div-Area-inline">จำนวนเมล็ดที่เพาะ : {NumSeedling}</p>
            <p className="div-Area-inline">
              จำนวนเมล็ดที่งอก : {NumGrowSeedling}
            </p>

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
  const ModalShowAddtoSST = ({ handleClose, show }) => {
    const [numTo, setNumTo] = useState(0);
    const [er, setEr] = useState(false);
    const [error, setError] = useState({
      numSeed: false,
      massage1: "",
    });
    const hadleBlurSeed = e => {
      const check = parseInt(NumGrowSeedling, 10);
      console.log(numtoSST);
      const checkNumSST = parseInt(numtoSST, 10);
      console.log(check, checkNumSST);
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
      } else if (check - checkNumSST < Temail) {
        setError({
          numSeed: true,
          massage1: "กรุณาระบุ จำนวนที่ปลูกลงแปลงต้องน้อยกว่า จำนวนที่รอด",
        });
      } else {
        setNumTo(e.target.value);
        setError({
          numSeed: false,
        });
      }
    };
    const handleDelete = async () => {
      if (numTo === "") {
        setEr(true);
      } else {
        setEr(false);
        setLoading2(false);
        setShowAddToSST(false);
        const ProID = Cookies.get("IdProject");
        const get = await axios({
          url: "http://localhost:3005/addToSST",
          withCredentials: true,
          method: "POST",
          data: { ProID, idSeedling, numTo },
        });
        console.log(get);
      }
    };
    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <h1 className="Head-Edit-modal">
              คุณต้องการที่จะนำเข้าขั้นตอน SST
            </h1>
            <br />
            <div className="div-Area-inline">
              <p> จำนวนที่ต้องการนำไปลงแปลง :</p>
              <input
                className="Input-border-Number-Seed"
                type="number"
                // onBlur={hadleBlurSeed}
                onChange={e => {
                  e ? hadleBlurSeed(e) : setNumTo("");
                }}
              />
            </div>

            <div className="div-Area-Button-Breeding-Confirm">
              {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
              {error.numSeed && <div className="error1">{error.massage1}</div>}
              <button
                className="Button-Yes-modal-Breeding-confirm"
                disabled={error.numSeed}
                onClick={() => {
                  handleDelete();
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
  const ModalShowEditSeedling = ({ handleClose, show }) => {
    const [numSeed2, setNumSeed2] = useState(NumSeedling);
    const [dateSeed, setDateSeed] = useState(DateSeedling);
    const [Location2, setLocation2] = useState(Location);
    // const [numGrow2, setNumGrow2] = useState(NumGrowSeedling);
    const [er, setEr] = useState(false);
    const [error, setError] = useState({
      numSeed: false,
      numSeed2: false,
      massage1: "",
      massage2: "",
    });
    const hadleBlurSeed2 = e => {
      const check = parseInt(NumGrowSeedling, 10);
      const Temail = e.target.value;
      if (Temail < 1) {
        setError({
          numSeed2: true,
          massage2: "จำนวนเมล็ดที่ได้จากการผสม ต้องมากกว่า 0",
        });
      } else if (!Temail) {
        setError({
          numSeed2: true,
          massage2: "กรุณาระบุ จำนวนเมล็ดที่ได้จากการผสม",
        });
      } else if (check > Temail) {
        setError({
          numSeed2: true,
          massage2:
            "กรุณาระบุ จำนวนเมล็ดที่เพาะ ต้องไม่น้อยกว่าจำนวนเมล็ดที่งอก ",
        });
      } else {
        setNumSeed2(e.target.value);
        setError({
          numSeed2: false,
        });
      }
    };

    const handleEdit = async () => {
      if (
        numSeed2 === "" ||
        dateSeed === ""
        //|| numGrow2 === ""
      ) {
        setEr(true);
      } else {
        setEr(false);
        setLoading2(false);
        setShowEditSeedling(false);
        const ProID = Cookies.get("IdProject");
        const get = await axios({
          url: "http://localhost:3005/EditSeedling",
          withCredentials: true,
          method: "POST",
          data: {
            ProID,
            idSeedling,
            numSeed2,
            dateSeed,
            Location2,
            // numGrow2
          },
        });
        alert(get.data.mes);
      }
    };
    return (
      <>
        <div className={show ? "Modal-DeleteBreeder" : "display-none"}>
          <section className="modal-main-Project">
            <h1 className="P-Delete-Center">แก้ไขข้อมูล</h1>
            <br />
            <div className="div-Area-modal">
              <p className="div-Area-inline">ID การเพาะเมล็ด : {idSeedling}</p>
              <p className="div-Area-inline">ID กลุ่มเมล็ด : {idSeedSet}</p>
              <br />
              <p className="div-Area-inline">สถานที่เพาะปลูก :</p>
              <textarea
                className="Input-border"
                name=""
                id=""
                cols="65"
                rows="5"
                value={Location2}
                onChange={e => {
                  e ? setLocation2(e.target.value) : setLocation2(Location);
                }}
              ></textarea>
              <div className="div-Area-inline">
                <p>วันที่เพาะปลูก :</p>
                <input
                  className="Input-Date-Crop"
                  type="date"
                  value={dateSeed}
                  onChange={e => {
                    setDateSeed(e.target.value);
                  }}
                />
              </div>
              <div className="div-Area-inline">
                <p>จำนวนเมล็ดที่เพาะ :</p>
                <input
                  className="Input-Number-Seeding"
                  type="number"
                  min={0}
                  // onBlur={hadleBlurSeed2}
                  // value={numSeed2}
                  placeholder={numSeed2}
                  onChange={e => {
                    hadleBlurSeed2(e);
                    // setNumSeed2(e.target.value);
                  }}
                />
              </div>
              {/* <div className="div-Area-inline">
                <p>จำนวนเมล็ดที่งอก :</p>
                <input
                  className="Input-Number-Grow-Seeding"
                  type="number"
                  min={0}
                  // value={numGrow2}
                  onBlur={hadleBlurSeed}
                  placeholder={numGrow2}
                  onChange={e => {
                    setNumGrow2(e.target.value);
                  }}
                />
              </div> */}
            </div>
            {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
            {error.numSeed && <div className="error1">{error.massage1}</div>}
            {error.numSeed2 && <div className="error1">{error.massage2}</div>}
            <div className="div-Area-Button-Breeding-Confirm">
              <button
                className="Button-Yes-modal-Breeding-confirm"
                disabled={error.numSeed || error.numSeed2}
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
  const showAll = () => {
    if (idSearch === "") {
      return (
        <>
          <div className="div-Table-AddSeeding">
            <table id="t01">
              <tr>
                <th>ID การเพาะเมล็ด</th>
                <th>ID กลุ่มเมล็ด</th>
                <th>สถานที่เพาะปลูก</th>
                <th>วันที่เพาะปลูก</th>
                <th>จำนวนเมล็ดที่เพาะ</th>
                <th>จำนวนเมล็ดที่งอก</th>
                <th>จำนวนต้นกล้าที่ลงแปลง</th>
                <th>Edit</th>
              </tr>
              {seedling.map(data => {
                if (
                  parseInt(data.Grow_Number, 10) === 0 &&
                  parseInt(data.NumtoSST, 10) === 0
                ) {
                  console.log(
                    "check if growNum=0",
                    data.ID_Seedling,
                    data.Grow_Number
                  );
                  return (
                    <>
                      <tr>
                        <td>{data.ID_Seedling}</td>
                        <td>{data.ID_Seed}</td>
                        <td>{data.Location_Seedling}</td>
                        <td>{data.Date_Seed}</td>
                        <td>{data.Number_Seed}</td>
                        <td>{data.Grow_Number}</td>
                        <td>{data.NumtoSST}</td>

                        <td>
                          <button
                            className="Button-Edit-Table-AddSeeding"
                            onClick={() => {
                              setIDSeedling(data.ID_Seedling);
                              setIDSeedSet(data.ID_Seed);
                              setLocation(data.Location_Seedling);
                              setDateSeedling(data.Date_Seed);
                              setNumSeedling(data.Number_Seed);
                              setNumGrowSeedling(data.Grow_Number);
                              setShowEditSeedling(true);
                            }}
                          >
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </button>

                          <button
                            className="Button-Delete-Table-AddSeeding"
                            onClick={() => {
                              setIDSeedling(data.ID_Seedling);
                              setIDSeedSet(data.ID_Seed);
                              setLocation(data.Location_Seedling);
                              setDateSeedling(data.Date_Seed);
                              setNumSeedling(data.Number_Seed);
                              setNumGrowSeedling(data.Grow_Number);
                              setShowDeleteSeedling(true);
                            }}
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                          <button
                            onClick={() => {
                              setIDSeedling(data.ID_Seedling);
                              setIDSeedSet(data.ID_Seed);
                              setLocation(data.Location_Seedling);
                              setDateSeedling(data.Date_Seed);
                              setNumSeedling(data.Number_Seed);
                              setNumGrowSeedling(data.Grow_Number);
                              setShowAddGrow(true);
                            }}
                          >
                            เพิ่มจำนวนเมล็ดที่งอก{"&"}แก้ไข
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                } else if (parseInt(data.Grow_Number, 10) !== 0) {
                  console.log("check if growNum>0");
                  return (
                    <>
                      <tr>
                        <td>{data.ID_Seedling}</td>
                        <td>{data.ID_Seed}</td>
                        <td>{data.Location_Seedling}</td>
                        <td>{data.Date_Seed}</td>
                        <td>{data.Number_Seed}</td>
                        <td>{data.Grow_Number}</td>
                        <td>{data.NumtoSST}</td>

                        <td>
                          <button
                            // disabled={true}
                            className="Button-Edit-Table-AddSeeding"
                            onClick={() => {
                              setIDSeedling(data.ID_Seedling);
                              setIDSeedSet(data.ID_Seed);
                              setLocation(data.Location_Seedling);
                              setDateSeedling(data.Date_Seed);
                              setNumSeedling(data.Number_Seed);
                              setNumGrowSeedling(data.Grow_Number);
                              setShowEditSeedling(true);
                            }}
                          >
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </button>

                          <button
                            className="Button-Delete-Table-AddSeeding"
                            onClick={() => {
                              setIDSeedling(data.ID_Seedling);
                              setIDSeedSet(data.ID_Seed);
                              setLocation(data.Location_Seedling);
                              setDateSeedling(data.Date_Seed);
                              setNumSeedling(data.Number_Seed);
                              setNumGrowSeedling(data.Grow_Number);
                              setShowDeleteSeedling(true);
                            }}
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                          <button
                            onClick={() => {
                              setIDSeedling(data.ID_Seedling);
                              setIDSeedSet(data.ID_Seed);
                              setLocation(data.Location_Seedling);
                              setDateSeedling(data.Date_Seed);
                              setNumSeedling(data.Number_Seed);
                              setNumGrowSeedling(data.Grow_Number);
                              setShowAddGrow(true);
                            }}
                          >
                            เพิ่มจำนวนเมล็ดที่งอก{"&"}แก้ไข
                          </button>
                          <button
                            className="Button-Edit-Table-AddSeeding"
                            onClick={() => {
                              setIDSeedling(data.ID_Seedling);
                              setIDSeedSet(data.ID_Seed);
                              setLocation(data.Location_Seedling);
                              setDateSeedling(data.Date_Seed);
                              setNumSeedling(data.Number_Seed);
                              setNumGrowSeedling(data.Grow_Number);
                              setNumtoSST(data.NumtoSST);
                              setShowAddToSST(true);
                            }}
                          >
                            นำเข้าขั้นตอน SST
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
      if (NumGrowSeedling === "") {
        return (
          <>
            <div className="div-Table-AddSeeding">
              <table id="t01">
                <tr>
                  <th>ID การเพาะเมล็ด</th>
                  <th>ID กลุ่มเมล็ด</th>
                  <th>สถานที่เพาะปลูก</th>
                  <th>วันที่เพาะปลูก</th>
                  <th>จำนวนเมล็ดที่เพาะ</th>
                  <th>จำนวนเมล็ดที่งอก</th>
                  <th>จำนวนต้นกล้าที่ลงแปลง</th>

                  <th>Edit</th>
                </tr>
                <>
                  <tr>
                    <td>{idSeedling}</td>
                    <td>{idSeedSet}</td>
                    <td>{Location}</td>
                    <td>{DateSeedling}</td>
                    <td>{NumSeedling}</td>
                    <td>{NumGrowSeedling}</td>
                    <td>{numtoSST}</td>

                    <td>
                      <button
                        className="Button-Edit-Table-AddSeeding"
                        onClick={() => {
                          setShowEditSeedling(true);
                        }}
                      >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>

                      <button
                        className="Button-Delete-Table-AddSeeding"
                        onClick={() => {
                          setShowDeleteSeedling(true);
                        }}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>

                      <button
                        onClick={() => {
                          setShowAddGrow(true);
                        }}
                      >
                        เพิ่มจำนวนเมล็ดที่งอก{"&"}แก้ไข
                      </button>
                    </td>
                  </tr>
                </>
              </table>
            </div>
            ;
          </>
        );
      } else {
        return (
          <>
            <div className="div-Table-AddSeeding">
              <table id="t01">
                <tr>
                  <th>ID การเพาะเมล็ด</th>
                  <th>ID กลุ่มเมล็ด</th>
                  <th>สถานที่เพาะปลูก</th>
                  <th>วันที่เพาะปลูก</th>
                  <th>จำนวนเมล็ดที่เพาะ</th>
                  <th>จำนวนเมล็ดที่งอก</th>
                  <th>จำนวนต้นกล้าที่ลงแปลง</th>
                </tr>
                <>
                  <tr>
                    <td>{idSeedling}</td>
                    <td>{idSeedSet}</td>
                    <td>{Location}</td>
                    <td>{DateSeedling}</td>
                    <td>{NumSeedling}</td>
                    <td>{NumGrowSeedling}</td>
                    <td>{numtoSST}</td>
                    <td></td>
                    <td>
                      <button
                        className="Button-Edit-Table-AddSeeding"
                        onClick={() => {
                          setShowEditSeedling(true);
                        }}
                      >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>

                      <button
                        className="Button-Delete-Table-AddSeeding"
                        onClick={() => {
                          setShowDeleteSeedling(true);
                        }}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>

                      <button
                        onClick={() => {
                          setShowAddToSST(true);
                        }}
                      >
                        นำเข้าขั้นตอน SST
                      </button>
                    </td>
                  </tr>
                </>
              </table>
            </div>
            ;
          </>
        );
      }
    }
  };
  return (
    <>
      <div className="Body-AddSeedling">
        <Bar />

        <div className="Head-AddSeedling">
          <div className="div-Head-Left-Side">
            <p className="P-seeding">การเพาะเมล็ด</p>
          </div>
          <div className="div-Head-Right-Side">
            <button
              onClick={() => {
                setShowAddSeedling(true);
              }}
            >
              เพิ่มการเพาะเมล็ด
            </button>
          </div>
          <div class="div-Area-Search">
            <Autocomplete
              id="combo-box-demo"
              options={search}
              onChange={(e, value) => {
                if (value) {
                  setIdSearch(value.ID_Seedling);
                  setIDSeedling(value.ID_Seedling);
                  setIDSeedSet(value.ID_Seed);
                  setLocation(value.Location_Seedling);
                  setDateSeedling(value.Date_Seed);
                  setNumSeedling(value.Number_Seed);
                  setNumGrowSeedling(value.Grow_Number);
                  setNumtoSST(value.NumtoSST);
                } else {
                  setIdSearch("");
                }
              }}
              getOptionLabel={option => option.ID_Seedling}
              style={{ width: 300, height: 50 }}
              size="small"
              renderInput={params => (
                <TextField {...params} label="Search" variant="outlined" />
              )}
            />
          </div>
        </div>
        {showAll()}
      </div>
      <ModalShowAddSeedling
        show={showAddSeedling}
        handleClose={() => {
          setShowAddSeedling(false);
        }}
      />

      <ModalShowEditSeedling
        show={showEditSeedling}
        handleClose={() => {
          setShowEditSeedling(false);
        }}
      />
      <ModalShowDeleteSeedling
        show={showDeleteSeedling}
        handleClose={() => {
          setShowDeleteSeedling(false);
        }}
      />

      <ModalShowAddGrow
        show={showAddGrow}
        handleClose={() => {
          setShowAddGrow(false);
        }}
      />

      <ModalShowAddtoSST
        show={showAddToSST}
        handleClose={() => {
          setShowAddToSST(false);
        }}
      />
    </>
  );
}
export default AddSeedling;
