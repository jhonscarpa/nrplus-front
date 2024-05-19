import React, { useEffect, useRef } from 'react'

interface IPropsInfinityScroll {
  fetchMore: () => void
}

export function InfinityScroll({ fetchMore }: IPropsInfinityScroll) {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect()
        fetchMore()
      }
    }, options)
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return <div ref={containerRef} />
}
