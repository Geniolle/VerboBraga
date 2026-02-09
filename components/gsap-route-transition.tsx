'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import type { ReactNode } from 'react'

function shouldReduceMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function GsapRouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (shouldReduceMotion()) {
      return
    }

    const main = document.querySelector('main')

    if (!main) {
      return
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        main,
        {
          autoAlpha: 0,
          y: 20,
          filter: 'blur(8px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'filter',
        },
      )

      const staticPages =
        pathname === '/jovens' || pathname === '/centro-de-cura' || pathname === '/centro-de-cura/formulario'

      if (staticPages) {
        const staticSections = Array.from(main.querySelectorAll('section'))

        staticSections.forEach((section, index) => {
          const revealTargets = Array.from(
            section.querySelectorAll('h1, h2, h3, p, a, button'),
          ).slice(0, 14)

          if (revealTargets.length === 0) {
            return
          }

          gsap.fromTo(
            revealTargets,
            {
              autoAlpha: 0,
              y: 20,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              delay: 0.12 + index * 0.08,
              stagger: 0.06,
              ease: 'power2.out',
            },
          )
        })
      }
    }, main)

    return () => {
      context.revert()
    }
  }, [pathname])

  return <>{children}</>
}
