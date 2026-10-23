import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  /** Display value such as "10,000+" or "2009"; the number part is animated, the rest kept as-is. */
  value: string
  duration?: number
}

/** Rolls a number up from 0 once it scrolls into view. Respects reduced-motion. */
export default function CountUp({ value, duration = 1600 }: CountUpProps) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/)
  const target = match ? Number(match[2].replace(/,/g, '')) : 0
  const useCommas = match ? match[2].includes(',') : false
  const ref = useRef<HTMLSpanElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!match || !el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setCurrent(Math.round(target * eased))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <>{value}</>

  const shown = useCommas ? current.toLocaleString('en-US') : String(current)
  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {match[1]}
        {shown}
        {match[3]}
      </span>
    </>
  )
}
