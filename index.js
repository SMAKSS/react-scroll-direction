import { useState, useEffect } from "react";

function useDetectScroll({
  thr = 0,
  up = "scrolling up",
  down = "scrolling down",
}) {
  const [scrollDir, setScrollDir] = useState(down);

  useEffect(() => {
    const threshold = thr;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? down : up);
      lastScrollY = scrollY > 0 ? scrollY : 0;
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
