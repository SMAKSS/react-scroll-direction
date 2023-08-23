import { useState, useEffect, useCallback } from "react";

/** Enumeration for axis values */
export enum Axis {
  X = "x",
  Y = "y",
}

/** Enumeration for direction values */
export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
  Still = "still",
}

/** Type declaration for scroll properties */
type ScrollProps = {
  thr?: number;
  axis?: Axis;
  scrollUp?: Direction;
  scrollDown?: Direction;
  still?: Direction;
};

/**
 * useDetectScroll hook.
 *
 * This hook provides a mechanism to detect the scroll direction.
 * It will return the scroll direction as a string (up, down, left, right, or still) based on user scrolling.
 *
 * @example
 *
 * import useDetectScroll, { Axis, Direction } from '@smakss/react-scroll-direction';
 *
 * function App() {
 *   const scrollDirection = useDetectScroll({
 *     thr: 100,
 *     axis: Axis.Y,
 *     scrollUp: Direction.Up,
 *     scrollDown: Direction.Down,
 *     still: Direction.Still
 *   });
 *
 *   return (
 *     <div>
 *       <p>Current scroll direction: {scrollDirection}</p>
 *     </div>
 *   );
 * }
 *
 * @param {ScrollProps} props - The properties related to scrolling.
 * @property {number} props.thr - The threshold value which the scroll difference must exceed to update scroll direction.
 * @property {Axis} props.axis - The axis along which to detect scroll. Can be 'x' or 'y'.
 * @property {Direction} props.scrollUp - The direction to set when scrolling up or left. By default, 'up' for y-axis and 'left' for x-axis.
 * @property {Direction} props.scrollDown - The direction to set when scrolling down or right. By default, 'down' for y-axis and 'right' for x-axis.
 * @property {Direction} props.still - The direction to set when there is no scrolling. By default, 'still'.
 *
 * @returns {Direction} - The current direction of scrolling.
 */
function useDetectScroll(props: ScrollProps): Direction {
  const {
    thr = 0,
    axis = Axis.Y,
    scrollUp = axis === Axis.Y ? Direction.Up : Direction.Left,
    scrollDown = axis === Axis.Y ? Direction.Down : Direction.Right,
    still = Direction.Still,
  } = props;

  const [scrollDir, setScrollDir] = useState<Direction>(still);

  const threshold = Math.max(0, thr);
  let ticking = false;
  let lastScroll = 0;

  /** Function to update scroll direction */
  const updateScrollDir = useCallback(() => {
    const scroll = axis === Axis.Y ? window.scrollY : window.scrollX;

    if (Math.abs(scroll - lastScroll) >= threshold) {
      setScrollDir(scroll > lastScroll ? scrollDown : scrollUp);
      lastScroll = Math.max(0, scroll);
    }
    ticking = false;
  }, [axis, threshold, scrollDown, scrollUp]);

  useEffect(() => {
    lastScroll = axis === Axis.Y ? window.scrollY : window.scrollX;

    /** Function to handle onScroll event */
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [updateScrollDir]);

  return scrollDir;
}

export default useDetectScroll;
