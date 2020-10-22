import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Plot.css";
function Plot() {
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [base, setBase] = useState([]);
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const init = async () => {
    const resp = await axios.get("http://localhost:3005/plots");
    setBase(resp.data.data);
    console.log(resp.data.data);
  };
  useEffect(() => {
    // setLoading(false);
    init();
  }, [loading]);
  const handleLoading = () => {
    setLoading(!loading);
  };
  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };
  const showModalDetail = () => {
    setShowDetail(true);
  };

  const hideModalDetail = () => {
    setShowDetail(false);
  };
  const Modal = ({
    handleClose,
    show,
    children,
    setLoading,
    loading,
    setBase,
  }) => {
    const [name, setName] = useState("null");
    const [id, setId] = useState("null");
    const [address, setAdress] = useState("null");
    const handleID = (e) => {
      setId(e.target.value);
    };
    const handleAdress = (e) => {
      if (e.target.value) {
        setAdress(e.target.value);
      }
    };
    const handleName = (e) => {
      setName(e.target.value);
    };
    const handleSave = async () => {
      setLoading(!loading);

      console.log(loading);
      setShow(false);
      const resp = await axios({
        url: "http://localhost:3005/plots",
        method: "POST",
        data: {
          name,
          id,
          address,
        },
      });
      setBase(resp.data.data);
    };
    return (
      <div className={show ? "modal display-block" : "modal display-none"}>
        <section className="modal-main">
          {children}

          <input
            className="input-plot"
            type="text"
            placeholder="Enter ID Plot"
            onChange={handleID}
          />
          <input
            className="input-plot"
            type="text"
            placeholder="Enter Your Name Plot"
            onChange={handleName}
          />
          <input
            className="input-plot"
            type="text"
            placeholder="Enter Your Address"
            onChange={handleAdress}
          />
          <button onClick={handleClose} id="close-plot">
            X
          </button>
          <button onClick={handleSave}>summit</button>
        </section>
      </div>
    );
  };

  const ModalDetail = ({ handleClose, show, children }) => {
    return (
      <div className={show ? "modal display-block" : "modal display-none"}>
        <section className="modal-main">
          {children}
          <button onClick={handleClose} id="close-plot">
            X
          </button>
        </section>
      </div>
    );
  };
  return (
    <div className="Body-plot">
      <div className="Container-plot">
        <div className="bt-addplot">
          <h1 type="button" className="bt_addform" onClick={showModal}>
            +
          </h1>
        </div>
        <h1></h1>
        <Modal
          show={show}
          handleClose={hideModal}
          setLoading={setLoading}
          loading={loading}
          setShow={setShow}
          setBase={setBase}
        >
          <h2>Creat New Plot</h2> <br />
        </Modal>
        {base.map((user, index) => {
          return (
            <li key={`${user}-${index}`}>
              <div className="card-plot">
                <div className="img-plot">
                  <i className="fa fa-file-text-o" id="icon-card"></i>
                </div>
                <h1>ID:{user.Plot_id}</h1>
                <br />
                <h1> Name:{user.Plot_name}</h1>
                <button
                  onClick={() => {
                    setShowDetail(true);
                    setAdd(user.Plot_Address);
                    setId(user.Plot_id);
                    setName(user.Plot_name);
                  }}
                >
                  show Detail
                </button>
              </div>
            </li>
          );
        })}
        {/* <button onClick={handleLoading}></button> */}
        <ModalDetail show={showDetail} handleClose={hideModalDetail}>
          <h1>Plot ID : {id}</h1>
          <h1>Plot Name : {name}</h1>
          <h1>Plot Address : {add}</h1>
        </ModalDetail>
      </div>
    </div>
  );
}

export default Plot;
