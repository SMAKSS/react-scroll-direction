import { React, useState, useEffect, useCallback, useRef } from 'react';

/** Enumeration for axis values */
export enum Axis {
  /**
   * The x-axis represents the horizontal direction.
   */
  X = 'x',
  /**
   * The y-axis represents the vertical direction.
   */
  Y = 'y'
}

/** Enumeration for direction values */
export enum Direction {
  /**
   * The up direction represents the scroll direction moving towards the top.
   */
  Up = 'up',
  /**
   * The down direction represents the scroll direction moving towards the bottom.
   */
  Down = 'down',
  /**
   * The left direction represents the scroll direction moving towards the left.
   */
  Left = 'left',
  /**
   * The right direction represents the scroll direction moving towards the right.
   */
  Right = 'right',
  /**
   * The still direction represents the scroll direction when the user is not scrolling.
   */
  Still = 'still'
}

type ScrollPosition = {
  /**
   * The top position represents the distance from the top edge of the page.
   */
  top: number;
  /**
   * The bottom position represents the distance from the bottom edge of the page.
   */
  bottom: number;
  /**
   * The left position represents the distance from the left edge of the page.
   */
  left: number;
  /**
   * The right position represents the distance from the right edge of the page.
   */
  right: number;
};

/** Type declaration for the returned scroll information */
type ScrollInfo = {
  /**
   * The scrollDir represents the current scroll direction.
   */
  scrollDir: Direction;
  /**
   * The scrollPosition represents the current scroll position.
   */
  scrollPosition: ScrollPosition;
};

/** Type declaration for scroll properties */
type ScrollProps = {
  /**
   * The target represents the scrollable element to check for scroll detection.
   */
  target?: React.RefObject<HTMLDivElement>
  /**
   * The thr represents the threshold value for scroll detection.
   */
  thr?: number;
  /**
   * The axis represents the scroll axis (x or y).
   */
  axis?: Axis;
  /**
   * The scrollUp represents the scroll direction when moving up.
   */
  scrollUp?: Direction;
  /**
   * The scrollDown represents the scroll direction when moving down.
   */
  scrollDown?: Direction;
  /**
   * The still represents the scroll direction when the user is not scrolling.
   */
  still?: Direction;
};

/**
 * useDetectScroll hook.
 *
 * This hook provides a mechanism to detect the scroll direction and position.
 * It will return the scroll direction as a string (up, down, left, right, or still) based on user scrolling,
 * as well as the scroll position from the top, bottom, left, and right edges of the page.
 *
 * @example
 *
 * import useDetectScroll, { Axis, Direction } from '@smakss/react-scroll-direction';
 *
 * function App() {
 *   const { scrollDir, scrollPosition } = useDetectScroll({
 *     thr: 100,
 *     axis: Axis.Y,
 *     scrollUp: Direction.Up,
 *     scrollDown: Direction.Down,
 *     still: Direction.Still
 *   });
 *
 *   return (
 *     <div>
 *       <p>Current scroll direction: {scrollDir}</p>
 *       <p>Scroll position - Top: {scrollPosition.top}, Bottom: {scrollPosition.bottom},
 *          Left: {scrollPosition.left}, Right: {scrollPosition.right}</p>
 *     </div>
 *   );
 * }
 *
 * @param {ScrollProps} props - The properties related to scrolling.
 * @returns {ScrollInfo} - The current direction and position of scrolling.
 */
function useDetectScroll(props: ScrollProps = {}): ScrollInfo {
  const {
    target = window,
    thr = 0,
    axis = Axis.Y,
    scrollUp = axis === Axis.Y ? Direction.Up : Direction.Left,
    scrollDown = axis === Axis.Y ? Direction.Down : Direction.Right,
    still = Direction.Still
  } = props;

  const [scrollDir, setScrollDir] = useState<Direction>(still);
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });

  const threshold = Math.max(0, thr);
  const ticking = useRef(false);
  const lastScroll = useRef(0);

  /** Function to update scroll direction */
  const updateScrollDir = useCallback(() => {
    const scroll = axis === Axis.Y ? window.scrollY : window.scrollX;

    if (Math.abs(scroll - lastScroll.current) >= threshold) {
      setScrollDir(scroll > lastScroll.current ? scrollDown : scrollUp);
      lastScroll.current = Math.max(0, scroll);
    }
    ticking.current = false;
  }, [axis, threshold, scrollDown, scrollUp]);

  useEffect(() => {
    /** Function to update scroll position */
    const updateScrollPosition = () => {
      const top = target === window ? target.scrollY : target.scrollTop;
      const left = target === window ? target.scrollX : target.scrollLeft;
      const bottom = target === window ?
        document.documentElement.scrollHeight - window.innerHeight - top :
        document.documentElement.scrollHeight - target.scrollHeight - top;
      const right = target === window ?
        document.documentElement.scrollWidth - window.innerWidth - left :
        document.documentElement.scrollHeight - target.scrollWidth - left;

      setScrollPosition({ top, bottom, left, right });
    };

    /** Call the update function when the component mounts */
    updateScrollPosition();

    target === window ? window.addEventListener('scroll', updateScrollPosition) : target.addEventListener('scroll', updateScrollPosition);

    return () => {
      target === window ? window.removeEventListener('scroll', updateScrollPosition) : target.removeEventListener('scroll', updateScrollPosition);
    };
  }, []);

  useEffect(() => {
    lastScroll.current = axis === Axis.Y ? window.scrollY : window.scrollX;

    /** Function to handle onScroll event */
    const onScroll = () => {
      if (!ticking.current) {
        target === window ? window.requestAnimationFrame(updateScrollDir) : target.requestAnimationFrame(updateScrollDir);
        ticking.current = true;
      }
    };

    target === window ? window.addEventListener('scroll', onScroll) : target.addEventListener('scroll', onScroll);

    return () => target === window ? window.removeEventListener('scroll', onScroll) : target.removeEventListener('scroll', onScroll);
  }, [axis, updateScrollDir]);

  return { scrollDir, scrollPosition };
}

export default useDetectScroll;
