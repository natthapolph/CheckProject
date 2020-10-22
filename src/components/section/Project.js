import React, { useState, useEffect } from "react";
import "../section/Project.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import fetch from "node-fetch";
import axios from "axios";
function ProJect() {
  const [dataProject, setDataProject] = useState([]);
  const [showCreate, setShowCreate] = useState(true);
  const [showJoin, setShowJoin] = useState(false);
  const [showButtonCreate, setShowButtonCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const ID_User = Cookies.get("Id_User");
      const get = await axios({
        url: "http://localhost:3005/myProject",
        withCredentials: true,
        method: "POST",
        data: { ID_User },
      });
      setDataProject(get.data.data);
      setLoading(true);
      // const requestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ID_User }),
      // };
      // await fetch("http://localhost:3005/myProject", requestOptions)
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data.data);
      //     setDataProject(data.data);
      //   });
    };
    init();
  }, [loading]);

  const handleshowButtonCreate = () => {
    setShowButtonCreate(true);
  };
  const handleCloseButtonCreate = () => {
    setShowButtonCreate(false);
  };
  const ModalShowButtonCreate = ({ handleClose, show, children }) => {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [codeJoin, setCodeJoin] = useState("");
    const [er, setEr] = useState(false);
    const [er2, setEr2] = useState(false);
    const [ckAdd, setCkAdd] = useState(false);
    const [error, setError] = useState({
      name: true,
      des: true,
      join: true,
      massage1: "",
      massage2: "",
      massage3: "",
    });

    // useEffect(() => {
    //   const add = async () => {
    //     const ID_User = Cookies.get("Id_User");
    //     const get = await axios({
    //       url: "http://localhost:3005/createProject",
    //       withCredentials: true,
    //       method: "POST",
    //       data: { projectName, projectDescription, ID_User },
    //     });
    //     // const requestOptions = {
    //     //   method: "POST",
    //     //   headers: { "Content-Type": "application/json" },
    //     //   body: JSON.stringify({ projectName, projectDescription, ID_User }),
    //     // };
    //     // await fetch("http://localhost:3005/createProject", requestOptions);
    //     console.log("working Create");
    //   };
    //   console.log("working Start");
    //   if (ckAdd === false) {
    //     console.log("S");
    //   } else {
    //     add();
    //     console.log("working Create in if");
    //   }
    // }, [ckAdd]);

    const hadleBlurName = e => {
      const Temail = e.target.value;
      if (!Temail) {
        setError({
          name: true,
          massage1: "Project Name is required.",
        });
      } else {
        setError({
          name: false,
        });
      }
    };
    const hadleBlurDes = e => {
      const Temail = e.target.value;
      if (!Temail) {
        setError({
          des: true,
          massage2: "Project Description is required.",
        });
      } else {
        setError({
          des: false,
        });
      }
    };
    const hadleBlurJoin = e => {
      const Temail = e.target.value;
      if (!Temail) {
        setError({
          join: true,
          massage3: "Code Project is required.",
        });
      } else {
        setError({
          join: false,
        });
      }
    };
    const handleSubmitCreateProject = async () => {
      if (projectName === "" || projectDescription === "") {
        setEr(true);
      } else {
        console.log("state ckAdd Change");
        setLoading(false);
        setShowButtonCreate(false);
        const ID_User = Cookies.get("Id_User");
        const sendDataCreate = await axios({
          url: "http://localhost:3005/createProject",
          withCredentials: true,
          method: "POST",
          data: { projectName, projectDescription, ID_User },
        });
        console.log(sendDataCreate);
      }
    };
    const handleSubmitJoinProject = async () => {
      if (codeJoin === "") {
        setEr2(true);
      } else {
        setLoading(false);
        setShowButtonCreate(false);
        const ID_User = Cookies.get("Id_User");
        console.log(ID_User);
        const get = await axios({
          url: "http://localhost:3005/JoinProject",
          withCredentials: true,
          method: "POST",
          data: { ID_User, codeJoin },
        });
        alert(get.data.massage);

        // const requestOptions = {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ ID_User, codeJoin }),
        // };
        // await fetch("http://localhost:3005/JoinProject", requestOptions)
        //   .then(response => response.json())
        //   .then(data => {
        //     alert(data.massage);
        //     // setDataFarm(data.data);
        //   });
        // const sendDataCreate = await axios({
        //   url: "http://localhost:3005/JoinProject",
        //   method: "POST",
        //   data: { codeJoin, ID_User },
        // });
        // console.log(sendDataCreate.data.massage);
        // alert(sendDataCreate.data.massage);
      }
    };
    return (
      <div className={show ? "Modal-showButtonCreate" : "display-none"}>
        <section className="modal-main-Project">
          {children}
          <button
            className="Button-Creat-Project"
            onClick={() => {
              setShowCreate(true);
              setShowJoin(false);
            }}
          >
            Create Project
          </button>
          <button
            className="Button-Join-Project"
            onClick={() => {
              setShowJoin(true);
              setShowCreate(false);
            }}
          >
            Join Project
          </button>

          <div className={showCreate ? "Create" : "display-none"}>
            <p className="h1-Project-Name">Project Name</p>
            <input
              className="Input-Modal-Project"
              type="text"
              onBlur={hadleBlurName}
              onChange={e => {
                setProjectName(e.target.value);
              }}
            />
            {error.name && <div className="error1">{error.massage1}</div>}
            <p>Description</p>
            <input
              className="Input-Modal-Project"
              type="text"
              onBlur={hadleBlurDes}
              onChange={e => {
                setProjectDescription(e.target.value);
              }}
            />
            {error.des && <div className="error1">{error.massage2}</div>}
            {er && <div className="error1">"กรุณากรอกข้อมูลให้ครบ"</div>}
            <button className="Button-close-Project" onClick={handleClose}>
              Close
            </button>
            <button
              className="Button-submit-Project"
              disabled={error.des || error.name}
              onClick={() => {
                handleSubmitCreateProject();
              }}
            >
              Submit
            </button>
          </div>

          <div className={showJoin ? "Join" : "display-none"}>
            <p className="P-Code-Project">Enter Code Project</p>
            <input
              type="text"
              className="Input-Modal-Project"
              onBlur={hadleBlurJoin}
              onChange={e => {
                setCodeJoin(e.target.value);
              }}
            />
            {er2 && <div className="error1">กรุณากรอก Code โปรเจค</div>}
            <button className="Button-close-Project" onClick={handleClose}>
              Close
            </button>
            <button
              className="Button-join-Project"
              // disabled={error.join}
              onClick={() => {
                handleSubmitJoinProject();
              }}
            >
              Join
            </button>
          </div>
          {/* <button className="Button-close-Project" onClick={handleClose}>close</button> */}
        </section>
      </div>
    );
  };

  return (
    <div className="Body-Project">
      <div className="div-Area-Head-Page">
        <h1>MY PROJECT</h1>
      </div>
      <div className="Container-Project">
        {dataProject.map((data, index) => {
          return (
            <li className="List-Project" key={`${data}-${index}`}>
              <Link
                className="Area-List-Card"
                to="/farm"
                onClick={() => {
                  Cookies.set("IdProject", data.ID_Project);
                  Cookies.set("ProjectName", data.ProjectName);
                  Cookies.set("ProjectDes", data.Description);
                }}
              >
                {/* <Link className="Link-Card-Project"> */}
                <div className="Card-project">
                  <div className="area-bar">
                    <i
                      className="fa fa-folder-open-o"
                      id="Icon-Project"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="Area-Name-Project">
                    <p className="P-NameProject">{data.ProjectName}</p>
                  </div>
                </div>
                {/* </Link> */}
              </Link>
            </li>
          );
        })}
        <div className="Card-project5">
          <Link onClick={handleshowButtonCreate}>
            <i
              className="fa fa-plus-square-o"
              id="Button-Add-MyProject"
              aria-hidden="true"
            ></i>
          </Link>
        </div>
      </div>

      <ModalShowButtonCreate
        show={showButtonCreate}
        handleClose={handleCloseButtonCreate}
      />
    </div>
  );
}
export default ProJect;
