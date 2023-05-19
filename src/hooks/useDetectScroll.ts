// @ts-expect-error TS(2307): Cannot find module 'react' or its corresponding ty... Remove this comment to see the full error message
import { useState, useEffect } from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from "prop-types";

function useDetectScroll(props: any) {
  const {
    thr = 0,
    axis = "y",
    scrollUp = axis === "y" ? "up" : "left",
    scrollDown = axis === "y" ? "down" : "right",
    still = "still",
  } = props;
  const [scrollDir, setScrollDir] = useState(still);

  useEffect(() => {
    const threshold = thr > 0 ? thr : 0;
    let ticking = false;
    let lastScroll: any = undefined;

    axis === "y"
      ? (lastScroll = window.pageYOffset)
      : (lastScroll = window.pageXOffset);

    const updateScrollDir = () => {
      let scroll = undefined;

      axis === "y"
        ? (scroll = window.pageYOffset)
        : (scroll = window.pageXOffset);

      if (Math.abs(scroll - lastScroll) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scroll > lastScroll ? scrollDown : scrollUp);
      lastScroll = scroll > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return [scrollDir];
}

export default useDetectScroll;

useDetectScroll.propTypes = {
  thr: PropTypes.number,
  axis: PropTypes.string,
  scrollUp: PropTypes.string,
  scrollDown: PropTypes.string,
  still: PropTypes.string,
};
