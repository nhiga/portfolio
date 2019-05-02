import { TimelineMax } from "gsap";
import React, { useEffect, useState } from "react";

import logo from "./nh-logo.svg";

interface TitleProps {
  className: string;
}

function Title({ className }: TitleProps) {
  const [currentHeader, setHeader] = useState(0);
  let headerRef: HTMLDivElement | null = null;

  const headers = [
    <h1 className="layer__header-title">quality</h1>,
    <h1 className="layer__header-title">passion</h1>,
    <h1 className="layer__header-title">experience</h1>
  ];

  useEffect(() => {
    const tl = new TimelineMax();
    tl.fromTo(
      headerRef as {},
      1,
      { autoAlpha: 0, scale: 0.8 },
      { color: "#ffad33", autoAlpha: 1, scale: 1 }
    );
    tl.to(
      headerRef as {},
      1,
      {
        color: "#ffffff",
        autoAlpha: 0,
        onComplete: () => setHeader((currentHeader + 1) % 3)
      },
      "+=3"
    );

    return () => {
      tl.kill();
    };
  }, [currentHeader]);

  return (
    <div className={className}>
      <img src={logo} alt="logo" className="hero__logo" />
      <div ref={div => (headerRef = div)} className="">
        {headers[currentHeader]}
      </div>
    </div>
  );
}

export default Title;
