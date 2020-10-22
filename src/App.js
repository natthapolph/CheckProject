import React from "react";
import Header from "./components/Header";
import Section from "./components/Section";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Section></Section>
      </Router>
    </>
  );
}

export default App;
