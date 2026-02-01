import {act, renderHook, waitFor} from '@testing-library/react'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import useDetectScroll from './useDetectScroll'
import {Axis, Direction} from './useDetectScroll.types'

const setNumericProp = (obj: HTMLElement, key: string, value: number) => {
    Object.defineProperty(obj, key, {configurable: true, value})
}

const createScrollableDiv = () => {
    const div = document.createElement('div')
    setNumericProp(div, 'scrollTop', 0)
    setNumericProp(div, 'scrollLeft', 0)
    setNumericProp(div, 'scrollHeight', 1000)
    setNumericProp(div, 'scrollWidth', 800)
    setNumericProp(div, 'clientHeight', 200)
    setNumericProp(div, 'clientWidth', 300)
    return div
}

describe('useDetectScroll', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
            cb(0)
            return 0
        })
    })

    it('reports initial scroll position for a target element', async () => {
        const target = createScrollableDiv()
        setNumericProp(target, 'scrollTop', 100)
        setNumericProp(target, 'scrollLeft', 40)

        const {result} = renderHook(() => useDetectScroll({target}))

        await waitFor(() => {
            expect(result.current.scrollPosition.top).toBe(100)
            expect(result.current.scrollPosition.left).toBe(40)
            expect(result.current.scrollPosition.bottom).toBe(700)
            expect(result.current.scrollPosition.right).toBe(460)
        })
    })

    it('detects vertical scroll direction', async () => {
        const target = createScrollableDiv()
        const {result} = renderHook(() =>
            useDetectScroll({target, axis: Axis.Y}),
        )

        act(() => {
            setNumericProp(target, 'scrollTop', 120)
            target.dispatchEvent(new Event('scroll'))
        })

        await waitFor(() => {
            expect(result.current.scrollDir).toBe(Direction.Down)
        })
    })

    it('detects horizontal scroll direction', async () => {
        const target = createScrollableDiv()
        const {result} = renderHook(() =>
            useDetectScroll({target, axis: Axis.X}),
        )

        act(() => {
            setNumericProp(target, 'scrollLeft', 90)
            target.dispatchEvent(new Event('scroll'))
        })

        await waitFor(() => {
            expect(result.current.scrollDir).toBe(Direction.Right)
        })
    })

    it('respects the threshold before changing direction', async () => {
        const target = createScrollableDiv()
        const {result} = renderHook(() =>
            useDetectScroll({target, axis: Axis.Y, thr: 50}),
        )

        act(() => {
            setNumericProp(target, 'scrollTop', 20)
            target.dispatchEvent(new Event('scroll'))
        })

        await waitFor(() => {
            expect(result.current.scrollDir).toBe(Direction.Still)
        })
    })

    it('uses custom direction values when provided', async () => {
        const target = createScrollableDiv()
        const {result} = renderHook(() =>
            useDetectScroll({
                target,
                axis: Axis.Y,
                scrollUp: Direction.Left,
                scrollDown: Direction.Right,
                still: Direction.Still,
            }),
        )

        act(() => {
            setNumericProp(target, 'scrollTop', 80)
            target.dispatchEvent(new Event('scroll'))
        })

        await waitFor(() => {
            expect(result.current.scrollDir).toBe(Direction.Right)
        })
    })

    it('clamps negative thresholds to zero', async () => {
        const target = createScrollableDiv()
        const {result} = renderHook(() =>
            useDetectScroll({target, axis: Axis.Y, thr: -10}),
        )

        act(() => {
            setNumericProp(target, 'scrollTop', 1)
            target.dispatchEvent(new Event('scroll'))
        })

        await waitFor(() => {
            expect(result.current.scrollDir).toBe(Direction.Down)
        })
    })

    it('computes scroll position for window target', async () => {
        const prevWindowCtor = globalThis.Window
        ;(globalThis as {Window?: typeof Window}).Window =
            window.constructor as typeof Window

        let winScrollY = 0
        let winScrollX = 0

        const prevScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY')
        const prevScrollX = Object.getOwnPropertyDescriptor(window, 'scrollX')

        Object.defineProperty(window, 'scrollY', {
            configurable: true,
            get: () => winScrollY,
        })
        Object.defineProperty(window, 'scrollX', {
            configurable: true,
            get: () => winScrollX,
        })
        Object.defineProperty(window, 'innerHeight', {
            configurable: true,
            value: 200,
        })
        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 300,
        })
        Object.defineProperty(document.documentElement, 'scrollHeight', {
            configurable: true,
            value: 1000,
        })
        Object.defineProperty(document.documentElement, 'scrollWidth', {
            configurable: true,
            value: 800,
        })

        const {result} = renderHook(() => useDetectScroll())

        act(() => {
            winScrollY = 120
            winScrollX = 30
            window.dispatchEvent(new Event('scroll'))
        })

        await waitFor(() => {
            expect(result.current.scrollPosition.top).toBe(120)
            expect(result.current.scrollPosition.left).toBe(30)
            expect(result.current.scrollPosition.bottom).toBe(680)
            expect(result.current.scrollPosition.right).toBe(470)
        })

        if (prevScrollY) {
            Object.defineProperty(window, 'scrollY', prevScrollY)
        } else {
            delete (window as {scrollY?: number}).scrollY
        }

        if (prevScrollX) {
            Object.defineProperty(window, 'scrollX', prevScrollX)
        } else {
            delete (window as {scrollX?: number}).scrollX
        }

        ;(globalThis as {Window?: typeof Window}).Window = prevWindowCtor
    })

    it('warns when target is missing', () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
        renderHook(() => useDetectScroll({target: null as unknown as Window}))
        expect(warnSpy).toHaveBeenCalled()
    })
})
