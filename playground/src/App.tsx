import useDetectScroll, {Axis} from '@smakss/react-scroll-direction'
import {useEffect, useMemo, useRef, useState} from 'react'
import styles from './styles.module.css'

export default function App() {
    const [axis, setAxis] = useState<Axis>(Axis.Y)
    const [directionOverride, setDirectionOverride] = useState<string | null>(
        null,
    )
    const [resetPending, setResetPending] = useState(false)
    const lastScroll = useRef({x: 0, y: 0})
    const axisLock = useRef(0)
    const {scrollDir, scrollPosition} = useDetectScroll({axis})

    const resetScroll = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        setDirectionOverride('still')
        setResetPending(true)
    }

    useEffect(() => {
        const handleScroll = () => {
            const x = window.scrollX
            const y = window.scrollY
            const deltaX = Math.abs(x - lastScroll.current.x)
            const deltaY = Math.abs(y - lastScroll.current.y)
            lastScroll.current = {x, y}

            const now = Date.now()
            const lockMs = 250
            const threshold = 2

            if (now < axisLock.current + lockMs) {
                return
            }

            if (deltaX > deltaY + threshold && axis !== Axis.X) {
                setAxis(Axis.X)
                axisLock.current = now
            } else if (deltaY > deltaX + threshold && axis !== Axis.Y) {
                setAxis(Axis.Y)
                axisLock.current = now
            }
        }

        window.addEventListener('scroll', handleScroll, {passive: true})
        return () => window.removeEventListener('scroll', handleScroll)
    }, [axis])

    useEffect(() => {
        if (!resetPending) {
            return
        }

        const clearOverride = () => {
            setDirectionOverride(null)
            setResetPending(false)
        }

        const onKeyDown = (event: KeyboardEvent) => {
            const scrollKeys = [
                'ArrowUp',
                'ArrowDown',
                'ArrowLeft',
                'ArrowRight',
                'PageUp',
                'PageDown',
                'Home',
                'End',
                ' ',
            ]
            if (scrollKeys.includes(event.key)) {
                clearOverride()
            }
        }

        window.addEventListener('wheel', clearOverride, {passive: true})
        window.addEventListener('touchmove', clearOverride, {passive: true})
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('wheel', clearOverride)
            window.removeEventListener('touchmove', clearOverride)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [resetPending])

    const entries = useMemo(
        () => [
            {
                label: 'Top',
                value: `${Math.max(0, Math.round(scrollPosition.top))}px`,
            },
            {
                label: 'Bottom',
                value: `${Math.max(0, Math.round(scrollPosition.bottom))}px`,
            },
            {
                label: 'Left',
                value: `${Math.max(0, Math.round(scrollPosition.left))}px`,
            },
            {
                label: 'Right',
                value: `${Math.max(0, Math.round(scrollPosition.right))}px`,
            },
        ],
        [scrollPosition],
    )

    return (
        <div className={styles.wrapper}>
            <div className={styles.scrollStage}>
                <div className={styles.stageInner}>
                    <div className={styles.stageAccent} />
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.badge}>Playground</div>
                <h1 className={styles.title}>Scroll Direction & Position</h1>
                <p className={styles.subtitle}>
                    Scroll in any direction and the axis will auto-switch based
                    on the dominant movement. The card stays fixed while the
                    background stage scrolls.
                </p>
                <div className={styles.actions}>
                    <div className={styles.directionChip}>
                        <div className={styles.statLabel}>Direction</div>
                        <div className={styles.statValue}>
                            {directionOverride ?? scrollDir}
                        </div>
                    </div>
                    <button
                        type="button"
                        className={styles.resetButton}
                        onClick={resetScroll}
                    >
                        Reset Scroll
                    </button>
                </div>
                <div className={styles.grid}>
                    {entries.map(entry => (
                        <div key={entry.label} className={styles.stat}>
                            <div className={styles.statLabel}>
                                {entry.label}
                            </div>
                            <div className={styles.statValue}>
                                {entry.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
