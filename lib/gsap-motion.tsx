'use client'

import React, { forwardRef, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type MotionLikeProps = {
  initial?: any
  animate?: any
  whileInView?: any
  whileHover?: any
  variants?: Record<string, any>
  transition?: Record<string, any>
  viewport?: {
    once?: boolean
  }
  children?: React.ReactNode
  [key: string]: any
}

const DEFAULT_DURATION = 0.65
const DEFAULT_EASE = 'power2.out'

function getVariantState(state: any, variants?: Record<string, any>) {
  if (!state) {
    return undefined
  }

  if (typeof state === 'string') {
    return variants?.[state]
  }

  if (typeof state === 'object') {
    return state
  }

  return undefined
}

function normalizeTransition(transition?: Record<string, any>) {
  const normalized: Record<string, any> = {
    duration: DEFAULT_DURATION,
    ease: DEFAULT_EASE,
  }

  if (!transition) {
    return normalized
  }

  if (typeof transition.duration === 'number') {
    normalized.duration = transition.duration
  }

  if (typeof transition.delay === 'number') {
    normalized.delay = transition.delay
  }

  if (typeof transition.ease === 'string') {
    normalized.ease = transition.ease
  }

  if (typeof transition.repeat === 'number') {
    normalized.repeat = Number.isFinite(transition.repeat) ? transition.repeat : -1
  }

  if (transition.repeat === Infinity) {
    normalized.repeat = -1
  }

  if (typeof transition.repeatDelay === 'number') {
    normalized.repeatDelay = transition.repeatDelay
  }

  if (typeof transition.staggerChildren === 'number') {
    normalized.staggerChildren = transition.staggerChildren
  }

  if (typeof transition.delayChildren === 'number') {
    normalized.delayChildren = transition.delayChildren
  }

  return normalized
}

function toTweenVars(target?: Record<string, any>, transition?: Record<string, any>) {
  if (!target) {
    return undefined
  }

  const { transition: targetTransition, ...vars } = target

  const mergedTransition = {
    ...(transition ?? {}),
    ...(typeof targetTransition === 'object' && targetTransition ? targetTransition : {}),
  }

  const tweenVars: Record<string, any> = { ...vars }

  const arrayEntries = Object.entries(tweenVars).filter(([, value]) => Array.isArray(value))

  if (arrayEntries.length > 0) {
    const maxFrames = Math.max(...arrayEntries.map(([, value]) => (value as any[]).length))

    const keyframes: Record<string, any>[] = []

    for (let frameIndex = 0; frameIndex < maxFrames; frameIndex += 1) {
      const frame: Record<string, any> = {}

      arrayEntries.forEach(([key, value]) => {
        const values = value as any[]
        frame[key] = values[Math.min(frameIndex, values.length - 1)]
      })

      keyframes.push(frame)
    }

    arrayEntries.forEach(([key]) => {
      delete tweenVars[key]
    })

    tweenVars.keyframes = keyframes
  }

  return {
    ...tweenVars,
    ...normalizeTransition(mergedTransition),
  }
}

function shouldReduceMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function createMotionComponent(tag: string) {
  return forwardRef<HTMLElement, MotionLikeProps>(function MotionComponent(
    props,
    forwardedRef,
  ) {
    const {
      children,
      initial,
      animate,
      whileInView,
      whileHover,
      variants,
      transition,
      viewport,
      ...domProps
    } = props

    const elementRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
      const element = elementRef.current

      if (!element) {
        return
      }

      element.dataset.gsapMotion = 'true'

      if (shouldReduceMotion()) {
        gsap.set(element, { clearProps: 'opacity,transform,filter' })
        return
      }

      const initialState = getVariantState(initial, variants) ?? variants?.hidden
      const animateState = getVariantState(animate, variants) ?? variants?.visible
      const inViewState = getVariantState(whileInView, variants)
      const hoverState = getVariantState(whileHover, variants)

      const context = gsap.context(() => {
        const initialTweenVars = toTweenVars(initialState, {})

        if (initialTweenVars) {
          gsap.set(element, initialTweenVars)
        }

        const runEntryAnimation = (target?: Record<string, any>) => {
          const tweenVars = toTweenVars(target, transition)

          if (!tweenVars) {
            return
          }

          const staggerChildren = tweenVars.staggerChildren
          const delayChildren = tweenVars.delayChildren

          if (typeof staggerChildren === 'number' && element.children.length > 0) {
            delete tweenVars.staggerChildren
            delete tweenVars.delayChildren

            const childrenArray = Array.from(element.children)

            gsap.fromTo(
              childrenArray,
              {
                autoAlpha: 0,
                y: 16,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration:
                  typeof tweenVars.duration === 'number'
                    ? tweenVars.duration
                    : DEFAULT_DURATION,
                ease:
                  typeof tweenVars.ease === 'string' ? tweenVars.ease : DEFAULT_EASE,
                delay:
                  typeof delayChildren === 'number'
                    ? delayChildren
                    : typeof tweenVars.delay === 'number'
                      ? tweenVars.delay
                      : 0,
                stagger: staggerChildren,
              },
            )
          }

          gsap.to(element, tweenVars)
        }

        if (inViewState) {
          ScrollTrigger.create({
            trigger: element,
            start: 'top 85%',
            once: viewport?.once ?? true,
            onEnter: () => runEntryAnimation(inViewState),
          })
        } else {
          runEntryAnimation(animateState)
        }

        const hoverTweenVars = toTweenVars(hoverState, {
          duration: 0.25,
          ease: DEFAULT_EASE,
        })

        if (hoverTweenVars) {
          const fallbackTweenVars = toTweenVars(animateState ?? inViewState, {
            duration: 0.25,
            ease: DEFAULT_EASE,
          })

          const onPointerEnter = () => {
            gsap.to(element, hoverTweenVars)
          }

          const onPointerLeave = () => {
            if (fallbackTweenVars) {
              gsap.to(element, fallbackTweenVars)
              return
            }

            gsap.to(element, {
              clearProps: 'transform',
              duration: 0.25,
              ease: DEFAULT_EASE,
            })
          }

          element.addEventListener('pointerenter', onPointerEnter)
          element.addEventListener('pointerleave', onPointerLeave)

          return () => {
            element.removeEventListener('pointerenter', onPointerEnter)
            element.removeEventListener('pointerleave', onPointerLeave)
          }
        }

        return undefined
      }, element)

      return () => {
        context.revert()
      }
    }, [initial, animate, whileInView, whileHover, variants, transition, viewport?.once])

    return React.createElement(tag, {
      ...domProps,
      ref: (node: HTMLElement | null) => {
        elementRef.current = node

        if (typeof forwardedRef === 'function') {
          forwardedRef(node)
          return
        }

        if (forwardedRef && 'current' in forwardedRef) {
          ;(forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node
        }
      },
      children,
    })
  })
}

export const motion = {
  div: createMotionComponent('div'),
  p: createMotionComponent('p'),
  nav: createMotionComponent('nav'),
  a: createMotionComponent('a'),
  span: createMotionComponent('span'),
  header: createMotionComponent('header'),
  aside: createMotionComponent('aside'),
  tr: createMotionComponent('tr'),
}
