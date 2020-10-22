import React from "react";
import "./Manage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Bar from "./bar";
function Manage({ s }) {
  const [loading, setLoading] = useState(false);
  const [getUserOwner, setUserOwner] = useState([]);
  const [getUserTa, setUserTa] = useState([]);
  const [getUserMember, setUserMember] = useState([]);
  const [show, setShow] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [status, setStatus] = useState("");
  const [MMemail, setMMEmail] = useState("");
  const [Memail, setMEmail] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [toProName, setToProName] = useState("");
  const [toProDescription, setToProDescription] = useState("");
  const [toProID, setToProID] = useState("");
  const ID_Pro = Cookies.get("IdProject");
  const [showAddMember, setShowAddMember] = useState(false);
  // const [showSetting, setShowSetting] = useState(false);
  const [massage, setMassage] = useState([]);
  const [checkMS, setCheckMS] = useState("");

  const [ckEditName, setckEditName] = useState(false);
  const [ckEditDescription, setckEditDescription] = useState(false);
  const [idPro, setIdPro] = useState("");
  const [idUser, setIdUser] = useState("");
  const [showCanCel, setShowCanCel] = useState(false);
  const [showAc, setShowAc] = useState(false);
  const Manageinit = async () => {
    console.log("---1---");
    const ID_user = Cookies.get("Id_User");
    const ID_Pro = Cookies.get("IdProject");
    console.log(ID_user);
    console.log(ID_Pro);
    const sendID_Project = await axios({
      url: "http://localhost:3005/getManage",
      withCredentials: true,
      method: "POST",
      data: { ID_Pro, ID_user },
    });

    setUserOwner(sendID_Project.data.dataOwner);

    setUserMember(sendID_Project.data.dataMember);

    setStatus(sendID_Project.data.Status);
    setUserTa(sendID_Project.data.dataTa);
    setToProID(sendID_Project.data.data.ID_Project);
    setToProName(sendID_Project.data.data.ProjectName);
    setToProDescription(sendID_Project.data.data.Description);
    setCheckMS(sendID_Project.data.massage);
    setMassage(sendID_Project.data.MassageManage);
    console.log(sendID_Project.data.MassageManage);
  };
  useEffect(() => {
    Manageinit();
    setLoading(true);
  }, [loading]);
  const handleSaveEditName = async () => {
    Cookies.set("ProjectName", editName);
    const edit = await axios({
      url: "http://localhost:3005/myProject/EditName",
      withCredentials: true,
      method: "POST",
      data: { editName, toProID },
    });
    console.log(edit);
    setLoading(false);
  };

  const handleSaveEditDis = async () => {
    Cookies.set("ProjectDes", editDescription);
    const edit = await axios({
      url: "http://localhost:3005/myProject/EditDescription",
      withCredentials: true,
      method: "POST",
      data: { editDescription, toProID },
    });
    console.log(edit);
    setLoading(false);
  };
  const handleCloseAddMember = () => {
    setShowAddMember(false);
  };
  const handleCloseShowSetOwner = () => {
    setShow(false);
  };
  const handleCloseShowDelete = () => {
    setShowDelete(false);
  };
  const handleChangetoMember = async () => {
    console.log(Memail);
    setLoading(false);
    const Change = await axios({
      url: "http://localhost:3005/getManage/changetomember",
      withCredentials: true,
      method: "POST",
      data: { Memail, ID_Pro },
    });
    console.log(Change);
  };
  const handleSetManage = async () => {
    console.log(Memail);
    setLoading(false);
    const Change = await axios({
      url: "http://localhost:3005/getManage/setStatus",
      withCredentials: true,
      method: "POST",
      data: { Memail, ID_Pro },
    });
    console.log(Change);
  };

  const handleDelete = async () => {
    setLoading(false);
    console.log(Memail);
    const Change = await axios({
      url: "http://localhost:3005/getManage/delete",
      withCredentials: true,
      method: "POST",
      data: { Memail, ID_Pro },
    });
    console.log(Change);
  };

  const ModalShowChange = ({ handleClose, show }) => {
    return (
      <div className={show ? "Modal-ShowSetOwner" : "display-none"}>
        <section className="modal-main-Project">
          <h1>คุณต้องการเปลี่ยน{MMemail}เป็นMember ใช่หรือไม่</h1>
          <button
            className="Button-close-modal-Manage"
            onClick={() => {
              handleChangetoMember();
              Manageinit();
              handleClose();
            }}
          >
            ใช่
          </button>
          <button className="Button-close-modal-Manage" onClick={handleClose}>
            ไม่
          </button>
        </section>
      </div>
    );
  };
  const ModalShowSetManage = ({ handleClose, show }) => {
    return (
      <div className={show ? "Modal-ShowSetOwner" : "display-none"}>
        <section className="modal-main-Project">
          <p>คุณต้องการเปลี่ยน{MMemail}เป็น Ta ใช่หรือไม่</p>
          <button
            className="Button-close-modal-Manage"
            onClick={() => {
              handleSetManage();
              Manageinit();
              handleClose();
            }}
          >
            ใช่
          </button>
          <button className="Button-close-modal-Manage" onClick={handleClose}>
            ไม่
          </button>
        </section>
      </div>
    );
  };
  const ModalShowSetDelete = ({ handleClose, show }) => {
    return (
      <div className={show ? "Modal-ShowSetOwner" : "display-none"}>
        <section className="modal-main-Project">
          <h1>คุณต้องการลบ {MMemail}ออกจากโปรเจคนี้ ใช่หรือไม่</h1>
          <button
            className="Button-close-modal-Manage"
            onClick={() => {
              handleDelete();
              Manageinit();
              handleClose();
            }}
          >
            ใช่
          </button>
          <button className="Button-close-modal-Manage" onClick={handleClose}>
            ไม่
          </button>
        </section>
      </div>
    );
  };

  const ModalShowAddMember = ({ handleClose, show }) => {
    const toProID = Cookies.get("IdProject");
    const proName = Cookies.get("ProjectName");
    const [addEmail, setAddEmail] = useState("");
    const [er, setEr] = useState(false);
    const handleAddMember = async () => {
      if (addEmail === "") {
        setEr(true);
      } else {
        setEr(false);
        setLoading(false);
        const sendAdd = await axios({
          url: "http://localhost:3005/myProject/Add",
          withCredentials: true,
          method: "POST",
          data: { addEmail, toProID, proName },
        });
        console.log(sendAdd.data.Massage);
        alert(sendAdd.data.Massage);
      }
    };
    return (
      <div className={show ? "Modal-ShowAddMember" : "display-none"}>
        <section className="modal-main-Project">
          <div className="Head-Add-Member">
            <p className="P-Add-Member-Inproject">AddMember in Project</p>
          </div>

          <div className="div-Enter-Email">
            <p className="P-Enter-Email">Enter Email</p>
          </div>
          <div className="div-Input-Email-AddMember">
            <input
              className="Input-Email-AddMember"
              type="text"
              placeholder="email"
              onChange={e => {
                setAddEmail(e.target.value);
              }}
            />
          </div>

          {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}
          <button
            className="Button-Add-modal-AddMember"
            onClick={() => {
              handleAddMember();
              handleClose();
            }}
          >
            Add
          </button>
          <button
            className="Button-close-modal-AddMember"
            onClick={handleClose}
          >
            close
          </button>
        </section>
      </div>
    );
  };

  const ModalShowCancel = ({ handleClose, show }) => {
    const handleAddMember = async () => {
      setLoading(false);
      const sendAdd = await axios({
        url: "http://localhost:3005/cancelAddMember",
        withCredentials: true,
        method: "POST",
        data: { idPro, idUser },
      });
      console.log(sendAdd);
    };
    return (
      <div className={show ? "Modal-ShowAddMember" : "display-none"}>
        <section className="modal-main-Project">
          <p>คุณต้องการยกเลิกการสมัครสมาชิก ใช่หรือไม่</p>
          <button
            className="Button-Add-modal-AddMember"
            onClick={() => {
              handleAddMember();
              handleClose();
            }}
          >
            ใช่
          </button>
          <button
            className="Button-close-modal-AddMember"
            onClick={handleClose}
          >
            ไม่
          </button>
        </section>
      </div>
    );
  };
  const ModalShowAcept = ({ handleClose, show }) => {
    const handleAddMember = async () => {
      setLoading(false);
      const sendAdd = await axios({
        url: "http://localhost:3005/acceptMember",
        withCredentials: true,
        method: "POST",
        data: { idPro, idUser },
      });
      console.log(sendAdd);
    };
    return (
      <div className={show ? "Modal-ShowAddMember" : "display-none"}>
        <section className="modal-main-Project">
          <p>ตอบรับคำขอสมัครสมาชิก</p>
          <button
            className="Button-Add-modal-AddMember"
            onClick={() => {
              handleAddMember();
              handleClose();
            }}
          >
            ใช่
          </button>
          <button
            className="Button-close-modal-AddMember"
            onClick={handleClose}
          >
            ไม่
          </button>
        </section>
      </div>
    );
  };
  const showMassage = () => {
    if (checkMS === "ไม่มีข้อมูล") {
      return (
        <>
          <div className="div-Area-invite">
            <h1>คำเชิญเข้าร่วมโปรเจค</h1>
            <h1>คำขอเข้าร่วมโปรเจค</h1>
          </div>
        </>
      );
    } else {
      try {
        return (
          <>
            <div className="div-Area-invite">
              <h1>คำเชิญเข้าร่วมโปรเจค</h1>

              {massage.map(data => {
                if (data.Massage === "คำเชิญเข้าร่วมโปรเจค") {
                  return (
                    <>
                      <div className="overflow">
                        <div className="div-Area-inline">
                          <span class="dot"></span>
                          <p>{data.Email}</p>
                          <div className="div-Area-Button-Massage">
                            <button
                              onClick={() => {
                                setIdPro(data.ID_Project);
                                setIdUser(data.ID_user);
                                setShowCanCel(true);
                              }}
                            >
                              ยกเลิก
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                } else {
                  return <></>;
                }
              })}

              <h1>คำขอเข้าร่วมโปรเจค</h1>
              {massage.map(data => {
                if (data.Massage === "คำขอเข้าร่วมโปรเจค") {
                  return (
                    <>
                      <div className="overflow">
                        <div className="div-Area-inline">
                          <p>{data.Email}</p>
                          <div className="div-Area-Button-Massage">
                            <button
                              onClick={() => {
                                setIdPro(data.ID_Project);
                                setIdUser(data.ID_user);
                                setShowAc(true);
                              }}
                            >
                              ยืนยัน
                            </button>
                            <button
                              className="Button-Cancle-Massage"
                              onClick={() => {
                                setIdPro(data.ID_Project);
                                setIdUser(data.ID_user);
                                setShowCanCel(true);
                              }}
                            >
                              ยกเลิก
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </>
        );
      } catch (error) {
        // alert(error);
      }
    }
  };

  const ShowEditProject = () => {
    return (
      <>
        <div class="div-Edit-Project">
          <h1>Edit Project</h1>
          {!ckEditName && (
            <>
              <div className="inline-Manage-Edit">
                <p>Project Name : {toProName}</p>
                <button
                  className="Button-Edit-Pencil"
                  onClick={() => {
                    setckEditName(true);
                    setEditName(toProName);
                  }}
                >
                  <i
                    id="Edit-Pencil"
                    class="fa fa-pencil-square-o"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </>
          )}
          {ckEditName && (
            <>
              <div className="inline-Manage-Edit">
                <p>Project Name :</p>
                <input
                  className="Input-Project-Name-toProject"
                  type="text"
                  placeholder={editName}
                  value={editName}
                  onChange={e => {
                    e ? setEditName(e.target.value) : setEditName(toProName);
                  }}
                />
                <div className="div-Area-C-X">
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
                </div>
              </div>
            </>
          )}
          {!ckEditDescription && (
            <>
              <div className="inline-Manage-Edit">
                <p>Project Description : {toProDescription}</p>
                <button
                  className="Button-Edit-Pencil"
                  onClick={() => {
                    setckEditDescription(true);
                    setEditDescription(toProDescription);
                  }}
                >
                  <i
                    id="Edit-Pencil"
                    class="fa fa-pencil-square-o"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </>
          )}
          {ckEditDescription && (
            <>
              <div className="inline-Manage-Edit">
                <p>Project Description :</p>
                <textarea
                  name=""
                  id=""
                  cols="70"
                  rows="3"
                  value={editDescription}
                  onChange={e => {
                    e
                      ? setEditDescription(e.target.value)
                      : setEditDescription(toProDescription);
                  }}
                  // placeholder="ความงอก"
                />
                <div className="div-Area-C-X">
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
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  const NOTIFICATION_STATES = {
    Owner: (
      <>
        <div className="Head-Manage-Project">
          <div className="div-Manage-Project">
            <p className="P-Manage-Project">Manage Project</p>
          </div>

          <div className="div-Area-Button-AddMember">
            <button
              className="Button-AddMember-Manage"
              onClick={() => {
                setShowAddMember(true);
              }}
            >
              AddMember
            </button>
          </div>
        </div>
        {ShowEditProject()}
        <div className="List-Owner-Manage">
          <div className="Owner">
            <p className="P-Owner">Owner</p>

            <table id="t01">
              <tr>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>อีเมลล์</th>
              </tr>
              {getUserOwner.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.Firstname}</td>
                      <td>{data.Lastname}</td>
                      <td>{data.Email}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>
        <div className="List-Ta-Manage">
          <div className="Ta">
            <p className="P-Ta">RA</p>

            <table id="t01">
              {}
              <tr>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>อีเมลล์</th>
              </tr>
              {getUserTa.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.Firstname}</td>
                      <td>{data.Lastname}</td>
                      <td>{data.Email}</td>
                      <td>
                        <button
                          onClick={() => {
                            setShowChange(true);
                            setMEmail(data.ID_user);
                            setMMEmail(data.Email);
                          }}
                        >
                          Change to Member
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setShowDelete(true);
                            setMEmail(data.ID_user);
                            setMMEmail(data.Email);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>

        <div className="List-Member-Manage">
          <div className="Member">
            <p className="P-Member">Member</p>

            <table id="t01">
              <tr>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>อีเมลล์</th>
              </tr>
              {getUserMember.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.Firstname}</td>
                      <td>{data.Lastname}</td>
                      <td>{data.Email}</td>
                      <td>
                        <button
                          onClick={() => {
                            setShow(true);
                            setMEmail(data.ID_user);
                            setMMEmail(data.Email);
                          }}
                        >
                          Change to RA
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setShowDelete(true);
                            setMEmail(data.ID_user);
                            setMMEmail(data.Email);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>
        {showMassage()}
      </>
    ),

    Ta: (
      <>
        <div className="Head-Manage-Project">
          <div className="div-Manage-Project">
            <p className="P-Manage-Project">Manage Project</p>
          </div>

          <div className="div-Area-Button-AddMember">
            <button
              className="Button-AddMember-Manage"
              onClick={() => {
                setShowAddMember(true);
              }}
            >
              AddMember
            </button>
          </div>
        </div>
        {ShowEditProject()}
        <div className="List-Owner-Manage">
          <div className="Owner">
            <p className="P-Owner">Owner</p>

            <table id="t01">
              <tr>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>อีเมลล์</th>
              </tr>
              {getUserOwner.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.Firstname}</td>
                      <td>{data.Lastname}</td>
                      <td>{data.Email}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>
        <div className="List-Ta-Manage">
          <div className="Ta">
            <p className="P-Ta">Ta</p>

            <table id="t01">
              <tr>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>อีเมลล์</th>
              </tr>
              {getUserTa.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.Firstname}</td>
                      <td>{data.Lastname}</td>
                      <td>{data.Email}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>

        <div className="List-Member-Manage">
          <div className="Member">
            <p className="P-Member">Member</p>

            <table id="t01">
              <tr>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>อีเมลล์</th>
              </tr>
              {getUserMember.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.Firstname}</td>
                      <td>{data.Lastname}</td>
                      <td>{data.Email}</td>
                      <td>
                        <button
                          onClick={() => {
                            setShow(true);
                            setMEmail(data.ID_user);
                            setMMEmail(data.Email);
                          }}
                        >
                          Change to Member
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setShowDelete(true);
                            setMEmail(data.ID_user);
                            setMMEmail(data.Email);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>
        {showMassage()}
      </>
    ),
    Member: (
      <>
        <div className="Head-Manage-Project">
          <div className="div-Manage-Project">
            <p className="P-Manage-Project">Manage Project</p>
          </div>

          <div className="div-Area-Button-AddMember">
            {/* <button
              className="Button-AddMember-Manage"
              onClick={() => {
                setShowAddMember(true);
              }}
            >
              AddMember
            </button> */}
          </div>
        </div>
        <div className="List-Owner-Manage">
          <div className="Owner">
            <p className="P-Owner">Owner</p>

            <table id="t01">
              <tr>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>อีเมลล์</th>
              </tr>
              {getUserOwner.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.Firstname}</td>
                      <td>{data.Lastname}</td>
                      <td>{data.Email}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>
        <div className="List-Ta-Manage">
          <div className="Ta">
            <p className="P-Ta">Ta</p>

            <table id="t01">
              <tr>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>อีเมลล์</th>
              </tr>
              {getUserTa.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.Firstname}</td>
                      <td>{data.Lastname}</td>
                      <td>{data.Email}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>

        <div className="List-Member-Manage">
          <div className="Member">
            <p className="P-Member">Member</p>

            <table id="t01">
              <tr>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>อีเมลล์</th>
              </tr>
              {getUserMember.map(data => {
                return (
                  <>
                    <tr>
                      <td>{data.Firstname}</td>
                      <td>{data.Lastname}</td>
                      <td>{data.Email}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>
      </>
    ),
  };

  return (
    <>
      <div className="Container-Manage">
        <Bar />

        {NOTIFICATION_STATES[status]}

        <ModalShowChange
          show={showChange}
          handleClose={() => {
            setShowChange(false);
          }}
        />
        <ModalShowSetManage show={show} handleClose={handleCloseShowSetOwner} />
        <ModalShowSetDelete
          show={showDelete}
          handleClose={handleCloseShowDelete}
        />
        <ModalShowAddMember
          show={showAddMember}
          handleClose={handleCloseAddMember}
        />

        <ModalShowCancel
          show={showCanCel}
          handleClose={() => {
            setShowCanCel(false);
          }}
        />
        <ModalShowAcept
          show={showAc}
          handleClose={() => {
            setShowAc(false);
          }}
        />
      </div>
    </>
  );
}
export default Manage;
