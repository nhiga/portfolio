import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TimelineLite, TweenLite } from "gsap";
import React, { useReducer } from "react";
// import Media from "react-media";
import "./Contact.scss";

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
    TweenLite.set(closeRefMobile, { display: "block" });
    TweenLite.set(modalOverlayRef, { display: "flex" });
  };

  const handleContactCloseMobile = () => {
    TweenLite.to(modalOverlayRef, 0.1, { display: "none" });
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
          </div>
        </>
      )}
    </>
  );
}

export default Contact;
