import React, { useEffect, useRef } from "react";
import { Transition } from "react-transition-group";
import { TweenMax, Back, Linear } from "gsap";

interface AboutProps {
  show: boolean;
  adjustOffset?: (offsetY: number) => void;
}

const startState = { autoAlpha: 0, display: "none", scale: 0.9 };

function About({ show, adjustOffset }: AboutProps) {
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
          <h2>
            <span className="page--highlight">About Me</span>
          </h2>
          <p>
            I'm an experienced senior software engineer with a proven history
            working in a variety of industries and technologies. I am passionate
            about creating robust user-centric applications with an eye for
            detail and a focus on scalability and flexibility. Most recently
            engaged as a front-end leaning, full-stack software engineer
            utilizing JavaScript, including Node, Express, React, and Redux, and
            other technologies.
          </p>
          <p>Skills and technical experience include:</p>
          <ul>
            <li>
              Building a Node.js/Express web application from the ground up with
              server-side rendering using ES6
            </li>
            <li>
              Webpack 4 configuration with client and server-side hot reloading
            </li>
            <li>Babel configuration</li>
            <li>
              Designing and implementing a Redux store with Redux Thunk for
              asynchronous actions
            </li>
            <li>Building style sheets with the use of SASS</li>
            <li>Creating unit tests with Jest and Enzyme</li>
            <li>Creating and maintaining reusable library components </li>
            <li>TypeScript</li>
          </ul>
        </section>
      </article>
    </Transition>
  );
}

export default About;
