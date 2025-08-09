'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GsapFrameAnimationProps {
  images?: string[]
  className?: string
  totalFrames?: number
  startFrame?: number
}

export default function GsapFrameAnimation({
  images,
  className = '',
  totalFrames = 360,
  startFrame = 0
}: GsapFrameAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentFrame = useRef(startFrame)
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([])

  const cloudflareBase = 'https://pub-5e192f09106f42a9a4f7f0f405390511.r2.dev'
  const imageUrls = images ?? Array.from({ length: totalFrames }, (_, i) =>
    `${cloudflareBase}/sec-${i}.webp`
  )

  useEffect(() => {
    const preload = async () => {
      const imgs = await Promise.all(
        imageUrls.map((src) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image()
            img.src = src
            img.onload = () => resolve(img)
            img.onerror = () => resolve(img) // fallback silently
          })
        })
      )
      setLoadedImages(imgs)
    }

    preload()
  }, [imageUrls])

  const draw = (index: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = loadedImages[index]
    if (!canvas || !ctx || !img) return

    // Set canvas size to match container
    const container = containerRef.current
    if (container) {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Calculate aspect ratio to fit image within canvas
    const imgAspect = img.width / img.height
    const canvasAspect = canvas.width / canvas.height
    
    let drawWidth, drawHeight, offsetX, offsetY
    
    if (imgAspect > canvasAspect) {
      // Image is wider than canvas
      drawWidth = canvas.width
      drawHeight = canvas.width / imgAspect
      offsetX = 0
      offsetY = (canvas.height - drawHeight) / 2
    } else {
      // Image is taller than canvas
      drawHeight = canvas.height
      drawWidth = canvas.height * imgAspect
      offsetX = (canvas.width - drawWidth) / 2
      offsetY = 0
    }
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }

  useEffect(() => {
    if (!containerRef.current || loadedImages.length === 0) return

    draw(startFrame)

    const frameState = { frame: startFrame }

    const scrollTween = gsap.to(frameState, {
      frame: totalFrames - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        pin: false,
        anticipatePin: 0
      },
      onUpdate: () => {
        if (frameState.frame !== currentFrame.current) {
          currentFrame.current = frameState.frame
          draw(frameState.frame)
        }
      }
    })

    // Handle resize events
    const handleResize = () => {
      draw(currentFrame.current)
    }

    window.addEventListener('resize', handleResize)

    // Properly get and kill the ScrollTrigger instance
    const stInstance = scrollTween.scrollTrigger

    return () => {
      scrollTween.kill()
      if (stInstance) stInstance.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [loadedImages, totalFrames, startFrame])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
    >
      {loadedImages.length === 0 ? (
        <div className="text-white text-center">Loading frames…</div>
      ) : (
        <canvas ref={canvasRef} className="w-full h-full object-contain max-w-full max-h-full" />
      )}
    </div>
  )
}
