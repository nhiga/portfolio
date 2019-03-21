import { TweenLite, Back, Expo, Elastic, Power2 } from "gsap";
import React, { useRef, ReactElement, MouseEvent, UIEvent } from "react";
import About from "./About";
import { handleHoverEnter, handleHoverLeave } from "./utility";
import "./Section.scss";
// import { sections } from "./data/sections";

interface SectionProps {
  title: string;
  description: string | null;
  iconClass?: string;
  detail?: string | null;
  children?: ReactElement;
}

const Section = ({
  title,
  description,
  iconClass = "far fa-times-circle",
  detail = null,
  children
}: SectionProps) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const id = `section-${title.replace(" ", "").toLowerCase()}`;

  const handleSectionMouseEnter = () => {
    if (bodyRef && bodyRef.current) {
      TweenLite.to(bodyRef.current, 0.5, {
        backgroundColor: "#cce3ff"
      });
    }
  };

  const handleSectionMouseLeave = () => {
    if (bodyRef && bodyRef.current) {
      TweenLite.to(bodyRef.current, 0.5, {
        backgroundColor: "#ebf4ff"
      });
    }
  };

  const handleSectionDetailOpen = () => {
    if (detailRef && detailRef.current) {
      TweenLite.to(detailRef.current, 0.5, {
        top: "-=100vh",
        ease: Elastic.easeOut.config(1, 0.6)
      });
    }
  };

  const handleSectionDetailClose = () => {
    if (detailRef && detailRef.current) {
      TweenLite.to(detailRef.current, 0.3, {
        top: "+=100vh",
        ease: Back.easeIn.config(1.5),
        clearProps: "all"
      });
    }
  };

  return (
    <>
      <div
        id={`${id}`}
        className="section"
        onMouseEnter={handleSectionMouseEnter}
        onMouseLeave={handleSectionMouseLeave}
      >
        <div ref={bodyRef} id={`${id}Body`} className="section__body">
          <div className="section__hero">
            <i className={`section__hero-icon ${iconClass}`} />
          </div>
          <div className="section__content">
            <h1 className="section__content-title">{title}</h1>
            <p className="section__content-description">{description}</p>
            {children ? (
              <p className="section__content-more">
                <br />
                <a href="#" onClick={handleSectionDetailOpen}>
                  Read more
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div ref={detailRef} className="section__detail">
        <button
          id="btnDetailClose"
          className="button__close small"
          type="button"
          onMouseEnter={() => handleHoverEnter("btnDetailClose")}
          onMouseLeave={() => handleHoverLeave("btnDetailClose")}
          onClick={handleSectionDetailClose}
        >
          <i className="fas fa-times-circle" />
        </button>
        <h1 className="section__detail-title">{title}</h1>
        <div className="section__detail-content">
          {children ? children : null}
        </div>
      </div>
    </>
  );
};

export default Section;
