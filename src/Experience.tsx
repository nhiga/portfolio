import React, { useEffect } from "react";
import { Transition } from "react-transition-group";
import { TweenMax, Back, Linear } from "gsap";

interface ExperienceProps {
  show: boolean;
  adjustOffset?: (offsetY: number) => void;
}

const startState = { autoAlpha: 0, display: "none", scale: 0.9 };

function Experience({ show, adjustOffset }: ExperienceProps) {
  let articleRef: HTMLElement | null = null;

  const setRef = (element: HTMLElement) => {
    articleRef = element;
  };

  return (
    <Transition
      unmountOnExit
      in={show}
      timeout={1000}
      onEnter={(node, isAppearing) => {
        TweenMax.set(node, startState);
      }}
      onEntered={node => {
        if (show && adjustOffset && articleRef) {
          adjustOffset(articleRef.clientHeight);
        }
      }}
      addEndListener={(node, done) => {
        const vars = {
          autoAlpha: show ? 1 : 0,
          delay: show ? 0.2 : 0,
          display: show ? "block" : "none",
          ease: show ? Back.easeOut.config(1.7) : Linear.easeOut,
          scale: 1,
          onComplete: done
        };

        TweenMax.to(node, 0.2, vars);
      }}
    >
      <article ref={setRef}>
        <section className="page__section">
          <div className="page__section-header">
            <h2 className="page__section-header-item">
              <span className="page--highlight">Senior Software Engineer</span>
            </h2>
            <h2 className="page__section-header-item">
              <span>Esurance</span>
            </h2>
          </div>
          <h4>
            <span className="page--secondary">
              September 2015 - October 2018
            </span>
          </h4>
          <h5>San Francisco</h5>
          <ul>
            <li>Full-stack JavaScript engineer</li>
            <li>
              Designed and developed a platform for creating a library of
              reusable React components that can be integrated into non-React
              legacy applications
            </li>
            <li>
              Developed client-facing e-commerce and customer service
              representative web applications
            </li>
          </ul>
        </section>
        <section className="page__section">
          <div className="page__section-header">
            <h2 className="page__section-header-item">
              <span className="page--highlight">
                Software Developer & Consultant
              </span>
            </h2>
            <h2 className="page__section-header-item">
              <span>Hewlett-Packard</span>
            </h2>
          </div>
          <h4>
            <span className="page--secondary">
              August 2008 – September 2015
            </span>
          </h4>
          <h5>San Francisco</h5>
          <ul>
            <li>Web and applications developer</li>
            <li>Microsoft Dynamics CRM developer</li>
            <li>
              Developed various applications for the Public Sector and Financial
              industry, as well as Customer Engagement Management and Warranty
              Claims Management systems
            </li>
          </ul>
        </section>
        <section className="page__section">
          <div className="page__section-header">
            <h2 className="page__section-header-item">
              <span className="page--highlight">Software Developer</span>
            </h2>
            <h2 className="page__section-header-item">
              <span>Electronic Data Systems</span>
            </h2>
          </div>
          <h4>
            <span className="page--secondary">April 2004 - July 2008</span>
          </h4>
          <h5>Los Angeles</h5>
          <ul>
            <li>Web and applications developer</li>
            <li>Developed various applications for the airline industry</li>
          </ul>
        </section>
      </article>
    </Transition>
  );
}

export default Experience;
