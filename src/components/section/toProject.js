import React, { useState, useEffect } from "react";
import Farm from "./sectionDetail/Farm";
import Breeder from "./sectionDetail/Breeder";
import Breeding from "./sectionDetail/Breeding";
import "./toProject.css";
import Cookies from "js-cookie";
import axios from "axios";
import Manage from "./sectionDetail/Manage";
import Seedling from "./sectionDetail/Seedling";
// import StepSST from "./sectionDetail/StepSST";
// import AddSeedling from "./sectionDetail/AddSeedling";

function Login() {
  const [showFarm, setShowFarm] = useState(true);
  const [showBreeder, setShowBreeder] = useState(false);
  const [showBreeding, setShowBreeding] = useState(false);
  const [showSeed, setShowSeed] = useState(false);
  const [showSeedling, setShowSeedling] = useState(false);
  const [toProName, setToProName] = useState("");
  const [toProDescription, setToProDescription] = useState("");

  const [showAddSST, setShowAddSST] = useState(false);
  const [toProID, setToProID] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSetting, setShowSetting] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [ckEditName, setckEditName] = useState(false);
  const [ckEditDescription, setckEditDescription] = useState(false);
  const initInProject = async () => {
    const ID_user = Cookies.get("Id_User");
    const toProID = Cookies.get("IdProject");
    const getAll = await axios({
      url: "http://localhost:3005/getDetailProject",
      method: "POST",
      data: { toProID, ID_user },
    });
    setToProID(getAll.data.data.ID_Project);
    setToProName(getAll.data.data.ProjectName);
    setToProDescription(getAll.data.data.Description);
  };
  useEffect(() => {
    setLoading(true);
    initInProject();
  }, [loading]);

  const handleSaveEditName = async () => {
    const edit = await axios({
      url: "http://localhost:3005/myProject/EditName",
      method: "POST",
      data: { editName, toProID },
    });
    console.log(edit);
    setLoading(false);
  };
  const handleSaveEditDis = async () => {
    const edit = await axios({
      url: "http://localhost:3005/myProject/EditDescription",
      method: "POST",
      data: { editDescription, toProID },
    });
    console.log(edit);
    setLoading(false);
  };

  return (
    <>
      <div className="Body-Toproject">
        <div className="Container-Toproject">
          <div className="Header-inProject">
            <div className="Datail-Name-inProject">
              <p>Project Name :{toProName}</p>
            </div>

            <div className="Detail-Description-inProject">
              <p>Description:{toProDescription}</p>
            </div>

            <div className="Setting-inProject">
              <button
                className="setting"
                onClick={() => {
                  setShowSetting(!showSetting);
                  setShowBreeder(false);
                  setShowFarm(false);
                  setShowSeed(false);
                  setShowBreeding(false);
                  setShowAddSST(false);
                  setShowSeedling(false);
                }}
              >
                <button className="Button-Setting-inProject">Setting</button>
              </button>
            </div>
          </div>
          {!showSetting && (
            <ul className="Menu-Bar-Toproject">
              <li>
                <button
                  className="Button-Menu-to-Project"
                  onClick={() => {
                    setShowFarm(true);
                    setShowBreeder(false);
                    setShowSeed(false);
                    setShowBreeding(false);
                    setShowAddSST(false);
                    setShowSeedling(false);
                  }}
                >
                  ฟาร์ม
                </button>
              </li>
              <li>
                <button
                  className="Button-Menu-to-Project"
                  onClick={() => {
                    setShowFarm(false);
                    setShowBreeder(true);
                    setShowSeed(false);
                    setShowBreeding(false);
                    setShowAddSST(false);
                    setShowSeedling(false);
                  }}
                >
                  สายพันธุ์
                </button>
              </li>
              <li>
                <button
                  className="Button-Menu-to-Project"
                  onClick={() => {
                    setShowFarm(false);
                    setShowBreeder(false);
                    setShowSeed(false);
                    setShowBreeding(true);
                    setShowAddSST(false);
                    setShowSeedling(false);
                  }}
                >
                  การผสมพันธุ์
                </button>
              </li>
              <li>
                <button
                  className="Button-Menu-to-Project"
                  onClick={() => {
                    setShowFarm(false);
                    setShowBreeder(false);
                    setShowSeed(true);
                    setShowBreeding(false);
                    setShowAddSST(false);
                    setShowSeedling(false);
                  }}
                >
                  กลุ่มของเมล็ด
                </button>
              </li>
              <li>
                <button
                  className="Button-Menu-to-Project"
                  onClick={() => {
                    setShowFarm(false);
                    setShowBreeder(false);
                    setShowSeed(false);
                    setShowBreeding(false);
                    setShowAddSST(false);
                    setShowSeedling(true);
                  }}
                >
                  การเพาะเมล็ด
                </button>
              </li>
              <li>
                <button
                  className="Button-Menu-to-Project"
                  onClick={() => {
                    setShowFarm(false);
                    setShowBreeder(false);
                    setShowSeed(false);
                    setShowBreeding(false);
                    setShowAddSST(true);
                    setShowSeedling(false);
                  }}
                >
                  SST
                </button>
              </li>
              <li>
                <button className="Button-Menu-to-Project">CST</button>
              </li>
              <li>
                <button className="Button-Menu-to-Project">PST</button>
              </li>
              <li>
                <button className="Button-Menu-to-Project">AST</button>
              </li>
              <li>
                <button className="Button-Menu-to-Project">RST</button>
              </li>
              <li>
                <button className="Button-Menu-to-Project">Search</button>
              </li>
            </ul>
          )}
          {showSetting && (
            <>
              <h1>Edit Project</h1>
              {!ckEditName && (
                <>
                  <label>Project Name : {toProName}</label>
                  <button
                    className="Button-Edit-Pencil"
                    onClick={() => {
                      setckEditName(true);
                    }}
                  >
                    <i
                      id="Edit-Pencil"
                      class="fa fa-pencil-square-o"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <br />
                </>
              )}
              {ckEditName && (
                <>
                  <label>Project Name :</label>
                  <input
                    className="Input-Project-Name-toProject"
                    type="text"
                    placeholder={toProName}
                    id={toProName}
                    onChange={e => {
                      e ? setEditName(e.target.value) : setEditName(toProName);
                    }}
                  />
                  <button
                    className="Button-Edit-correct"
                    onClick={() => {
                      setToProName(editName);

                      handleSaveEditName();
                      setckEditName(false);
                    }}
                  >
                    <i
                      id="Icon-correct"
                      class="fa fa-check-circle-o"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <button
                    className="Button-Edit-X"
                    onClick={() => {
                      setckEditName(false);
                    }}
                  >
                    <i
                      id="Icon-X"
                      class="fa fa-times-circle-o"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <br />
                </>
              )}
              {!ckEditDescription && (
                <>
                  <label>Project Description : {toProDescription}</label>
                  <button
                    className="Button-Edit-Pencil"
                    onClick={() => {
                      setckEditDescription(true);
                    }}
                  >
                    <i
                      id="Edit-Pencil"
                      class="fa fa-pencil-square-o"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <br />
                </>
              )}
              {ckEditDescription && (
                <>
                  <label>Project Description :</label>
                  <input
                    className="Input-Project-Description-toProject"
                    type="text"
                    placeholder={toProDescription}
                    onChange={e => {
                      e
                        ? setEditDescription(e.target.value)
                        : setEditDescription(toProDescription);
                    }}
                  />
                  <button
                    className="Button-Edit-correct"
                    onClick={() => {
                      setToProDescription(editDescription);
                      handleSaveEditDis();
                      setckEditDescription(false);
                    }}
                  >
                    <i
                      id="Icon-correct"
                      class="fa fa-check-circle-o"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <button
                    className="Button-Edit-X"
                    onClick={() => {
                      setckEditDescription(false);
                    }}
                  >
                    <i
                      id="Icon-X"
                      class="fa fa-times-circle-o"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <br />
                </>
              )}

              <br />

              <h1>
                --------------------------------------------------------------------------------------------------------------------------------------------------
              </h1>
              <Manage />
            </>
          )}
          <div className={showFarm ? "Container-Farm" : "display-none"}>
            <Farm></Farm>
          </div>

          <div className={showBreeder ? "Container-Breeder" : "display-none"}>
            <Breeder></Breeder>
          </div>

          <div className={showSeed ? "Container-Seed" : "display-none"}>
            <Seedling></Seedling>
          </div>
          <div className={showBreeding ? "Container-Seed" : "display-none"}>
            <Breeding></Breeding>
          </div>
          {/* <div className={showSeedling ? "Container-Seed" : "display-none"}>
            <AddSeedling />
          </div>
          <div className={showAddSST ? "Container-Seed" : "display-none"}>
            <StepSST />
          </div> */}
        </div>
      </div>
    </>
  );
}
export default Login;
