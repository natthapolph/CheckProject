import React, { useState } from "react";
import { auth, Auth } from "./firebase/index";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./Login.css";

function Login() {
  const history = useHistory();
  function handleClick() {
    history.push("/project");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [data, setData] = useState([]);
  const [error, setError] = useState({
    email: false,
    password: false,
    massage1: "",
    massage2: "",
  });
  const hadleBlurEmail = e => {
    const Temail = e.target.value;
    if (!Temail) {
      setError({
        email: true,
        massage1: "Email is required.",
      });
    } else {
      setError({
        email: false,
      });
    }
  };
  const hadleBlurPass = e => {
    const Temail = e.target.value;
    if (!Temail) {
      setError({
        password: true,
        massage2: "password is required.",
      });
    } else {
      setError({
        password: false,
      });
    }
  };
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    await auth.setPersistence(Auth.Auth.Persistence.SESSION);
    const response = await auth.signInWithEmailAndPassword(email, password);
    const { user } = response;
    if (user.emailVerified) {
      const email = user.email;
      Cookies.set("email", email);
      console.log(email);
      const searchID_User = await axios({
        url: "http://localhost:3005/login",
        withCredentials: true,
        method: "POST",
        data: { email },
      });
      Cookies.set("Id_User", searchID_User.data.ID_user);
      console.log(searchID_User.data.ID_user);
      console.log(searchID_User.data.massage);
      // const ID_user = searchID_User.data.ID_user;
      // const NoMassage = await axios({
      //   url: "http://localhost:3005/getNoMassage",
      //   method: "POST",
      //   data: { ID_user },
      // });
      // setData(NoMassage.data.massage);
      // console.log(NoMassage.data.massage);
      // const a = data.length;
      // Cookies.set("No", a);
      handleClick();
    } else {
    }
    console.log("emailVerified-->" + response.t);
  };

  return (
    <>
      <div className="Body-login">
        <div className="Container-login">
          <div className="Area-Login">
            <div className="div-Area-Login">
              <img
                className="img-logo-KU-Login"
                src="https://upload.wikimedia.org/wikipedia/commons/9/97/KU_Logo.png"
                alt=""
              />
              <p>ลงชื่อเข้าสู่ระบบ</p>
              <p className="P-Email-Login">E-mail</p>
              <input
                className="Input-Login"
                type="email"
                placeholder="   Enter Your Email"
                onBlur={hadleBlurEmail}
                onChange={handleEmail}
              />
              {error.email && <div className="error1">{error.massage1}</div>}
              <br />
              <p className="P-Password-Login">Password</p>
              <input
                className="Input-Login"
                type="password"
                placeholder="    Enter Your Password"
                onChange={handlePassword}
                onBlur={hadleBlurPass}
              />
              <br />
              {error.password && <div className="error1">{error.massage2}</div>}
              <div className="row-login">
                <Link to="/res" className="Res-clk">
                  resgister
                </Link>
                <p className="P-or-Login"> or </p>
                <Link to="/getpass" className="Forget-clk">
                  forget Password
                </Link>
              </div>

              {/* <Link to="/project">
                <button className="Button-login" onClick={handleLogin}>
                  Login
                </button>
              </Link> */}

              <button className="Button-login" onClick={handleLogin}>
                Login
              </button>
            </div>

            <br />
          </div>
        </div>
      </div>

      {/* {showResgister && !showForget && <Link to="/res">Resgister</Link>}
      {!showResgister && showForget && <Link to="/getpass">Resgister</Link>} */}
    </>
  );
}

export default Login;
