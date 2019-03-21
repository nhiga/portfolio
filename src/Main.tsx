import React from "react";

import About from "./About";
import Experience from "./Experience";
import Extras from "./Extras";
import "./Main.scss";
import Section from "./Section";

import { sections } from "./data/sections";

function Main() {
  return (
    <div id="main" className="main">
      <Section {...sections["About"]}>
        <About />
      </Section>
      <Section {...sections["Experience"]}>
        <Experience />
      </Section>
      <Section {...sections["Extras"]}>
        <Extras />
      </Section>
    </div>
  );
}

export default Main;
