import React, { useState } from "react";
import axios from "axios";
import { auth } from "../section/firebase/index";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";

function Register() {
  const history = useHistory();
  function handleClick() {
    history.push("/login");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    cpassword: false,
    massage1: "",
    massage2: "",
    massage3: "",
  });
  const handleFname = e => {
    setFname(e.target.value);
  };
  const handleLname = e => {
    setLname(e.target.value);
  };

  const hadleBlur = e => {
    const Temail = e.target.value;
    if (!Temail) {
      setError({
        email: true,
        massage1: "Email is required.",
      });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(Temail)) {
      setError({
        email: true,
        massage1: "Invalid email address",
      });
    } else {
      setEmail(e.target.value);
      setError({
        email: false,
      });
    }
  };

  const hadleBlurPass = e => {
    const check = /^(?=.*[!@#$%^&*])/;
    // /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const TPass = e.target.value;
    if (!TPass) {
      setError({
        password: true,
        massage2: "Password is required.",
      });
      // } else if (!/(?=.[!@#$%^&*?+-/()<>[\]{}:;])/.test(TPass)) {
    } else if (!check.test(TPass)) {
      setError({
        password: true,
        massage2: "Password must contain at least one special character.",
      });
    } else if (!/^(?=.*\d)/.test(TPass)) {
      setError({
        password: true,
        massage2: "Password must contain at least one number.",
      });
    } else if (!/(?=.*[a-z])/.test(TPass)) {
      setError({
        password: true,
        massage2: "'Password must contain at least one lowercase letter.'",
      });
    } else if (!/(?=.*[A-Z])/.test(TPass)) {
      setError({
        password: true,
        massage2: "Password must contain at least one uppercase letter.",
      });
    } else if (!/(?=.*[A-Z])/.test(TPass)) {
      setError({
        password: true,
        massage2: "Password must contain at least one number.",
      });
    } else if (TPass.includes(" ")) {
      setError({
        password: true,
        massage2: "Password must NOT contain space.",
      });
    } else if (TPass.length < 8) {
      setError({
        password: true,
        massage2: "Password must be at least 8 character",
      });
    } else if (TPass.length > 20) {
      setError({
        password: true,
        massage2: "Password is too long (max 20 characters).",
      });
    } else if (TPass.toLowerCase() === "password") {
      setError({
        password: true,
        massage2: 'Cannot use "password" as a password',
      });
    } else {
      setPassword(e.target.value);
      setError({
        password: false,
      });
    }
  };
  const hadleBlurCPass = e => {
    const TCPass = e.target.value;
    if (!TCPass) {
      setError({
        cpassword: true,
        massage3: "ComfirmPassword is required.",
      });
    } else {
      if (password !== TCPass) {
        setError({
          cpassword: true,
          massage3: "Password does not match.",
        });
      } else {
        setError({
          cpassword: false,
        });
      }
    }
  };
  const [er, setEr] = useState(false);
  const handleRegister = async () => {
    if (email === "" || Fname === "" || Lname === "" || password === "") {
      setEr(true);
    } else {
      setEr(false);
      var ck = false;
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        auth.currentUser.sendEmailVerification();
        auth.signOut();
        ck = true;
        console.log(ck);
      } catch (error) {
        // alert(error);
      }

      if (ck === true) {
        console.log("check one");
        const a = await axios({
          url: "http://localhost:3005/res",
          withCredentials: true,
          method: "POST",
          data: {
            email,
            Fname,
            Lname,
          },
        });
        console.log(a.data.message);
        alert("please verify your email address");
        // console.log("check two");
        handleClick();
        // console.log("check three");
      } else {
        alert("The email address is already in use by another account");
      }
    }

    // }
  };

  return (
    <div className="Body-regis">
      <div className="Container-regis">
        <div className="Area-Register">
          <img
            className="img-logo-KU-Register"
            src="https://upload.wikimedia.org/wikipedia/commons/9/97/KU_Logo.png"
            alt=""
          />
          <div className="div-Area-Register">
            <h1 className="h1-Register">Register</h1>
            <p className="P-Firstname-Register">Firstname</p>
            <input
              className="Input-Register"
              type="text"
              placeholder="  First Name"
              onChange={handleFname}
            />
            <br />
            <p className="P-Lastname-Register">Lastname</p>
            <input
              className="Input-Register"
              type="text"
              placeholder="  Last Name"
              onChange={handleLname}
            />
            <br />
            <p className="P-Email-Register">E-mail</p>
            <input
              className="Input-Register"
              type="email"
              placeholder="  Email Adress"
              onChange={e => hadleBlur(e)}
            />
            <br />
            {error.email && <div className="error1">{error.massage1}</div>}

            <p className="P-Password-Register">Password</p>
            <input
              className="Input-Register"
              type="password"
              placeholder="  Password"
              onChange={e => hadleBlurPass(e)}
            />
            <br />
            {error.password && <div className="error2">{error.massage2}</div>}

            <p className="P-Confirm-Password-Register">Confirm Passwod</p>
            <input
              className="Input-Register"
              type="password"
              placeholder="  Confirm Password"
              onChange={e => hadleBlurCPass(e)}
            />
            <br />
            <div className="Area-Button-Register">
              {error.cpassword && (
                <div className="error3">{error.massage3}</div>
              )}
              {er && <div className="error1">กรุณาระบุข้อมูลให้ครบถ้วน</div>}

              <button
                className="Button-submit-Register"
                onClick={handleRegister}
                disabled={error.password || error.email || error.cpassword}
              >
                submit
              </button>

              <Link to="/login">
                <button className="Button-Cancle-Register">cancle</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
