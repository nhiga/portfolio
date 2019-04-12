import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TimelineLite, TweenLite, TweenMax, Back, Linear } from "gsap";
import React, { useReducer } from "react";
// import Media from "react-media";
import "./Contact.scss";
import { Transition } from "react-transition-group";

interface ContactProps {
  modal: boolean;
}

interface ContactState {
  contactOpen: boolean;
}

type Action = {
  type: "OPEN_CONTACT" | "CLOSE_CONTACT";
};

const initialState = {
  contactOpen: false
};

function reducer(state: ContactState, action: Action) {
  switch (action.type) {
    case "CLOSE_CONTACT":
      return { ...state, contactOpen: false };
    case "OPEN_CONTACT":
      return { ...state, contactOpen: true };
    default:
      throw new Error(`Error occurred in Contact.reducer`);
  }
}

function Contact({ modal = false }: ContactProps) {
  let contactRef: HTMLDivElement | null = null;
  let contentRef: HTMLDivElement | null = null;
  let closeRef: HTMLButtonElement | null = null;
  let closeRefMobile: HTMLButtonElement | null = null;
  let modalOverlayRef: HTMLDivElement | null = null;
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleContactOpen = () => {
    try {
      if (!state.contactOpen) {
        dispatch({ type: "OPEN_CONTACT" });
        if (contactRef && contentRef && closeRef) {
          const width = contactRef.clientWidth;
          const tl = new TimelineLite();
          tl.to(contactRef, 0.5, {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: width * 5.5
          });
          tl.to([contentRef, closeRef], 0.1, {
            display: "block"
          });
          tl.to([contentRef, closeRef], 1, {
            opacity: 1
          });
        }
      }
    } catch (e) {
      console.log(`[Contact] An error occurred opening the contact pane`, e);
    }
  };

  const handleContactClose = () => {
    try {
      if (state.contactOpen && contactRef && contentRef && closeRef) {
        const tl = new TimelineLite();
        tl.to([contentRef, closeRef], 0.5, {
          opacity: 0
        });
        tl.to([contentRef, closeRef], 0.1, {
          display: "none"
        });
        tl.to(contactRef, 0.5, {
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          width: "5em",
          clearProps: "all"
        });
        tl.to(contactRef, 0.1, {
          justifyContent: "center",
          onComplete: () => dispatch({ type: "CLOSE_CONTACT" })
        });
      }
    } catch (e) {
      console.log(`[Contact] An error occurred closing the contact pane`, e);
    }
  };

  const handleContactOpenMobile = () => {
    // const tl = new TimelineLite();
    // tl.set(closeRefMobile as {}, { display: "block" });
    // tl.set(modalOverlayRef as {}, { display: "flex" });
    dispatch({ type: "OPEN_CONTACT" });
  };

  const handleContactCloseMobile = () => {
    // TweenLite.to(modalOverlayRef, 0.1, { display: "none" });
    dispatch({ type: "CLOSE_CONTACT" });
  };

  const contactContent = modal ? (
    <div>
      Contact form coming soon! In the meantime, if you'd like to get in touch,
      please connect with me on&nbsp;
      <a
        href="https://www.linkedin.com/in/neal-higa-senior-software-engineer/"
        target="_blank"
      >
        <span className="link--bold">LinkedIn.</span>
      </a>
      &nbsp;&nbsp;
      <a
        className="linkedin"
        href="https://www.linkedin.com/in/neal-higa-senior-software-engineer/"
        target="_blank"
      >
        <FontAwesomeIcon icon={["fab", "linkedin"]} />
      </a>
    </div>
  ) : (
    <div>
      If you'd like to get in touch, please
      <br />
      connect with me on&nbsp;
      <a
        href="https://www.linkedin.com/in/neal-higa-senior-software-engineer/"
        target="_blank"
      >
        <span className="link--bold">LinkedIn.</span>
      </a>
      &nbsp;&nbsp;
      <a
        className="linkedin"
        href="https://www.linkedin.com/in/neal-higa-senior-software-engineer/"
        target="_blank"
      >
        <FontAwesomeIcon icon={["fab", "linkedin"]} />
      </a>
    </div>
  );

  return (
    <>
      {!modal ? (
        <div
          ref={div => (contactRef = div)}
          className={`contact desktop${state.contactOpen ? " open" : ""}`}
        >
          <button className="contact__button-open" onClick={handleContactOpen}>
            <FontAwesomeIcon icon="comment-alt" />
          </button>
          <div ref={div => (contentRef = div)} className="contact__content">
            {contactContent}
          </div>
          <button
            ref={div => (closeRef = div)}
            id="btnContactClose"
            className="contact__button-close-desktop"
            onClick={handleContactClose}
          >
            <FontAwesomeIcon icon="times-circle" />
          </button>
        </div>
      ) : (
        <>
          <div
            ref={div => (contactRef = div)}
            className={`contact${state.contactOpen ? " open" : ""}`}
          >
            <button
              className="contact__button-open"
              onClick={handleContactOpenMobile}
            >
              <FontAwesomeIcon icon="comment-alt" />
            </button>
          </div>
          <div
            ref={div => (modalOverlayRef = div)}
            className="contact__overlay"
          >
            <Transition
              unmountOnExit
              in={state.contactOpen}
              timeout={1000}
              onEnter={(node, isAppearing) => {
                TweenMax.set(node, {
                  autoAlpha: 0,
                  display: "none",
                  scale: 0.9
                });
              }}
              addEndListener={(node, done) => {
                if (state.contactOpen) {
                  TweenMax.set(modalOverlayRef as {}, { display: "flex" });
                }

                const vars = {
                  autoAlpha: state.contactOpen ? 1 : 0,
                  delay: state.contactOpen ? 0.2 : 0,
                  display: state.contactOpen ? "flex" : "none",
                  ease: state.contactOpen
                    ? Back.easeOut.config(1.7)
                    : Linear.easeOut,
                  scale: 1,
                  onComplete: done
                };

                TweenMax.to(node, 0.2, vars);

                if (!state.contactOpen) {
                  TweenMax.set(modalOverlayRef as {}, {
                    delay: 0.2,
                    display: "none"
                  });
                }
              }}
            >
              <div className="contact__modal">
                {contactContent}
                <button
                  ref={div => (closeRefMobile = div)}
                  className="contact__button-close"
                  onClick={handleContactCloseMobile}
                >
                  close
                </button>
              </div>
            </Transition>
          </div>
        </>
      )}
    </>
  );
}

export default Contact;
