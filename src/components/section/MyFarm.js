import React, { useEffect } from "react";
import "../section/Profile.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./MyFarm.css";
import fetch from "node-fetch";
function MyFarm() {
  const [showModalAddFarm, setShowModalAddFarm] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataFarm, setDataFarm] = useState([]);
  const [toFarmName, setToFarmName] = useState("");
  const [toFarmLocation, setToFarmLocation] = useState("");
  const [toFarmID, setToFarmID] = useState("");
  const [loading, setLoading] = useState(true);
  // const [clickEdit, setClickEdit] = useState(false);

  useEffect(() => {
    const init = async () => {
      const ID_User = Cookies.get("Id_User");
      const get = await axios({
        url: "http://localhost:3005/myFarm/search",
        withCredentials: true,
        method: "POST",
        data: { ID_User },
      });
      setDataFarm(get.data.data);
    };
    setLoading(true);
    init();
  }, [loading]);

  const handleShow = () => {
    setShow(!show);
  };
  const handleShowModalAddFarm = () => {
    setShowModalAddFarm(true);
  };
  const handleCloseModalAddFarm = () => {
    setShowModalAddFarm(false);
  };

  const ModalAddFarm = ({ handleClose, show }) => {
    const [FarmName, setFarmName] = useState("");
    const [Location, setLocation] = useState("");
    const [er, setEr] = useState(false);
    const [error, setError] = useState({
      FarmName: false,
      Location: false,
      massage1: "",
      massage2: "",
    });
    const hadleBlurName = e => {
      const Temail = e.target.value;
      if (!Temail) {
        setError({
          FarmName: true,
          massage1: "FarmName is required.",
        });
      } else {
        setError({
          FarmName: false,
        });
      }
    };

    const handleFarmName = e => {
      if (e.target.value) {
        setFarmName(e.target.value);
      }
    };
    const handleLocation = e => {
      if (e.target.value) {
        setLocation(e.target.value);
      }
    };
    const handleSubmitFarm = async () => {
      if (
        error.FarmName === true ||
        error.Location === true ||
        FarmName === "" ||
        Location === ""
      ) {
        // alert("กรุณากรอกข้อมูลให้ครบ");
        setEr(true);
      } else {
        setEr(false);
        setLoading(false);
        setShowModalAddFarm(false);
        const ID = Cookies.get("Id_User");
        const get = await axios({
          url: "http://localhost:3005/myFarm",
          withCredentials: true,
          method: "POST",
          data: { FarmName, Location, ID },
        });
        // const requestOptions = {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ FarmName, Location, ID }),
        // };
        // await fetch("http://localhost:3005/myFarm", requestOptions);
      }
    };
    return (
      <div className={show ? "Modal-AddFarm" : "display-none"}>
        <section className="modal-main-Farm">
          <p className="Head-Yourfarm">Your Farm</p>

          <p className="P-FarmName">Farm Name</p>
          <input
            type="text"
            className="Input-Modal-Myfarm"
            onChange={handleFarmName}
            onBlur={hadleBlurName}
          />
          {error.FarmName && <div className="error1">{error.massage1}</div>}
          <p className="P-LocationFarm">Location Farm</p>
          <input
            type="text"
            className="Input-Modal-Myfarm"
            onChange={handleLocation}
          />
          {er && <div className="error1">"กรุณากรอกข้อมูลให้ครบ"</div>}
          <button className="Button-close-Myfarm" onClick={handleClose}>
            Close
          </button>
          <button className="Button-submit-Myfarm" onClick={handleSubmitFarm}>
            summit
          </button>
        </section>
      </div>
    );
  };
  const updateFarm = async () => {
    setLoading(false);
    const get = await axios({
      url: "http://localhost:3005/myFarm/update",
      withCredentials: true,
      method: "POST",
      data: { toFarmID, toFarmLocation, toFarmName },
    });
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ toFarmID, toFarmLocation, toFarmName }),
    // };
    // await fetch("http://localhost:3005/myFarm/update", requestOptions);
  };
  return (
    <div className="Body-MyFarm">
      {!show && (
        <div>
          <h1 className="div-Area-Head-Page">MY FARM</h1>
          <div className="Container-MyFarm">
            {dataFarm.map((data, index) => {
              return (
                <li className="List-MyFarm" key={`${data}-${index}`}>
                  <Link
                    className="Link-Card-Myfarm"
                    onClick={() => {
                      setToFarmName(data.FarmName);
                      setToFarmLocation(data.Location);
                      setToFarmID(data.ID_Farm);
                      handleShow();
                    }}
                  >
                    <div className="Card-Myfarm">
                      <div className="area-bar">
                        <i
                          className="fa fa-folder-open-o"
                          id="Icon-Myfarm"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div className="Area-Name-Myfarm">
                        <p>{data.FarmName}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
            <div className="div-Card">
              <Link onClick={handleShowModalAddFarm}>
                <i
                  class="fa fa-plus-square-o"
                  id="Button-Add-Myfarm"
                  aria-hidden="true"
                ></i>
              </Link>
            </div>
          </div>
        </div>
      )}
      {/*  Edit*/}
      {show && (
        <div className={"Container"}>
          <div className="ShowMe">
            <img
              className="img-Myfarm"
              src="https://media-cdn.tripadvisor.com/media/photo-s/10/be/95/11/arial-of-the-farm-and.jpg"
              alt=""
            />

            {!showEdit && (
              <>
                <p>Farm Name : {toFarmName}</p>
                <p>Location : {toFarmLocation}</p>
                <button
                  className="Button-edit-Myfarm"
                  onClick={() => {
                    setShowEdit(true);
                  }}
                >
                  Edit
                </button>
                <button className="Button-close1-Myfarm" onClick={handleShow}>
                  Close
                </button>
              </>
            )}
            {showEdit && (
              <>
                <p className="P-FarmName-Edit">Farm Name :</p>

                <input
                  className="Input-Myfarm"
                  type="text"
                  placeholder={toFarmName}
                  value={toFarmName}
                  onChange={e => {
                    e
                      ? setToFarmName(e.target.value)
                      : setToFarmName(toFarmLocation);
                  }}
                />

                <p className="P-Location-Edit">Location:</p>

                <input
                  className="Input-Myfarm"
                  type="text"
                  placeholder={toFarmLocation}
                  value={toFarmLocation}
                  onChange={e => {
                    e
                      ? setToFarmLocation(e.target.value)
                      : setToFarmLocation(toFarmLocation);
                  }}
                />

                <div>
                  <button
                    className="Button-save-Myfarm"
                    onClick={() => {
                      updateFarm();
                      // setClickEdit(true);
                      setShowEdit(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="Button-close1-Myfarm"
                    onClick={() => setShowEdit(false)}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/*  */}
      <ModalAddFarm
        show={showModalAddFarm}
        handleClose={handleCloseModalAddFarm}
      ></ModalAddFarm>
    </div>
  );
}

export default MyFarm;
