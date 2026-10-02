import { useEffect, type RefObject } from 'react'

/**
 * Seitenlokale Tiefen-Choreografie für den Hero (keine Engine).
 * Schreibt --sy (Scroll in px, begrenzt auf Hero-Höhe) sowie --mx/--my (Zeigerposition, -0.5..0.5, gedämpft).
 * Ebenen skalieren diese Werte mit unterschiedlichen Raten. Nur transform, kein transition auf den Ebenen.
 * Bei reduzierter Bewegung wird nichts geschrieben; der Hero bleibt als vollständige statische Komposition.
 */
export function useHeroDepth(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let raf = 0
    let visible = true
    let tx = 0, ty = 0, cx = 0, cy = 0

    const frame = () => {
      raf = 0
      const h = el.offsetHeight
      el.style.setProperty('--sy', String(Math.min(Math.max(window.scrollY, 0), h)))
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.setProperty('--mx', cx.toFixed(4))
      el.style.setProperty('--my', cy.toFixed(4))
      if (visible && (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001)) raf = requestAnimationFrame(frame)
    }
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(frame) }
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5
      ty = e.clientY / window.innerHeight - 0.5
      kick()
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick() })
    io.observe(el)
    window.addEventListener('scroll', kick, { passive: true })
    if (fine) window.addEventListener('pointermove', onMove, { passive: true })
    kick()
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', kick)
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}
