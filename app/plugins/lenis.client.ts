import type Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default defineNuxtPlugin((nuxtApp) => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let lenis: Lenis | null = null
  let lenisLoad: Promise<typeof import('lenis')> | null = null
  let disposed = false

  const stopLenis = () => {
    lenis?.destroy()
    lenis = null
  }

  const startLenis = async () => {
    if (lenis || reducedMotion.matches || disposed) {
      return
    }

    const { default: LenisConstructor } = await (lenisLoad ??= import('lenis'))

    if (lenis || reducedMotion.matches || disposed) {
      return
    }

    lenis = new LenisConstructor({
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

    void startLenis()
  }

  void startLenis()

  reducedMotion.addEventListener('change', syncMotionPreference)

  nuxtApp.hook('page:finish', () => {
    window.requestAnimationFrame(() => {
      lenis?.resize()
    })
  })

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      disposed = true
      reducedMotion.removeEventListener('change', syncMotionPreference)
      stopLenis()
    })
  }
})
