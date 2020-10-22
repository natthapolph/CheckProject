import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./bar.css";
function bar() {
  const ProjectName = Cookies.get("ProjectName");
  const ProjectDes = Cookies.get("ProjectDes");
  const code = Cookies.get("IdProject");
  return (
    <>
      <div className="Header-bar">
        <div className="Bar-Up">
          <div className="div-Bar-Project">
            {/* <div className="div div-Area-inline"> */}

            <label className="Label-cut-word">
              {/* <p className="P-bold">Project Name :</p> */}
              <label className="Label-Bold">Project Name : </label>
              <labe>{ProjectName}</labe>
            </label>
            {/* </div> */}
            <div className="div-Area-inline">
              <p className="P-bold">Code :</p>
              {code}
            </div>
          </div>

          <label className="Label-cut-word">
            <label className="Label-Bold">Description :</label>
            <label>{ProjectDes}</label>
          </label>
          <div className="div-Bar-Setting">
            <Link className="Link-Setting" to="/manage">
              Setting
            </Link>
          </div>
        </div>

        <ul className="UL-Bar">
          <li className="LI-Bar">
            <Link to="/farm">
              <p>ฟาร์ม</p>
            </Link>
          </li>
          <li className="LI-Bar">
            <Link to="/breeder">
              <p>สายพันธุ์</p>
            </Link>
          </li>
          <li className="LI-Bar">
            <Link to="/breeding">
              <p>การผสมพันธุ์</p>
            </Link>
          </li>
          <li className="LI-Bar">
            <Link to="/seedling">
              <p>กลุ่มของเมล็ด</p>
            </Link>
          </li>
          <li className="LI-Bar">
            <Link to="/addSeedling">
              <p>การเพาะเมล็ด</p>
            </Link>
          </li>
          <li className="LI-Bar">
            <Link to="/stepSST">
              <p>SST</p>
            </Link>
            <ul className="drop-one">
              {/* <li className="LI-Bar">
                <Link to="/growSST">
                  <p>การเจริญเติบโตของ SST</p>
                </Link>
              </li> */}
              <li className="LI-Bar">
                <Link to="/sectionSST">
                  <p>การเลือกต้นมาทำท่อนพันธุ์ SST</p>
                </Link>
              </li>
            </ul>
          </li>

          <li className="LI-Bar">
            <Link to="/stepCST">
              <p>CST</p>
            </Link>
            <ul className="drop-one">
              {/* <li className="LI-Bar">
                <Link to="/growCST">
                  <p>การเจริญเติบโตของ CST</p>
                </Link>
              </li> */}

              <li className="LI-Bar">
                <Link to="/sectionCST">
                  <p>การเลือกต้นมาทำท่อนพันธุ์ CST</p>
                </Link>
              </li>
            </ul>
          </li>

          <li className="LI-Bar">
            <Link to="/stepPST">
              <p>PST</p>
            </Link>
            <ul className="drop-one">
              {/* <li className="LI-Bar">
                <Link to="/growPST">
                  <p>การเจริญเติบโตของ PST</p>
                </Link>
              </li> */}

              <li className="LI-Bar">
                <Link to="/sectionPST">
                  <p>การเลือกต้นมาทำท่อนพันธุ์ PST</p>
                </Link>
              </li>
            </ul>
          </li>

          <li className="LI-Bar">
            <Link to="/stepAST">
              <p>AST</p>
            </Link>
            <ul className="drop-one">
              {/* <li className="LI-Bar">
                <Link to="/growAST">
                  <p>การเจริญเติบโตของ AST</p>
                </Link>
              </li> */}

              <li className="LI-Bar">
                <Link to="/sectionAST">
                  <p>การเลือกต้นมาทำท่อนพันธุ์ AST</p>
                </Link>
              </li>
            </ul>
          </li>

          <li className="LI-Bar">
            <Link to="/stepRST">
              <p>RST</p>
            </Link>
            <ul className="drop-one">
              {/* <li className="LI-Bar">
                <Link to="/growRST">
                  <p>การเจริญเติบโตของ RST</p>
                </Link>
              </li> */}

              <li className="LI-Bar">
                <Link to="/sectionRST">
                  <p>การเลือกต้นมาทำท่อนพันธุ์ RST</p>
                </Link>
              </li>
            </ul>
          </li>

          <li className="LI-Bar">
            <Link to="/stepFST">
              <p>FST</p>
            </Link>
            <ul className="drop-one">
              {/* <li className="LI-Bar">
                <Link to="/growFST">
                  <p>การเจริญเติบโตของ FST</p>
                </Link>
              </li> */}
              {/* 
              <li className="LI-Bar">
                <Link to="/sectionFST">
                  <p>การเลือกต้นมาทำท่อนพันธุ์ FST</p>
                </Link>
              </li> */}
            </ul>
          </li>

          <li className="LI-Bar">
            <Link to="/compare">
              <p>พันธุ์เปรียบเทียบ</p>
            </Link>
            <ul className="drop-one">
              {/* <li className="LI-Bar">
                <Link to="/growFST">
                  <p>การเจริญเติบโตของ FST</p>
                </Link>
              </li> */}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
export default bar;
