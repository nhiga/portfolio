import React from "react";
import { Transition } from "react-transition-group";
import { TweenMax, Back, Linear } from "gsap";

interface ExtrasProps {
  show: boolean;
  adjustOffset?: (offsetY: number) => void;
}

const startState = { autoAlpha: 0, display: "none", scale: 0.9 };

function Extras({ show, adjustOffset }: ExtrasProps) {
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
            <span className="page--highlight">Extras</span>
          </h2>
          <ul>
            <li>Blog post: Performant Parallax with CSS (coming soon)</li>
            <li>
              Blog post: Deploying Your Application Using Netlify (coming soon)
            </li>
            <li>
              Code Sandbox: Playing with React hooks and a carousel component
              (coming soon)
            </li>
          </ul>
        </section>
        <section className="page__section">
          <h2>
            <span className="page--highlight">...and Credits</span>
          </h2>
          <ul>
            <li>Original photo by Max Saeling on Unsplash</li>
          </ul>
        </section>
      </article>
    </Transition>
  );
}

export default Extras;
