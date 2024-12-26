export const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };
  
  export const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };
  