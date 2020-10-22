import React, { Component } from "react";
import Login from "./section/Login";
import { Route } from "react-router-dom";
import Register from "./section/Register";
import Forgetpassword from "./section/ForgetPassword";
import Profile from "./section/Profile";
import Project from "./section/Project";
import MyFarm from "./section/MyFarm";
// import InProject from "./section/InProject";
import Farm from "./section/sectionDetail/Farm";
// import Table from "./section/Table";
// import toProject from "./section/toProject";
import bar from "./section/sectionDetail/bar";
import Breeder from "./section/sectionDetail/Breeder";
import Manage from "./section/sectionDetail/Manage";
import Breeding from "./section/sectionDetail/Breeding";
import Seedling from "./section/sectionDetail/Seedling";
import AddSeedling from "./section/sectionDetail/AddSeedling";
import stepSST from "./section/sectionDetail/StepSST";
import GrowSST from "./section/sectionDetail/GrowSST";
import GrowSSTDetail from "./section/sectionDetail/GrowSSTDetail";
import SectionSST from "./section/sectionDetail/SectionSST";
import stepCST from "./section/sectionDetail/StepCST";
import GrowCST from "./section/sectionDetail/GrowCST";
import GrowCSTDetail from "./section/sectionDetail/GrowCSTDetail";
import SectionCST from "./section/sectionDetail/SectionCST";

import stepPST from "./section/sectionDetail/StepPST";
import GrowPST from "./section/sectionDetail/GrowPST";
import GrowPSTDetail from "./section/sectionDetail/GrowPSTDetail";
import SectionPST from "./section/sectionDetail/SectionPST";

import stepAST from "./section/sectionDetail/StepAST";
import GrowAST from "./section/sectionDetail/GrowAST";
import GrowASTDetail from "./section/sectionDetail/GrowASTDetail";
import SectionAST from "./section/sectionDetail/SelectionAST";

import stepRST from "./section/sectionDetail/StepRST";
import GrowRST from "./section/sectionDetail/GrowRST";
import GrowRSTDetail from "./section/sectionDetail/GrowRSTDetail";
import SelectionRST from "./section/sectionDetail/SelectionRST";

import stepFST from "./section/sectionDetail/StepFST";
import GrowFST from "./section/sectionDetail/GrowFST";
import GrowFSTDetail from "./section/sectionDetail/GrowFSTDetail";
import SectionFST from "./section/sectionDetail/SelectionFST";

import com from "./section/sectionDetail/Compare";
import Massage from "./section/sectionDetail/Massage";
import GrowComDetail from "./section/sectionDetail/GrowComDetail";
export class Section extends Component {
  render() {
    return (
      <section>
        <Route path="/login" component={Login} />
        <Route path="/res" component={Register} />
        <Route path="/getpass" component={Forgetpassword} />
        <Route path="/profile" component={Profile} />
        <Route path="/project" component={Project} />
        <Route path="/myfarm" component={MyFarm} />
        {/*  */}
        <Route path="/test" component={bar} />
        {/*  */}
        <Route path="/breeder" component={Breeder} />
        <Route path="/manage" component={Manage} />
        <Route path="/seedling" component={Seedling} />
        <Route path="/breeding" component={Breeding} />
        <Route path="/farm" component={Farm} />
        <Route path="/addSeedling" component={AddSeedling} />
        {/*  */}
        <Route path="/stepSST" component={stepSST} />
        <Route path="/growSST" component={GrowSST} />
        <Route path="/growSSTDetail" component={GrowSSTDetail} />
        <Route path="/sectionSST" component={SectionSST} />

        {/*  */}
        <Route path="/stepCST" component={stepCST} />
        <Route path="/growCST" component={GrowCST} />
        <Route path="/growCSTDetail" component={GrowCSTDetail} />
        <Route path="/sectionCST" component={SectionCST} />

        {/*  */}

        <Route path="/stepPST" component={stepPST} />
        <Route path="/growPST" component={GrowPST} />
        <Route path="/growPSTDetail" component={GrowPSTDetail} />
        <Route path="/sectionPST" component={SectionPST} />

        {/*  */}

        <Route path="/stepAST" component={stepAST} />
        <Route path="/growAST" component={GrowAST} />
        <Route path="/growASTDetail" component={GrowASTDetail} />
        <Route path="/sectionAST" component={SectionAST} />
        {/*  */}

        <Route path="/stepRST" component={stepRST} />
        <Route path="/growRST" component={GrowRST} />
        <Route path="/growRSTDetail" component={GrowRSTDetail} />
        <Route path="/sectionRST" component={SelectionRST} />
        {/*  */}

        <Route path="/stepFST" component={stepFST} />
        <Route path="/growFST" component={GrowFST} />
        <Route path="/growFSTDetail" component={GrowFSTDetail} />
        <Route path="/sectionFST" component={SectionFST} />
        {/*  */}

        <Route path="/compare" component={com} />
        <Route path="/Massage" component={Massage} />
        <Route path="/GrowComDetail" component={GrowComDetail} />
      </section>
    );
  }
}

export default Section;
