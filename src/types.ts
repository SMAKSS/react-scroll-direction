// Enumeration for axis values
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

// Enumeration for direction values
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

// Type declaration for scroll position
export type ScrollPosition = {
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

// Type declaration for the returned scroll information
export type ScrollInfo = {
  /**
   * The scrollDir represents the current scroll direction.
   */
  scrollDir: Direction;
  /**
   * The scrollPosition represents the current scroll position.
   */
  scrollPosition: ScrollPosition;
};

// Type declaration for scroll properties
export type ScrollProps = {
  /**
   * The target represents the scrollable element to check for scroll detection.
   */
  target?: HTMLDivElement | Window;
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
