import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import GrowDetail from "./GrowDetail";
import axios from "axios";
function GrowCSTDetail() {
  const [farm, setFarm] = useState("");
  const [Block, setBlock] = useState("");
  const [Unit, setUnit] = useState("");
  var id = Cookies.get("CST");
  useEffect(() => {
    const initGrow = async () => {
      const toProID = Cookies.get("IdProject");
      const getAll = await axios({
        url: "http://localhost:3005/getGrowFarmBlockPlot",
        withCredentials: true,
        method: "POST",
        data: { id, toProID },
      });
      console.log(getAll);
      setFarm(getAll.data.Farm);
      setUnit(getAll.data.Unit);
      setBlock(getAll.data.Block);
    };
    initGrow();
  }, []);
  return <GrowDetail id={id} farm={farm} block={Block} plot={Unit} />;
}
export default GrowCSTDetail;
