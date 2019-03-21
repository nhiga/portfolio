import React from "react";

import Section from "./Section";
import { sections } from "./data/sections";
import "./Main.scss";
import About from "./About";
import Experience from "./Experience";
import Extras from "./Extras";

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
