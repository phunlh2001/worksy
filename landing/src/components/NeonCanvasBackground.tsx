import * as React from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  glowColor: string
}

interface AuraOrb {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export function NeonCanvasBackground(): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const mouseRef = React.useRef<{ x: number; y: number } | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = (): void => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent): void => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = (): void => {
      mouseRef.current = null
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Generate dual-tone floating neon particles
    const particleCount = Math.min(55, Math.floor((width * height) / 22000))
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const isCyan = i % 2 === 0
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1.2,
        color: isCyan ? 'rgba(0, 245, 255, 0.85)' : 'rgba(0, 255, 136, 0.85)',
        glowColor: isCyan ? 'rgba(0, 245, 255, 0.35)' : 'rgba(0, 255, 136, 0.35)'
      })
    }

    // Floating volumetric ambient glowing orbs
    const auras: AuraOrb[] = [
      {
        x: width * 0.25,
        y: height * 0.25,
        vx: 0.15,
        vy: 0.12,
        radius: Math.min(width, height) * 0.35,
        color: 'rgba(0, 245, 255, 0.045)'
      },
      {
        x: width * 0.75,
        y: height * 0.65,
        vx: -0.12,
        vy: 0.18,
        radius: Math.min(width, height) * 0.4,
        color: 'rgba(0, 255, 136, 0.04)'
      },
      {
        x: width * 0.5,
        y: height * 0.85,
        vx: 0.18,
        vy: -0.15,
        radius: Math.min(width, height) * 0.3,
        color: 'rgba(0, 245, 255, 0.035)'
      }
    ]

    const maxDistance = 115

    const render = (): void => {
      ctx.clearRect(0, 0, width, height)

      // 1. Render Breathing Ambient Volumetric Orbs
      auras.forEach((aura) => {
        aura.x += aura.vx
        aura.y += aura.vy

        if (aura.x < 0 || aura.x > width) aura.vx *= -1
        if (aura.y < 0 || aura.y > height) aura.vy *= -1

        const gradient = ctx.createRadialGradient(aura.x, aura.y, 0, aura.x, aura.y, aura.radius)
        gradient.addColorStop(0, aura.color)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(aura.x, aura.y, aura.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // 2. Connect Nearby Nodes with Glowing Filaments
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22
            ctx.strokeStyle =
              i % 2 === 0 ? `rgba(0, 245, 255, ${alpha})` : `rgba(0, 255, 136, ${alpha})`
            ctx.lineWidth = 0.9
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // 3. Update & Draw Particles with Mouse Reactivity
      particles.forEach((p) => {
        // Mouse gentle interaction
        if (mouseRef.current) {
          const mdx = p.x - mouseRef.current.x
          const mdy = p.y - mouseRef.current.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mdist < 120 && mdist > 0) {
            const force = (120 - mdist) / 120
            p.x += (mdx / mdist) * force * 1.2
            p.y += (mdy / mdist) * force * 1.2
          }
        }

        p.x += p.vx
        p.y += p.vy

        // Screen wrap
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Draw particle node
        ctx.fillStyle = p.color
        ctx.shadowColor = p.glowColor
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0 // reset shadow
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  )
}
