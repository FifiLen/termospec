import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default defineNuxtPlugin((nuxtApp) => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let lenis: Lenis | null = null

  const stopLenis = () => {
    lenis?.destroy()
    lenis = null
  }

  const startLenis = () => {
    if (lenis || reducedMotion.matches) {
      return
    }

    lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.105,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
      anchors: {
        offset: -96,
        lerp: 0.12,
      },
      stopInertiaOnNavigate: true,
    })
  }

  const syncMotionPreference = () => {
    if (reducedMotion.matches) {
      stopLenis()
      return
    }

    startLenis()
  }

  startLenis()

  reducedMotion.addEventListener('change', syncMotionPreference)

  nuxtApp.hook('page:finish', () => {
    window.requestAnimationFrame(() => {
      lenis?.resize()
    })
  })

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      reducedMotion.removeEventListener('change', syncMotionPreference)
      stopLenis()
    })
  }
})
