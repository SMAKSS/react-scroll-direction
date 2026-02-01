/**
 * Axis values (const + type)
 */
export const Axis = {
    /**
     * Horizontal axis.
     */
    X: 'x',
    /**
     * Vertical axis.
     */
    Y: 'y',
} as const

/**
 * Union of allowed axis values.
 */
export type Axis = (typeof Axis)[keyof typeof Axis]

/**
 * Direction values (const + type)
 */
export const Direction = {
    /**
     * Scroll direction toward the top.
     */
    Up: 'up',
    /**
     * Scroll direction toward the bottom.
     */
    Down: 'down',
    /**
     * Scroll direction toward the left.
     */
    Left: 'left',
    /**
     * Scroll direction toward the right.
     */
    Right: 'right',
    /**
     * No scrolling detected.
     */
    Still: 'still',
} as const

/**
 * Union of allowed direction values.
 */
export type Direction = (typeof Direction)[keyof typeof Direction]

/**
 * Scroll position values
 */
export type ScrollPosition = {
    /**
     * Distance from the top edge.
     */
    top: number
    /**
     * Distance from the bottom edge.
     */
    bottom: number
    /**
     * Distance from the left edge.
     */
    left: number
    /**
     * Distance from the right edge.
     */
    right: number
}

/**
 * Scroll info returned by the hook
 */
export type ScrollInfo = {
    /**
     * Current scroll direction.
     */
    scrollDir: Direction
    /**
     * Current scroll position.
     */
    scrollPosition: ScrollPosition
}

/**
 * Options accepted by the hook
 */
export type ScrollProps = {
    /**
     * Scroll target element (defaults to window).
     */
    target?: HTMLDivElement | Window
    /**
     * Threshold for scroll direction changes.
     */
    thr?: number
    /**
     * Axis to observe.
     */
    axis?: Axis
    /**
     * Value returned when scrolling up (y) or left (x).
     */
    scrollUp?: Direction
    /**
     * Value returned when scrolling down (y) or right (x).
     */
    scrollDown?: Direction
    /**
     * Value returned when no scrolling is detected.
     */
    still?: Direction
}
