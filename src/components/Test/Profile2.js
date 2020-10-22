import React from "react";
import { useState } from "react";
import { auth, storage } from "../section/firebase/index";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [data, setData] = useState({});
  const [img, setImg] = useState(null);
  const [url2, setUrl] = useState("null");
  const [progress, setProgress] = useState(0);
  const [Fname, setFName] = useState("null");
  const [Lname, setLName] = useState("null");
  const [isEdit, setisEdit] = useState(false);
  const [isimg, setisimg] = useState(false);
  const [issub, setissub] = useState(false);
  const init = async () => {
    const email = Cookie.get("email");
    console.log(email);
    const res = await axios({
      url: "http://localhost:3005/profile/user",
      method: "POST",
      data: {
        email,
      },
    });
    setData(res.data);
    console.log(data);
  };

  useEffect(() => {
    init();
  }, [isEdit]);
  const clicklaw = () => {
    setisEdit(true);
  };
  const hadlefile = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
      setisimg(true);
    }
  };
  const hadleFname = (e) => {
    if (e.target.value) {
      setFName(e.target.value);
    }
  };
  const hadleLname = (e) => {
    if (e.target.value) {
      setLName(e.target.value);
    }
  };
  const hadlesub = async () => {
    const email = Cookie.get("email");
    const uploadTask = storage.ref(`users/` + email + `/profile.jpg`).put(img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("users/" + email)
          .child("profile.jpg")
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
          });
      }
    );
  };

  const hadlesubb = () => {
    const email = Cookie.get("email");
    axios({
      url: "http://localhost:3005/profile",
      method: "POST",
      data: {
        url2,
        email,
        Fname,
        Lname,
      },
    });
    setisEdit(false);
  };
  return (
    <>
      <div className="Body-profile">
        <div className="Container-profile">
          {isEdit && (
            <>
              <img id="img_profile" src={url2} />

              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={hadlefile}
              />

              <button onClick={hadlesub}>upload</button>

              <input type="text" placeholder="Name" onChange={hadleFname} />
              <input type="text" placeholder="Surname" onChange={hadleLname} />
              <button onClick={hadlesubb}>submit</button>
            </>
          )}

          {!isEdit && (
            <>
              <img
                src={
                  data.userphotolink ||
                  "https://simpleicon.com/wp-content/uploads/user1.png"
                }
                alt="profile"
                id="img_profile"
              />

              <h1>
                {data.userfristname} {data.userlastname}
              </h1>

              <button onClick={clicklaw}>edit</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
