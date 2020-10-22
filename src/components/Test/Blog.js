import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
// import "./components/section/Blog.css";

function Blog() {
  const [data, setData] = useState("null");
  const [data2, setData2] = useState("null");
  const [loading, setLoading] = useState(false);
  const [base0, setBase0] = useState([]);
  const init = async () => {
    const res = await axios.get("http://localhost:3005/Blog");
    setBase0(res.data.data);
    console.log(base0);
  };
  useEffect(() => {
    init();
  }, [loading]);

  const handleTest = (e) => {
    if (e.target.value) {
      setData(e.target.value);
    }
  };
  const handleTest2 = (e) => {
    if (e.target.value) {
      setData2(e.target.value);
    }
  };
  const handleLoading = () => {
    setLoading(!loading);
    console.log(loading);
  };
  const handleSave = async () => {
    const email = Cookies.get("email");
    console.log(email);
    const res = await axios({
      url: "http://localhost:3005/blog",
      method: "POST",
      data: {
        data,
        data2,
        email,
      },
    });
    setBase0(res.data.data);
    console.log(base0);
    setLoading(true);
  };
  const ModalDetail = ({ children, setLoading, loading }) => {
    const ss = () => {
      setLoading(!loading);
    };
    return (
      <div className="modal display-block">
        <section className="modal-main">
          {children}
          <button onClick={ss}>X</button>
        </section>
      </div>
    );
  };
  return (
    <div className="Body-blog">
      <div className="Container-blog">
        {/* <ModalDetail setLoading={setLoading} loading={loading}>
          <h1>Plot Address : </h1>
        </ModalDetail> */}

        {/* <h2>Blog Component</h2>
      <input type="text" placeholder="data1" onChange={handleTest} />
      <input type="text" placeholder="data2" onChange={handleTest2} />
      <button onClick={handleSave}>ss</button> */}

        {base0.map((user, index) => {
          return (
            <li key={`${user}-${index}`}>
              <div className="card">
                <div className="img-plot">
                  <i className="fa fa-file-text-o" id="icon-card"></i>
                </div>
                <h1>T1:{user.T1}</h1>
                <br />
                <h1> T2:{user.T2}</h1>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default Blog;
