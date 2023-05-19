import { useState, useEffect, useCallback } from "react";

enum Axis {
  X = "x",
  Y = "y",
}

enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
  Still = "still",
}

type ScrollProps = {
  thr?: number;
  axis?: Axis;
  scrollUp?: string;
  scrollDown?: string;
  still?: string;
};

function useDetectScroll(props: ScrollProps) {
  const {
    thr = 0,
    axis = Axis.Y,
    scrollUp = axis === Axis.Y ? Direction.Up : Direction.Left,
    scrollDown = axis === Axis.Y ? Direction.Down : Direction.Right,
    still = Direction.Still,
  } = props;

  const [scrollDir, setScrollDir] = useState(still);

  const threshold = Math.max(0, thr);
  let ticking = false;
  let lastScroll: number = axis === Axis.Y ? window.scrollY : window.scrollX;

  const updateScrollDir = useCallback(() => {
    const scroll = axis === Axis.Y ? window.scrollY : window.scrollX;

    if (Math.abs(scroll - lastScroll) >= threshold) {
      setScrollDir(scroll > lastScroll ? scrollDown : scrollUp);
      lastScroll = Math.max(0, scroll);
    }
    ticking = false;
  }, [axis, threshold, scrollDown, scrollUp]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [updateScrollDir]);

  return [scrollDir];
}

export default useDetectScroll;
