'use client'

// Componente que anima un número contando desde 0 hasta el valor objetivo
import { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export default function AnimatedCounter({ 
  value, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  decimals = 0 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Usar easing para una animación más suave
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(value * easeOutQuart)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span className="count-up">
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  )
}

