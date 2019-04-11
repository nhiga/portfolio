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
import Page from "./Page";

import cloud from "./cloud.png";
import heroLayer1 from "./hero-layer-1.png";
import heroLayer1Desktop from "./hero-layer-1-desktop.png";
import heroLayer2 from "./hero-layer-2.png";
import heroLayer3 from "./hero-layer-3.jpg";
import heroLayer3Desktop from "./hero-layer-3-desktop.jpg";
import logo from "./nh-logo.svg";

import "./App.scss";

library.add(fab, faChevronDown, faCommentAlt, faMobile, faTimesCircle);

interface AppState {
  currentHeader: number;
  pageHeight: number;
}

type Action =
  | {
      type: "SET_NEXT_HEADER";
    }
  | {
      type: "SET_PAGE_HEIGHT";
      value: number;
    };

const initialState = {
  currentHeader: 0,
  pageHeight: 0
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_NEXT_HEADER":
      return { ...state, currentHeader: (state.currentHeader + 1) % 3 };
    case "SET_PAGE_HEIGHT":
      return { ...state, pageHeight: action.value };
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

  const init = () => {
    if (pageRef && layer3Ref) {
      const dy = -1 * pageRef.clientHeight;
      layer3Ref.style.transform = `translateY(${dy}px) translateZ(-1px) scale(2)`;
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

    return () => {
      clearTimeout(timeoutId);
    };
  }, [headerRef, state.currentHeader]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (headerRef) {
        TweenLite.to(headerRef, 1, { color: "#ffffff", opacity: 0 });
      }
    }, 3750);

    return () => {
      clearTimeout(timeoutId);
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
          left: -imgWidth
        },
        {
          ease: Linear.easeNone,
          left: fullVw,
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
      init();
      const debouncedInit = debounce(init, 250);
      window.addEventListener("resize", debouncedInit);

      return () => {
        window.removeEventListener("resize", debouncedInit);
      };
    }
  }, []);

  const handleScrollClick = () => {
    if (isMobile) {
      TweenLite.to(window, 2, {
        scrollTo: { y: ".page" },
        ease: Expo.easeInOut
      });
    }
    TweenLite.to("#container", 2, {
      scrollTo: { y: ".page" },
      ease: Expo.easeInOut
    });
  };

  const headerClass = isMobile
    ? "layer__header-title"
    : "layer-desktop__header-title";

  const headers = [
    <h1 className="layer__header-title">quality</h1>,
    <h1 className="layer__header-title">passion</h1>,
    <h1 className="layer__header-title">experience</h1>
  ];

  const processRef = (element: HTMLDivElement) => {
    pageRef = element;
    if (isMobile && pageRef && pageRef.clientHeight !== state.pageHeight) {
      dispatch({ type: "SET_PAGE_HEIGHT", value: pageRef.clientHeight });
      init();
    }
  };

  const pageContainer = (
    <BrowserRouter>
      <div ref={processRef} className="page__container">
        <Page>
          <>
            <div className="app__title">
              <span className="app__title--highlight">NEAL</span>
              <img src={logo} alt="logo" className="app__title-logo" />
              <span className="app__title--primary">HIGA</span>
            </div>
            <Nav />
            <Route path="/about" exact>
              {({ match }) => <About show={match !== null} />}
            </Route>
            <Route path="/experience" exact>
              {({ match }) => <Experience show={match !== null} />}
            </Route>
            <Route path="/extras" exact>
              {({ match }) => <Extras show={match !== null} />}
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
        </Page>
      </div>
    </BrowserRouter>
  );

  const mobileContainer = (
    <>
      <div className="container">
        <div className="layer layer__header">
          <img src={logo} alt="logo" className="hero__logo" />
          <div ref={div => (headerRef = div)}>
            {headers[state.currentHeader]}
          </div>
        </div>
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
        </div>
        {/* <div className="layer layer__2">
          <div className="hero">
            <img src={heroLayer2} alt="Image layer 2" className="hero__image" />
          </div>
        </div> */}
        <div className="layer layer__1">
          <FontAwesomeIcon icon="mobile" className="app__mobile" />
          <div className="hero">
            <img
              src={heroLayer1Desktop}
              alt="Image layer 1"
              className="hero__image"
            />
            <div className="overlay--fade" />
          </div>
          {pageContainer}
          {/* <BrowserRouter>
            <Page>
              <>
                <div className="app__title">
                  <span className="app__title--highlight">NEAL</span>
                  <img src={logo} alt="logo" className="app__title-logo" />
                  <span className="app__title--primary">HIGA</span>
                </div>
                <Nav />
                <Route path="/about" exact>
                  {({ match }) => {
                    if (match) {
                      // dispatch({ type: "SET_PAGE", value: match.path });
                      console.log(`[App] about`, match);
                    }
                    return <About show={match !== null} />;
                  }}
                </Route>
                <Route path="/experience" exact>
                  {({ match }) => {
                    if (match) {
                      // dispatch({ type: "SET_PAGE", value: match.path });
                      console.log(`[App] about`, match);
                    }
                    return <Experience show={match !== null} />;
                  }}
                </Route>
                <Route path="/extras" exact>
                  {({ match }) => {
                    if (match) {
                      // dispatch({ type: "SET_PAGE", value: match.path });
                      console.log(`[App] about`, match);
                    }
                    return <Extras show={match !== null} />;
                  }}
                </Route>
                <Route path="/:slug">
                  {({ match }) => {
                    const paths = ["about", "experience", "extras"];
                    if (
                      (match && !paths.includes(match.params.slug)) ||
                      !match
                    ) {
                      return <Redirect to="/about" />;
                    }
                    return null;
                  }}
                </Route>
              </>
            </Page>
          </BrowserRouter> */}
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
        <img
          ref={img => (cloudRef = img)}
          src={cloud}
          alt="cloud"
          className="cloud-l"
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
            onClick={handleScrollClick}
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
      {/* <div id="container" className={`container${!isMobile ? " desktop" : ""}`}>
        <div className={`layer layer__header${!isMobile ? " desktop" : ""}`}>
          <img src={logo} alt="logo" className="hero__logo" />
          <div ref={div => (headerRef = div)}>
            {headers[state.currentHeader]}
          </div>
        </div>
        <div className={`layer layer__3${!isMobile ? " desktop" : ""}`}>
          <img
            ref={img => (cloudRef = img)}
            src={cloud}
            alt="cloud"
            className="cloud-l"
          />
          <div className="hero">
            <img
              src={isMobile ? heroLayer3 : heroLayer3Desktop}
              alt="Image layer 3"
              className="hero__image"
            />
          </div>
        </div>
        {!isMobile ? (
          <div className="layer layer__2">
            <div className="hero">
              <img
                src={heroLayer2}
                alt="Image layer 2"
                className="hero__image"
              />
            </div>
          </div>
        ) : null}
        <div className="layer layer__1">
          {mobileIcon}
          <div className="hero">
            <img
              src={isMobile ? heroLayer1 : heroLayer1Desktop}
              alt="Image layer 1"
              className="hero__image"
            />
            <div className="overlay--fade" />
          </div>
          {!isMobile ? (
            <div className="overlay__scroll">
              <button
                ref={btn => (btnScrollRef = btn)}
                type="button"
                className="button__scroll"
                onClick={handleScrollClick}
              >
                <FontAwesomeIcon
                  icon="chevron-down"
                  className="button__scroll-icon"
                />
              </button>
            </div>
          ) : null}
          <BrowserRouter>
            <Page>
              <>
                <div className="app__title">
                  <span className="app__title--highlight">NEAL</span>
                  <img src={logo} alt="logo" className="app__title-logo" />
                  <span className="app__title--primary">HIGA</span>
                </div>
                <Nav />
                <Route path="/about" exact>
                  {({ match }) => {
                    return <About show={match !== null} />;
                  }}
                </Route>
                <Route path="/experience" exact>
                  {({ match }) => {
                    return <Experience show={match !== null} />;
                  }}
                </Route>
                <Route path="/extras" exact>
                  {({ match }) => <Extras show={match !== null} />}
                </Route>
                <Route path="/:slug">
                  {({ match }) => {
                    const paths = ["about", "experience", "extras"];
                    if (
                      (match && !paths.includes(match.params.slug)) ||
                      !match
                    ) {
                      return <Redirect to="/about" />;
                    }
                    return null;
                  }}
                </Route>
              </>
            </Page>
          </BrowserRouter>
        </div>
      </div> */}
      <Contact modal={isMobile} />
    </>
  );
}

export default App;
