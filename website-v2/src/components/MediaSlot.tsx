import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import { slots, type MediaSlotDef } from '../media/slots'

interface Props {
  slot: string
  ratio?: string
  className?: string
  /** Wird gezeigt, solange keine Quelle hinterlegt ist (oder bei Reduced Motion / Mobile). */
  children?: ReactNode
  /** Auf kleinen Bildschirmen nur Poster statt Video laden (Datenschutz für Mobilfunk). */
  posterOnlyOnMobile?: boolean
  /** Optional: Slot-Definition direkt übergeben statt über die Registry. */
  def?: MediaSlotDef
}

export default function MediaSlot({ slot, ratio = '16/9', className = '', children, posterOnlyOnMobile = true, def: defProp }: Props) {
  const def = defProp ?? slots[slot]
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')
  const [allowVideo] = useState(() => {
    if (typeof window === 'undefined') return false
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 640px)').matches
    return !reduce && !(posterOnlyOnMobile && small)
  })

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true)
        io.disconnect()
      }
    }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const hasVideo = !!def?.sources.length
  return (
    <div ref={ref} className={`media ${className}`} style={{ '--ratio': ratio } as CSSProperties} data-slot={slot}>
      {children ?? <div className="media-fallback" aria-hidden="true" />}
      {def?.poster && <img src={def.poster} alt={def.alt} loading="lazy" decoding="async" />}
      {hasVideo && allowVideo && visible && (
        <video autoPlay muted loop playsInline preload="none" poster={def.poster} aria-label={def.alt}>
          {def.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
      {def?.cutout && <img className="cutout" src={def.cutout} alt="" loading="lazy" decoding="async" />}
    </div>
  )
}
