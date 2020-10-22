import React from "react";
import "../section/Profile.css";
function Profile() {
  return (
    <>
      <div className="Body-Profile">
        <div className="Container-Profile">
          <div className="Zone-img">
            <p>Profile picture</p>
            <img
              className="img-profile"
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Profile"
            />
            <br />
            <button className="Button-AddPicture">Add Picture</button>
          </div>
          <div className="Zone-DataProfile">
            <div className="Line-Firstname">
              <p>First Name </p>
              <span>&nbsp; &nbsp;</span>
              <input className="Input-Firstname" type="text" />
              <span>&nbsp; &nbsp;</span>
              <i
                class="fa fa-pencil-square-o"
                id="Icon-edit"
                aria-hidden="true"
              ></i>
            </div>

            <div className="Line-Lastname">
              <p>Last Name </p>
              <span>&nbsp; &nbsp;</span>
              <input className="Input-Lastname" type="text" />
              <span>&nbsp; &nbsp;</span>
              <i
                class="fa fa-pencil-square-o"
                id="Icon-edit"
                aria-hidden="true"
              ></i>
            </div>

            <div className="Line-Email">
              <p>E-mail</p>
              <span>&nbsp; &nbsp;</span>
              <input className="Input-Email" type="text" />
              <span>&nbsp; &nbsp;</span>
              <i
                class="fa fa-pencil-square-o"
                id="Icon-edit"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
