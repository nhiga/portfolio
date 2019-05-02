import { Linear, TweenMax } from "gsap";
import React, { useEffect } from "react";

import cloud from "./images/cloud.png";

interface CloudProps {
  className: string;
  clientWidth: number;
  duration: number;
}

function Cloud({ className, clientWidth, duration }: CloudProps) {
  let cloudRef: HTMLImageElement | null = null;
  useEffect(() => {
    if (cloudRef) {
      const fullVw = window.innerWidth;
      const imgWidth = cloudRef.clientWidth;
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

      return () => {
        TweenMax.killTweensOf(cloudRef as {});
      };
    }
  }, [clientWidth]);

  return (
    <div className="cloud">
      <img
        ref={img => (cloudRef = img)}
        src={cloud}
        alt="cloud"
        className={className}
      />
    </div>
  );
}

export default Cloud;
