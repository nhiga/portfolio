import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronDown,
  faCommentAlt,
  faMobile,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TweenLite, Expo, Ease, TimelineMax, Linear, TweenMax } from "gsap";
import debounce from "lodash/debounce";
import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Extras from "./Extras";
import Nav from "./Nav";
// import Page from "./Page";

import cloud from "./cloud.png";
// import heroLayer1 from "./hero-layer-1.png";
import heroLayer1Desktop from "./hero-layer-1-desktop.png";
import heroLayer2 from "./hero-layer-2.png";
import heroLayer3 from "./hero-layer-3.jpg";
import heroLayer3Desktop from "./hero-layer-3-desktop.jpg";
import logo from "./nh-logo.svg";

import "./App.scss";
import "./Page.scss";

library.add(fab, faChevronDown, faCommentAlt, faMobile, faTimesCircle);

interface AppState {
  currentHeader: number;
  offsetY: number;
}

type Action =
  | {
      type: "SET_NEXT_HEADER";
    }
  | {
      type: "SET_OFFSET_Y";
      value: number;
    };

const initialState = {
  currentHeader: 0,
  offsetY: 0
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_NEXT_HEADER":
      return { ...state, currentHeader: (state.currentHeader + 1) % 3 };
    case "SET_OFFSET_Y":
      return { ...state, offsetY: action.value };
    default:
      throw new Error(`Error occurred in App.reducer`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  let cloudRef: HTMLImageElement | null = null;
  let headerRef: HTMLDivElement | null = null;
  let btnScrollRef: HTMLButtonElement | null = null;
  let layer3Ref: HTMLDivElement | null = null;
  let pageRef: HTMLDivElement | null = null;

  const isMobile: boolean = navigator
    ? !!navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
      )
    : false;

  const adjustOffset = (scroll: boolean = false) => {
    if (scroll) {
      handleScroll();
    }
    if (pageRef && layer3Ref) {
      const dy = -1 * pageRef.clientHeight;
      TweenMax.set(layer3Ref, {
        scale: 2,
        y: dy,
        z: -1
      });
    }
  };

  useEffect(() => {
    TweenLite.fromTo(
      headerRef,
      1,
      { opacity: 0, scale: 0.8 },
      { color: "#ffad33", opacity: 1, scale: 1 }
    );
    const timeoutId = setTimeout(() => {
      dispatch({ type: "SET_NEXT_HEADER" });
    }, 5000);

    const timeoutId2 = setTimeout(() => {
      if (headerRef) {
        TweenLite.to(headerRef, 1, { color: "#ffffff", opacity: 0 });
      }
    }, 3750);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [headerRef, state.currentHeader]);

  useEffect(() => {
    if (cloudRef) {
      const fullVw = window.innerWidth;
      const imgWidth = cloudRef.clientWidth;
      const duration = isMobile ? 60 : 120;
      TweenMax.fromTo(
        cloudRef as {},
        duration,
        {
          x: -imgWidth
        },
        {
          ease: Linear.easeNone,
          x: fullVw,
          repeat: -1
        }
      );
    }

    if (!isMobile) {
      if (btnScrollRef) {
        const scrollBtnAnimation = new TimelineMax({ paused: true });
        scrollBtnAnimation.set(btnScrollRef as {}, {
          autoAlpha: 0,
          yPercent: -400
        });
        scrollBtnAnimation.to(btnScrollRef as {}, 0.5, {
          autoAlpha: 1
        });
        scrollBtnAnimation.to(btnScrollRef as {}, 0.75, {
          ease: Expo.easeOut,
          yPercent: 0
        });
        scrollBtnAnimation.to(btnScrollRef as {}, 5, {
          autoAlpha: 0,
          clearProps: "all"
        });
        scrollBtnAnimation.play(0);
      }
    } else {
      const forceAdjustOffset = debounce(() => {
        dispatch({ type: "SET_OFFSET_Y", value: state.offsetY + 1 });
      }, 200);
      window.addEventListener("resize", forceAdjustOffset);

      return () => {
        window.removeEventListener("resize", forceAdjustOffset);
      };
    }
  }, []);

  const handleScroll = () => {
    if (isMobile) {
      TweenLite.to(window, 2, {
        scrollTo: { y: ".page" },
        ease: Expo.easeOut
      });
    } else {
      TweenLite.to("#container", 2, {
        scrollTo: { y: ".page" },
        ease: Expo.easeInOut
      });
    }
  };

  const headers = [
    <h1 className="layer__header-title">quality</h1>,
    <h1 className="layer__header-title">passion</h1>,
    <h1 className="layer__header-title">experience</h1>
  ];

  const setRef = (element: HTMLDivElement) => {
    if (element) {
      pageRef = element;
      if (isMobile) {
        adjustOffset();
      }
    }
  };

  const pageContainer = (
    <div ref={setRef} className="page">
      <div className="page__content">
        <BrowserRouter>
          <>
            <div className="app__title">
              <span className="app__title--highlight">NEAL</span>
              <img src={logo} alt="logo" className="app__title-logo" />
              <span className="app__title--primary">HIGA</span>
            </div>
            <Nav />
            <Route path="/about" exact>
              {({ match }) => (
                <About
                  show={match !== null}
                  adjustOffset={isMobile ? adjustOffset : undefined}
                />
              )}
            </Route>
            <Route path="/experience" exact>
              {({ match }) => (
                <Experience
                  show={match !== null}
                  adjustOffset={isMobile ? adjustOffset : undefined}
                />
              )}
            </Route>
            <Route path="/extras" exact>
              {({ match }) => (
                <Extras
                  show={match !== null}
                  adjustOffset={isMobile ? adjustOffset : undefined}
                />
              )}
            </Route>
            <Route path="/:slug">
              {({ match }) => {
                const paths = ["about", "experience", "extras"];
                if ((match && !paths.includes(match.params.slug)) || !match) {
                  return <Redirect to="/about" />;
                }
                return null;
              }}
            </Route>
          </>
        </BrowserRouter>
      </div>
    </div>
  );

  const mobileContainer = (
    <>
      <div className="container">
        <div ref={div => (layer3Ref = div)} className="layer layer__3">
          <div className="cloud">
            <img
              ref={img => (cloudRef = img)}
              src={cloud}
              alt="cloud"
              className="cloud-l"
            />
          </div>
          <div className="hero">
            <img src={heroLayer3} alt="Image layer 3" className="hero__image" />
          </div>
          <div className="hero layer__2">
            <img src={heroLayer2} alt="Image layer 2" className="hero__image" />
          </div>
          <div className="header__mobile">
            <img src={logo} alt="logo" className="hero__logo" />
            <div ref={div => (headerRef = div)} className="">
              {headers[state.currentHeader]}
            </div>
          </div>
        </div>
        <div className="layer layer__1">
          <div className="hero">
            <FontAwesomeIcon icon="mobile" className="app__mobile" />
            <img
              src={heroLayer1Desktop}
              alt="Image layer 1"
              className="hero__image"
            />
            <div className="overlay--fade" />
          </div>
          {pageContainer}
        </div>
      </div>
    </>
  );

  const desktopContainer = (
    <div id="container" className="container desktop">
      <div className="layer desktop layer__header">
        <img src={logo} alt="logo" className="hero__logo" />
        <div ref={div => (headerRef = div)}>{headers[state.currentHeader]}</div>
      </div>
      <div className="layer desktop layer__3">
        <div className="cloud">
          <img
            ref={img => (cloudRef = img)}
            src={cloud}
            alt="cloud"
            className="cloud-l desktop"
          />
        </div>
        <div className="hero">
          <img
            src={heroLayer3Desktop}
            alt="Image layer 3"
            className="hero__image desktop"
          />
        </div>
      </div>
      <div className="layer desktop layer__2">
        <div className="hero">
          <img
            src={heroLayer2}
            alt="Image layer 2"
            className="hero__image desktop"
          />
        </div>
      </div>
      <div className="layer desktop layer__1">
        <div className="hero">
          <img
            src={heroLayer1Desktop}
            alt="Image layer 1"
            className="hero__image desktop"
          />
          <div className="overlay--fade" />
        </div>
        <div className="overlay__scroll">
          <button
            ref={btn => (btnScrollRef = btn)}
            type="button"
            className="button__scroll"
            onClick={handleScroll}
          >
            <FontAwesomeIcon
              icon="chevron-down"
              className="button__scroll-icon"
            />
          </button>
        </div>
        {pageContainer}
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? mobileContainer : desktopContainer}
      <Contact modal={isMobile} />
    </>
  );
}

export default App;
