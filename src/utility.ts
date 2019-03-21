import { TweenLite, Elastic } from "gsap";

export const handleHoverEnter = (id: string) => {
  TweenLite.to(`#${id}`, 0.5, {
    color: "#4da6ff",
    ease: Elastic.easeOut.config(1, 0.6),
    opacity: 1,
    scale: 1.1
  });
};

export const handleHoverLeave = (id: string) => {
  TweenLite.to(`#${id}`, 0.5, {
    color: "#80bfff",
    scale: 1.0,
    clearProps: "all"
  });
};
