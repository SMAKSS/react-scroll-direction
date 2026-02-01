import {useCallback, useEffect, useRef, useState} from 'react'
import {Axis, Direction, ScrollInfo, ScrollPosition, ScrollProps} from './types'

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
 *   const customElementRef = useRef<HTMLDivElement>(null);
 *   const [customElement, setCustomElement] = useState<HTMLDivElement>();
 *
 *   const { scrollDir, scrollPosition } = useDetectScroll({
 *     target: customElement,
 *     thr: 100,
 *     axis: Axis.Y,
 *     scrollUp: Direction.Up,
 *     scrollDown: Direction.Down,
 *     still: Direction.Still
 *   });
 *
 *   useEffect(() => {
 *     if (customElementRef.current) {
 *       setCustomElement(customElementRef.current);
 *     }
 *   }, [customElementRef]);
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
        target = typeof window !== 'undefined' ? window : undefined,
        thr = 0,
        axis = Axis.Y,
        scrollUp = axis === Axis.Y ? Direction.Up : Direction.Left,
        scrollDown = axis === Axis.Y ? Direction.Down : Direction.Right,
        still = Direction.Still,
    } = props

    const [scrollDir, setScrollDir] = useState<Direction>(still)
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    })

    const threshold = Math.max(0, thr)
    const ticking = useRef(false)
    const lastScroll = useRef(0)

    /** Function to update scroll direction */
    const updateScrollDir = useCallback(() => {
        if (!target) return

        let scroll: number
        if (target instanceof Window) {
            scroll = axis === Axis.Y ? target.scrollY : target.scrollX
        } else {
            scroll = axis === Axis.Y ? target.scrollTop : target.scrollLeft
        }

        if (Math.abs(scroll - lastScroll.current) >= threshold) {
            setScrollDir(scroll > lastScroll.current ? scrollDown : scrollUp)
            lastScroll.current = Math.max(0, scroll)
        }
        ticking.current = false
    }, [target, axis, threshold, scrollDown, scrollUp])

    useEffect(() => {
        if (!target) {
            console.warn(
                'useDetectScroll: target is not set. Falling back to window.',
            )
            return
        }

        /** Function to update scroll position */
        const updateScrollPosition = () => {
            if (!target) return

            const top =
                target instanceof Window ? target.scrollY : target.scrollTop
            const left =
                target instanceof Window ? target.scrollX : target.scrollLeft

            const bottom =
                (target instanceof Window
                    ? document.documentElement.scrollHeight - target.innerHeight
                    : target.scrollHeight - target.clientHeight) - top
            const right =
                (target instanceof Window
                    ? document.documentElement.scrollWidth - target.innerWidth
                    : target.scrollWidth - target.clientWidth) - left

            setScrollPosition({top, bottom, left, right})
        }

        updateScrollPosition()

        const targetElement = target as EventTarget
        targetElement.addEventListener('scroll', updateScrollPosition)

        return () => {
            targetElement.removeEventListener('scroll', updateScrollPosition)
        }
    }, [target])

    useEffect(() => {
        if (!target) {
            console.warn(
                'useDetectScroll: target is not set. Falling back to window.',
            )
            return
        }

        if (target instanceof Window) {
            lastScroll.current =
                axis === Axis.Y ? target.scrollY : target.scrollX
        } else {
            lastScroll.current =
                axis === Axis.Y ? target.scrollTop : target.scrollLeft
        }

        const onScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(updateScrollDir)
                ticking.current = true
            }
        }

        const targetElement = target as EventTarget
        targetElement.addEventListener('scroll', onScroll)

        return () => targetElement.removeEventListener('scroll', onScroll)
    }, [target, axis, updateScrollDir])

    return {scrollDir, scrollPosition}
}

export default useDetectScroll
