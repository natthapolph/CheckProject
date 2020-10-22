import React, { useState } from "react";
import { auth } from "./firebase/index";
import { Link } from "react-router-dom";
import "./ForgetPassword.css";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleReset = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        alert("Password reset email sent");
      })
      .catch(function (error) {
        alert(error);
      });
  };
  return (
    <div className="Body-forgetpassword">
      <div className="Container-forgetpassword">
        <div className="Area-Forgetpassword">
          <img
            className="img-logo-KU-Forgetpassword"
            src="https://upload.wikimedia.org/wikipedia/commons/9/97/KU_Logo.png"
            alt=""
          />
          <div className="div-Area-Forgetpassword">
            <p className="h1-Forget-Password">Forget Your Password?</p>
            <p className="Comment-Forgetpassword">
              Don't worry! Resetting your password is easy. Just type in the
              email your registered to Cassava man.
            </p>
            <input
              className="Input-Forgetpassword"
              type="email"
              placeholder="  Enter Your Email"
              onChange={handleEmail}
            />

            <br />
            <div className="Area-Button-Forgetpassword">
              <Link to="/login">
                <button
                  className="Button-submit-Forgerpassword"
                  onClick={handleReset}
                >
                  submit
                </button>
              </Link>

              <Link to="/login">
                <button className="Button-Cancel-Forgetpassword">cancel</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
