import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Bar from "./bar";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
function GrowPST() {
  const [loadingCST, setLoadingCST] = useState(false);
  const [maxSize, setMaxSize] = useState(0);
  const [page, setPage] = useState(1);
  const [showCST, setShowCST] = useState([]);
  const [allCST, setAllCST] = useState([]);
  const [chooseID, setChooseID] = useState("");

  useEffect(() => {
    const initGrowCST = async () => {
      const toProID = Cookies.get("IdProject");
      const size = 10;
      const getCST = await axios({
        url: "http://localhost:3005/getFSTGrow",
        withCredentials: true,
        method: "POST",
        data: { toProID, size, page },
      });
      setMaxSize(getCST.data.maxSize);
      setShowCST(getCST.data.dataCST);
      setAllCST(getCST.data.num);
      setLoadingCST(true);
    };
    initGrowCST();
  }, [page, loadingCST]);

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
          {showCST.map(data => {
            return (
              <>
                <div className="div-Area-Button-Project">
                  <button
                    onClick={() => {
                      Cookies.set("FST", data.ID_Stem);
                    }}
                  >
                    <Link className="Link-Underline-Color" to="/growFSTDetail">
                      {data.ID_Stem}
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
              Cookies.set("FST", chooseID);
            }}
          >
            <Link className="Link-Underline-Color" to="/growFSTDetail">
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
            <p className="P-Farm">การเจริญเติบโต ขั้นตอน FST</p>
          </div>
          <div className="div-Head-Right-Side"></div>
          <div class="div-Area-Search">
            <Autocomplete
              id="combo-box-demo"
              options={allCST}
              onChange={(e, value) =>
                value ? setChooseID(value.ID_Stem) : setChooseID("")
              }
              getOptionLabel={option => option.ID_Stem}
              size="small"
              style={{ width: 300, height: 50 }}
              renderInput={params => (
                <TextField {...params} label="search" variant="outlined" />
              )}
            />
          </div>
        </div>
        {showAll()}
      </div>
    </>
  );
}
export default GrowPST;
