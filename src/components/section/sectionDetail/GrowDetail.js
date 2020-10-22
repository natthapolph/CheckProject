import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Bar from "./bar";
import "./GrowSStDetail.css";

function GrowSSTDetail({ id, farm, block, plot }) {
  const [Date, setDate] = useState("");
  const [Germinate, setGerminate] = useState("");
  const [Grow, setGrow] = useState("");
  const [Area, setArea] = useState("");
  const [Disease, setDisease] = useState("");
  const [Insect, setInsect] = useState("");
  const [Product, setProduct] = useState("");
  const [idGrow, setIDGrow] = useState("");
  const [showEditGrow, setShowEditGrow] = useState(false);
  const [showDeleteGrow, setShowDeleteGrow] = useState(false);

  const [loading4, setLoading4] = useState(false);
  const [growSST, setGrowSST] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [maxSize, setMaxSize] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const initGrowSST = async () => {
      const toProID = Cookies.get("IdProject");
      const size = 5;
      const getAll = await axios({
        url: "http://localhost:3005/getGrowSST",
        withCredentials: true,
        method: "POST",
        data: { toProID, id, size, page },
      });
      setMaxSize(getAll.data.maxSize);
      setGrowSST(getAll.data.dataGrow);
    };
    initGrowSST();
    setLoading4(true);
  }, [page, loading4]);
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
  const ModalShowAddGrow = ({ handleClose, show }) => {
    const [date, setDate] = useState("");
    const [germinate, setGerminate] = useState("");
    const [grow, setGrow] = useState("");
    const [area, setArea] = useState("");
    const [disease, setDisease] = useState("");
    const [insect, setInsect] = useState("");
    const [product, setProduct] = useState("");
    const [error, setError] = useState({
      num: false,
      massage1: "",
    });
    const hadleBlur = e => {
      const Temail = e.target.value;
      if (Temail < 1) {
        setError({
          num: true,
          massage1: "ปริมาณผลผลิต ต้องมากกว่า 0",
        });
      } else if (!Temail) {
        setError({
          num: true,
          massage1: "กรุณาระบุ ปริมาณผลผลิต",
        });
      } else {
        setError({
          num: false,
        });
      }
    };
    const [er, setEr] = useState(false);
    const handleAdd = async () => {
      if (
        date === "" ||
        germinate === "" ||
        grow === "" ||
        area === "" ||
        disease === "" ||
        insect === "" ||
        product === ""
      ) {
        setEr(true);
      } else {
        setEr(false);
        setShowAdd(false);
        setLoading4(false);
        const ID_Project = Cookies.get("IdProject");
        const addFarm = await axios({
          url: "http://localhost:3005/createSSTGrow",
          withCredentials: true,
          method: "POST",
          data: {
            id,
            ID_Project,
            date,
            germinate,
            grow,
            area,
            disease,
            insect,
            product,
          },
        });
        console.log(addFarm);
      }
    };

    return (
      <div className={show ? "Modal-DetailFarm" : "display-none"}>
        <section className="modal-main-Project">
          <p className="P-Add-Detail-Grow-ID-modal">
            เพิ่มข้อมูลการเจริญเติบโต ID:{id}
          </p>
          <br />
          <label>
            <p>ฟาร์ม : {farm}</p>
            <p>Block : {block}</p>
            <p>Plot Unit : {plot}</p>
          </label>
          <br />
          <div className="div-Area-inline">
            <p>วันที่บันทึก</p>
            <input
              className="Input-Date-Grow"
              type="date"
              onChange={e => {
                setDate(e.target.value);
              }}
            />
          </div>
          <p>ความงอก</p>
          <textarea
            className="Input-border"
            name=""
            id=""
            cols="65"
            rows="3"
            onChange={e => {
              setGerminate(e.target.value);
            }}
            // placeholder="ความงอก"
          />
          <p>การเจริญเติบโต</p>
          <textarea
            className="Input-border"
            name=""
            id=""
            cols="65"
            rows="3"
            onChange={e => {
              setGrow(e.target.value);
            }}
            // placeholder="การเจริญเติบโต"
          />
          <p>การคลุมพื้นที่</p>
          <textarea
            className="Input-border"
            name=""
            id=""
            cols="65"
            rows="3"
            onChange={e => {
              setArea(e.target.value);
            }}
            // placeholder="การคลุมพื้นที่"
          />
          <p>โรค</p>
          <textarea
            className="Input-border"
            name=""
            id=""
            cols="65"
            rows="3"
            onChange={e => {
              setDisease(e.target.value);
            }}
            // placeholder="โรค"
          />
          <p>แมลง</p>
          <textarea
            className="Input-border"
            name=""
            id=""
            cols="65"
            rows="3"
            onChange={e => {
              setInsect(e.target.value);
            }}
            // placeholder="แมลง"
          />
          <div className="div-Area-inline">
            <p>ปริมาณผลผลิต</p>
            <input
              className="Input-Number-Anount-Value"
              type="number"
              onBlur={hadleBlur}
              placeholder={0}
              min={0}
              onChange={e => {
                setProduct(e.target.value);
              }}
            />
          </div>
          {error.num && <div className="error1">{error.massage1}</div>}
          {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
          <button
            className="Button-Add-GrowSSTDetail-modal"
            onClick={() => {
              handleAdd();
            }}
          >
            Add
          </button>
          <button
            className="Button-Close-GrowSSTDetail-modal"
            onClick={handleClose}
          >
            Close
          </button>
        </section>
      </div>
    );
  };

  const ModalShowEdit = ({ handleClose, show }) => {
    const [Date2, setDate2] = useState(Date);
    const [Germinate2, setGerminate2] = useState(Germinate);
    const [Grow2, setGrow2] = useState(Grow);
    const [Area2, setArea2] = useState(Area);
    const [Disease2, setDisease2] = useState(Disease);
    const [Insect2, setInsect2] = useState(Insect);
    const [Product2, setProduct2] = useState(Product);
    const handleEdit = async () => {
      setLoading4(false);
      const getAll = await axios({
        url: "http://localhost:3005/editGrowSST",
        withCredentials: true,
        method: "POST",
        data: {
          idGrow,
          Date2,
          Germinate2,
          Grow2,
          Area2,
          Disease2,

          Insect2,
          Product2,
        },
      });
      console.log(getAll);
    };
    return (
      <div className={show ? "Modal-DetailFarm" : "display-none"}>
        <section className="modal-main-Project">
          <label htmlFor="">วันที่บันทึก</label>{" "}
          <input
            type="date"
            onChange={e => {
              setDate2(e.target.value);
            }}
          />
          <br />
          <p>ความงอก</p>
          <textarea
            name=""
            id=""
            cols="65"
            rows="3"
            onChange={e => {
              setGerminate2(e.target.value);
            }}
          >
            {Germinate}
          </textarea>
          <br />
          <p>การเจริญเติบโต</p>
          <textarea
            name=""
            id=""
            cols="65"
            rows="3"
            onChange={e => {
              setGrow2(e.target.value);
            }}
          >
            {Grow}
          </textarea>
          <br />
          <p>การคลุมพื้นที่</p>
          <textarea
            name=""
            id=""
            cols="65"
            rows="3"
            onChange={e => {
              setArea2(e.target.value);
            }}
          >
            {Area}
          </textarea>
          <br />
          <p>โรค</p>
          <textarea
            name=""
            id=""
            cols="65"
            rows="3"
            onChange={e => {
              setDisease2(e.target.value);
            }}
          >
            {Disease}
          </textarea>
          <br />
          <p>แมลง</p>
          <textarea
            name=""
            id=""
            cols="65"
            rows="3"
            onChange={e => {
              setInsect2(e.target.value);
            }}
          >
            {Insect}
          </textarea>
          <br />
          <label htmlFor="">ปริมาณผลผลิต</label>
          <input
            type="number"
            min={0}
            placeholder={Product}
            onChange={e => {
              e ? setProduct2(e.target.value) : console.log("");
            }}
          />
          <br />
          <button
            onClick={() => {
              handleEdit();
              handleClose();
            }}
          >
            บันทึก
          </button>
          <button className="Button-close-Farm-modal" onClick={handleClose}>
            close
          </button>
        </section>
      </div>
    );
  };
  const ModalShowDelete = ({ handleClose, show }) => {
    const handleDelete = async () => {
      setLoading4(false);

      const addFarm = await axios({
        url: "http://localhost:3005/DeleteSSTGrow",
        withCredentials: true,
        method: "POST",
        data: {
          idGrow,
        },
      });
      console.log(addFarm);
    };

    return (
      <div className={show ? "Modal-DetailFarm" : "display-none"}>
        <section className="modal-main-Project">
          <h1>คุณต้องการที่จะลบบันทึก การเจริญเติบโตนี้</h1>
          <button
            onClick={() => {
              handleDelete();
              handleClose();
            }}
          >
            ใช่
          </button>
          <button onClick={handleClose}>ไม่</button>
        </section>
      </div>
    );
  };
  return (
    <>
      <div className="Body-GrowSStDetail">
        <Bar />

        <div className="Head-GrowSSTDetail">
          <div className="div-Head-Left-Side">
            <p>การเจริญเติบโต ของ {id}</p>
          </div>

          <div className="div-Head-Right-Side">
            <button
              onClick={() => {
                setShowAdd(true);
              }}
            >
              เพิ่มการเจริญเติบโต
            </button>
          </div>
        </div>
        <div className="div-Table-GrowSSTDetail">
          <table id="t01">
            <tr>
              <th>วันที่บันทึก</th>
              <th>ความงอก</th>
              <th>การเจริญเติบโต</th>
              <th>การคลุมพื้นที่</th>
              <th>โรค</th>
              <th>แมลง</th>
              <th>ปริมาณผลผลิต</th>
            </tr>
            {growSST.map(data => {
              return (
                <>
                  <tr>
                    <td>{data.Date}</td>
                    <td>{data.Germinate}</td>
                    <td>{data.Grow}</td>
                    <td>{data.Area}</td>
                    <td>{data.Disease}</td>
                    <td>{data.Insect}</td>
                    <td>{data.Product}</td>
                    <td>
                      <button
                        className="Button-Edit-Table-GrowSSTDetail"
                        onClick={() => {
                          setDate(data.Date);
                          setGerminate(data.Germinate);
                          setGrow(data.Grow);
                          setArea(data.Area);
                          setDisease(data.Disease);
                          setInsect(data.Insect);
                          setProduct(data.Product);
                          setIDGrow(data.ID_Grow);
                          setShowEditGrow(true);
                        }}
                      >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="Button-Delete-Table-GrowSSTDetail"
                        onClick={() => {
                          setDate(data.Date);
                          setGerminate(data.Germinate);
                          setGrow(data.Grow);
                          setArea(data.Area);
                          setDisease(data.Disease);
                          setInsect(data.Insect);
                          setProduct(data.Product);
                          setIDGrow(data.ID_Grow);
                          setShowDeleteGrow(true);
                        }}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>

        {/* 52555 */}
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
      <ModalShowEdit
        show={showEditGrow}
        handleClose={() => {
          setShowEditGrow(false);
        }}
      />
      <ModalShowDelete
        show={showDeleteGrow}
        handleClose={() => {
          setShowDeleteGrow(false);
        }}
      />

      <ModalShowAddGrow
        show={showAdd}
        handleClose={() => {
          setShowAdd(false);
        }}
      />
    </>
  );
}
export default GrowSSTDetail;
