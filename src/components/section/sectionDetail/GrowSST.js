import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Bar from "./bar";
import { Link } from "react-router-dom";
import "./GrowSST.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
function GrowSST() {
  const [loading4, setLoading4] = useState(false);
  const [maxSize, setMaxSize] = useState(0);
  const [page, setPage] = useState(1);
  const [showSST, setShowSST] = useState([]);
  const [allSST, setAllSST] = useState([]);
  const [chooseID, setChooseID] = useState("");

  useEffect(() => {
    const initGrowSST = async () => {
      const toProID = Cookies.get("IdProject");
      const size = 10;
      const getSST = await axios({
        url: "http://localhost:3005/getSSTGrow",
        withCredentials: true,
        method: "POST",
        data: { toProID, size, page },
      });
      setMaxSize(getSST.data.maxSize);
      setShowSST(getSST.data.dataSST);
      setAllSST(getSST.data.num);
      setLoading4(true);
    };
    initGrowSST();
  }, [page, loading4]);

  const handleNext = async () => {
    if (page === maxSize) {
    } else {
      setPage(page + 1);
    }
  };
  const handlePre = () => {
    if (page === 1) {
    } else {
      setPage(page - 1);
    }
  };

  const showAll = () => {
    if (chooseID === "") {
      return (
        <>
          {showSST.map(data => {
            return (
              <>
                <div className="div-Area-Button-Project">
                  <button
                    onClick={() => {
                      Cookies.set("SST", data.ID_SST);
                    }}
                  >
                    <Link className="Link-Underline-Color" to="/growSSTDetail">
                      {data.ID_SST}
                    </Link>
                  </button>
                </div>
              </>
            );
          })}
          <div className="Area-Button-Pre-Next">
            <button className="Button-Pre-Page" onClick={handlePre}>
              <i class="fa fa-step-backward" aria-hidden="true"></i>
            </button>
            <label htmlFor="">
              {page} of {maxSize}
            </label>
            <button className="Button-Next-Page" onClick={handleNext}>
              <i class="fa fa-step-forward" aria-hidden="true"></i>
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={() => {
              Cookies.set("SST", chooseID);
            }}
          >
            <Link className="Link-Underline-Color" to="/growSSTDetail">
              {chooseID}
            </Link>
          </button>
        </>
      );
    }
  };
  return (
    <>
      <div className="Body-GrowSST">
        <Bar />

        <div className="Head-Farm">
          <div className="div-Head-Left-Side">
            <p className="P-Farm">การเจริญเติบโต ขั้นตอนSST</p>
          </div>
          <div className="div-Head-Right-Side"> </div>
          {/* <div class="div-Area-Search"> */}
          <div class="div-Area-Search">
            <Autocomplete
              id="combo-box-demo"
              options={allSST}
              onChange={(e, value) =>
                value ? setChooseID(value.ID_SST) : setChooseID("")
              }
              getOptionLabel={option => option.ID_SST}
              size="small"
              style={{ width: 300, height: 50 }}
              renderInput={params => (
                <TextField {...params} label="search" variant="outlined" />
              )}
            />
          </div>

          {/* </div> */}
        </div>
        {showAll()}
      </div>
    </>
  );
}
export default GrowSST;
