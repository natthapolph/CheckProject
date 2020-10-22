import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "./section/firebase/index";
import Cookies from "js-cookie";
import Login from "./section/Login";
import axios from "axios";
import "../index.css";
function Header() {
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [No, setNo] = useState([]);
  useEffect(() => {
    const handleAuth = auth.onAuthStateChanged(user => {
      try {
        if (user.emailVerified) {
          setStatus(true);
          setEmail(user.email);
          const Manageinit = async () => {
            const ID_user = Cookies.get("Id_User");
            const NoMassage = await axios({
              url: "http://localhost:3005/getNoMassage",
              method: "POST",
              data: { ID_user },
            });
            setNo(NoMassage.data.massage);
            console.log(NoMassage.data.massage);
          };
          Manageinit();
        } else {
          // alert("error");
        }
      } catch (error) {}
    });
    return () => {
      handleAuth();
    };
  }, [status]);

  const handleLogout = () => {
    auth.signOut().then(response => {
      setStatus(false);
      console.log(response);
    });
    Cookies.remove("email");
  };
  const [toggle, setToggle] = useState(false);
  const menuToggle = () => {
    setToggle(!toggle);
  };

  const notification = () => {
    // var xx = Cookies.get("No");
    // var a = parseInt(xx, 10);
    // console.log(a);
    // if (a === NaN) {
    // } else {
    //   return (
    //     <>
    //       <div className="div-Number-Massage">{a}</div>{" "}
    //     </>
    //   );
    // }
  };
  return (
    <>
      {status && (
        <>
          <header>
            <div className="Bar-Sidebar">
              <button onClick={menuToggle} className="Link-Icon-bar">
                <i className="fa fa-bars" id="Icon-bar" aria-hidden="true"></i>
              </button>
            </div>
            <div className="logo">
              <Link
                to="/project"
                id="logoname"
                onClick={() => {
                  setToggle(false);
                }}
              >
                <h1>KASETSART</h1>
              </Link>
            </div>
            <div className="div-Area-Bell">
              <Link to="/Massage">
                <button className="Button-Bell">
                  <i class="fa fa-bell-o" id="Bell" aria-hidden="true"></i>
                </button>
              </Link>
              {notification()}
            </div>

            <>
              {status && (
                <>
                  <ul className="">
                    <li className="dropdown-H">
                      <Link to="/profile">
                        {email} <span>&#11167;</span>
                      </Link>
                      <ul className="drop-one-H">
                        <li>
                          <Link
                            to="/home"
                            onClick={() => {
                              handleLogout();
                              Cookies.remove("IdProject");
                            }}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </>
              )}
            </>
          </header>

          <div className={toggle ? "sss" : "display-none"}>
            <div className="sidebar">
              <div className="sidebar1">
                {/* ---*/}
                <ul>
                  {/* <li>
                    <Link to="/profile">Profile</Link>
                  </li> */}
                  <li>
                    <Link
                      to="/myfarm"
                      onClick={() => {
                        setToggle(false);
                      }}
                    >
                      My Farm
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/project"
                      onClick={() => {
                        setToggle(false);
                      }}
                    >
                      My ProJect
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Massage"
                      onClick={() => {
                        setToggle(false);
                      }}
                    >
                      Massage
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      {!status && <Login />}
    </>
  );
}

export default Header;
