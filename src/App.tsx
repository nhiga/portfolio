import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronDown,
  faCommentAlt,
  faMobile,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TweenLite, Expo, TimelineMax, TweenMax } from "gsap";
import debounce from "lodash/debounce";
import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import About from "./About";
import Cloud from "./Cloud";
import Contact from "./Contact";
import Experience from "./Experience";
import Extras from "./Extras";
import Nav from "./Nav";
import Title from "./Title";

import logo from "./nh-logo.svg";
import heroLayer1Desktop from "./hero-layer-1-desktop.png";
import heroLayer2 from "./hero-layer-2.png";
import heroLayer3 from "./hero-layer-3.jpg";
import heroLayer3Desktop from "./hero-layer-3-desktop.jpg";

import "./App.scss";
import "./Page.scss";

library.add(fab, faChevronDown, faCommentAlt, faMobile, faTimesCircle);

interface AppState {
  currentHeader: number;
  clientWidth: number;
}

type Action =
  | {
      type: "SET_NEXT_HEADER";
    }
  | {
      type: "SET_CLIENT_WIDTH";
      value: number;
    };

const initialState = {
  currentHeader: 0,
  clientWidth: window.innerWidth
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_NEXT_HEADER":
      return { ...state, currentHeader: (state.currentHeader + 1) % 3 };
    case "SET_CLIENT_WIDTH":
      return { ...state, clientWidth: action.value };
    default:
      throw new Error(`Error occurred in App.reducer`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  let btnScrollRef: HTMLButtonElement | null = null;
  let containerRef: HTMLDivElement | null = null;
  let layer3Ref: HTMLDivElement | null = null;
  let pageRef: HTMLDivElement | null = null;
  const isMobile: boolean = navigator
    ? !!navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
      )
    : false;

  useEffect(() => {
    adjustOffset();
  }, [state.clientWidth]);

  useEffect(() => {
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
    }
    const forceAdjustOffset = debounce(() => {
      dispatch({ type: "SET_CLIENT_WIDTH", value: window.innerWidth });
    }, 200);
    window.addEventListener("resize", forceAdjustOffset);

    return () => {
      window.removeEventListener("resize", forceAdjustOffset);
    };
  }, []);

  function adjustOffset() {
    if (pageRef && layer3Ref) {
      const dy = -1 * pageRef.clientHeight;
      TweenMax.set(layer3Ref, {
        scale: 2,
        y: dy,
        z: -1
      });
    }
  }

  const handleScroll = () => {
    if (isMobile) {
      TweenLite.to(window, 0.5, {
        scrollTo: { autoKill: false, y: ".page" },
        ease: Expo.easeInOut
      });
    } else {
      TweenLite.to(containerRef, 1, {
        scrollTo: { autoKill: false, y: ".page" },
        ease: Expo.easeInOut
      });
    }
  };

  const pageContainer = (
    <div ref={div => (pageRef = div)} className="page">
      <div className="page__content">
        <BrowserRouter>
          <>
            <div className="app__title">
              <span className="app__title--highlight">NEAL</span>
              <img src={logo} alt="logo" className="app__title-logo" />
              <span className="app__title--primary">HIGA</span>
            </div>
            <Nav onClick={handleScroll} />
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
          <Cloud
            className="cloud-l"
            clientWidth={state.clientWidth}
            duration={60}
          />
          <div className="hero">
            <img src={heroLayer3} alt="Image layer 3" className="hero__image" />
          </div>
          <div className="hero layer__2">
            <img src={heroLayer2} alt="Image layer 2" className="hero__image" />
          </div>
          <Title className="header__mobile" />
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
    <div ref={div => (containerRef = div)} className="container desktop">
      <Title className="layer desktop layer__header" />
      <div className="layer desktop layer__3">
        <Cloud
          className="cloud-l desktop"
          clientWidth={state.clientWidth}
          duration={120}
        />
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
