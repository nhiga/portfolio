// @ts-ignore
import {
  TweenLite,
  TimelineLite,
  Expo,
  Ease,
  Power4,
  SlowMo,
  TimelineMax
} from "gsap";
import React, { useEffect, useReducer, useRef } from "react";
import About from "./About";
import Experience from "./Experience";
import Page from "./Page";
import Section from "./Section";
import { sections } from "./data/sections";
import heroLayer1 from "./hero-layer-1.png";
import heroLayer2 from "./hero-layer-2.png";
import heroLayer3 from "./hero-layer-3.jpg";
// import hero2Layer1 from "./hero2-layer-1.jpg";
import hero2 from "./hero2b.jpg";
import "./App.scss";

interface AppState {
  currentHeader: number;
}

type Action = {
  type: "NEXT_HEADER";
};

const initialState = {
  currentHeader: 0
};

function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case "NEXT_HEADER":
      return { ...state, currentHeader: (state.currentHeader + 1) % 3 };
    default:
      throw new Error(`Error occurred in App.reducer`);
  }
}

function App() {
  const contactRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    TweenLite.to("#header", 1, { color: "#ffad33", opacity: 1 });
    const timeoutId = setTimeout(() => {
      dispatch({ type: "NEXT_HEADER" });
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state.currentHeader]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      TweenLite.to("#header", 1, { color: "#ffffff", opacity: 0 });
    }, 3750);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state.currentHeader]);

  useEffect(() => {
    const scrollBtnAnimation = new TimelineMax({ paused: true });
    scrollBtnAnimation.set("#btnScroll", {
      yPercent: -400
    });
    scrollBtnAnimation.to("#btnScroll", 0.5, {
      opacity: 1
    });
    scrollBtnAnimation.to("#btnScroll", 0.75, {
      ease: Expo.easeOut,
      opacity: 1,
      yPercent: 0
    });
    scrollBtnAnimation.to("#btnScroll", 0.5, {
      opacity: 0,
      clearProps: "all"
    });
    scrollBtnAnimation.play(0);
  }, []);

  const handleScrollEnter = () => {
    TweenLite.to("#btnScroll", 1, {
      opacity: 1
    });
  };

  const handleScrollLeave = () => {
    TweenLite.to("#btnScroll", 1, {
      opacity: 0
    });
  };

  const handleScrollClick = (
    targetElement: string,
    scrollToElement: string,
    easing: Ease,
    duration: number
  ) => {
    TweenLite.to(targetElement, duration, {
      scrollTo: { y: scrollToElement },
      ease: easing
    });
  };

  const handleContactOpen = () => {
    try {
      if (contactRef && contactRef.current) {
        const width = contactRef.current.clientWidth;
        const tl = new TimelineLite();
        tl.to(contactRef.current, 1, {
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          width: width * 5.5
        });
        tl.to([`.overlay__contact-content`, `.overlay__contact-close`], 0.1, {
          display: "block"
        });
        tl.to([`.overlay__contact-content`, `.overlay__contact-close`], 1, {
          opacity: 1
        });
      }
    } catch (e) {
      console.log(`[App] An error occurred opening the contact pane`, e);
    }
  };

  const handleContactClose = () => {
    try {
      if (contactRef && contactRef.current) {
        const tl = new TimelineLite();
        tl.to([`.overlay__contact-content`, `.overlay__contact-close`], 1, {
          opacity: 0
        });
        tl.to([`.overlay__contact-content`, `.overlay__contact-close`], 0.1, {
          display: "none"
        });
        tl.to(contactRef.current, 1, {
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          width: "5em",
          clearProps: "all"
        });
        tl.to(contactRef.current, 1, {
          justifyContent: "center"
        });
      }
    } catch (e) {
      console.log(`[App] An error occurred closing the contact pane`, e);
    }
  };

  const headers = [
    <h1 className="layer__header-title">passion</h1>,
    <h1 className="layer__header-title">experience</h1>,
    <h1 className="layer__header-title">results</h1>
  ];

  return (
    <>
      <div id="container" className="container">
        <div className="layer layer__header">
          <div id="header">{headers[state.currentHeader]}</div>
        </div>
        <div className="layer layer__3">
          <div className="hero">
            <img src={heroLayer3} alt="Image layer 3" className="hero__image" />
          </div>
        </div>
        <div className="layer layer__2">
          <div className="hero">
            <img src={heroLayer2} alt="Image layer 2" className="hero__image" />
          </div>
        </div>
        <div className="divider-1__layer-1">
          <img src={hero2} alt="Image layer 1" className="divider-1__image" />
          <div className="divider-1__layer-2" />
        </div>
        <div className="layer layer__1">
          <div className="hero">
            <img src={heroLayer1} alt="Image layer 1" className="hero__image" />
            <div className="overlay--fade" />
          </div>
          <div className="overlay__scroll">
            <button
              id="btnScroll"
              type="button"
              className="button__scroll"
              onClick={() =>
                handleScrollClick("#container", ".page", Expo.easeInOut, 2)
              }
            >
              <i className="fas fa-chevron-down" />
            </button>
          </div>
          <Page>
            <>
              <div className="app__title">
                <span className="app__title--highlight">NEAL </span>
                <span className="app__title--primary">HIGA</span>
              </div>
              <Section {...sections["About"]}>
                <About />
              </Section>
              <div className="overlay__scroll">
                <button
                  id="btnScroll"
                  type="button"
                  className="button__scroll"
                  onClick={() =>
                    handleScrollClick(
                      "#container",
                      "#experience",
                      SlowMo.ease.config(0.7, 0.4, false),
                      2
                    )
                  }
                >
                  <i className="fas fa-chevron-down" />
                </button>
              </div>
            </>
          </Page>
          <div className="divider-1">
            <div className="overlay__divider--fade" />
          </div>
          <div id="experience" />
          <Page className="page__experience">
            <Section {...sections["Experience"]}>
              <Experience />
            </Section>
          </Page>
        </div>
      </div>
      <div ref={contactRef} className="overlay__contact">
        <button
          id="btnContactOpen"
          className="overlay__contact-button"
          // onMouseEnter={() => handleHoverEnter("btnContactOpen")}
          // onMouseLeave={() => handleHoverLeave("btnContactOpen")}
          onClick={handleContactOpen}
        >
          <i className="overlay__contact-icon fas fa-comment-alt" />
        </button>
        <div className="overlay__contact-content">
          If you'd like to get in touch, please
          <br />
          connect with me on&nbsp;
          <a
            href="https://www.linkedin.com/in/neal-higa-senior-software-engineer/"
            target="_blank"
          >
            LinkedIn!
          </a>
          &nbsp;&nbsp;
          <a
            id="linkLinkedIn"
            className="linkedin"
            href="https://www.linkedin.com/in/neal-higa-senior-software-engineer/"
            target="_blank"
            // onMouseEnter={() => handleHoverEnter("linkLinkedIn")}
            // onMouseLeave={() => handleHoverLeave("linkLinkedIn")}
          >
            <i className="fab fa-linkedin" />
          </a>
        </div>
        <div className="overlay__contact-close">
          <button
            id="btnContactClose"
            className="small"
            onClick={handleContactClose}
            // onMouseEnter={() => handleHoverEnter("btnContactClose")}
            // onMouseLeave={() => handleHoverLeave("btnContactClose")}
          >
            <i className="fas fa-times-circle" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
