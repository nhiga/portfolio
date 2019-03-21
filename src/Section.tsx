import { TweenLite, Back, Expo, Elastic, Power2 } from "gsap";
import React, { useRef, ReactElement, MouseEvent, UIEvent } from "react";
import About from "./About";
import { handleHoverEnter, handleHoverLeave } from "./utility";
import "./Section.scss";
// import { sections } from "./data/sections";

interface SectionProps {
  title?: string;
  children?: ReactElement;
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="section">
      {title ? <h1 className="section__title">{title}</h1> : null}
      {children}
    </div>
  );
};

export default Section;
