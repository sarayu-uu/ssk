import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  as?: 'div' | 'header' | 'dl' | 'ul'
  className?: string
  /** Animate each direct child in turn instead of the block as a whole. */
  stagger?: boolean
  /** Extra delay in ms before the block animates. */
  delay?: number
  id?: string
  children: ReactNode
}

/** Fades content up once it scrolls into view. Styles live in index.css (.reveal / .reveal-stagger). */
export default function Reveal({ as = 'div', className = '', stagger, delay, id, children }: RevealProps) {
  const Tag = as as ElementType
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('is-visible')
        observer.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined

  return (
    <Tag ref={ref} id={id} style={style} className={`${stagger ? 'reveal-stagger' : 'reveal'} ${className}`.trim()}>
      {children}
    </Tag>
  )
}
