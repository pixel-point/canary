import React, { useEffect, useRef, useState } from 'react'

interface CardProps {
  title?: string
  logo: React.ReactElement<SVGSVGElement>
  logoClass?: string
  highlightTop?: string
  highlightBottom?: string
}

export function CreatePipelineTemplateCard({
  highlightTop = '',
  highlightBottom = '',
  title = '',
  logo,
  logoClass
}: CardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        let animationFrameId: number
        const circles = [
          { x: 24, y: 0, color: highlightTop, radius: 24, dx: 0.1, dy: 0.1, dr: 0.01 }, // top-left
          {
            x: canvas.width - 24,
            y: canvas.height - 24,
            color: highlightBottom,
            radius: 24,
            dx: -0.1,
            dy: -0.1,
            dr: -0.01
          } // bottom-right
        ]

        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          circles.forEach(circle => {
            ctx.beginPath()
            ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI)
            ctx.fillStyle = circle.color
            ctx.filter = 'blur(12px)'
            ctx.fill()
          })
        }

        const update = () => {
          circles.forEach(circle => {
            circle.x += circle.dx
            circle.y += circle.dy
            circle.radius += circle.dr

            if (circle.x - circle.radius <= 0 || circle.x + circle.radius >= canvas.width) {
              circle.dx *= -1
            }
            if (circle.y - circle.radius <= 0 || circle.y + circle.radius >= canvas.height) {
              circle.dy *= -1
            }
            if (circle.radius <= 23 || circle.radius >= 25) {
              circle.dr *= -1
            }
          })
        }

        const animate = () => {
          if (isHovered) {
            update()
            draw()
            animationFrameId = requestAnimationFrame(animate)
          }
        }

        // Initial draw
        draw()

        // Start animation on hover
        if (isHovered) {
          animate()
        }

        // Cleanup on unmount and hover state change
        return () => {
          cancelAnimationFrame(animationFrameId)
        }
      }
    }
  }, [isHovered])

  return (
    <div
      className="group w-full h-[220px] relative border-white/5 border rounded-lg overflow-hidden cursor-pointer ease-in-out duration-150"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <canvas
        ref={canvasRef}
        width="100%"
        height="100%"
        className="absolute inset-0 h-full w-full brightness-110 group-hover:brightness-150 rounded-lg"
      />
      <div className="absolute inset-[1px] bg-black/40 rounded-lg" />
      <div className="absolute inset-0 flex items-center justify-center">
        {logo && <div className={logoClass}>{logo}</div>}
      </div>
      {title && (
        <div className="absolute bottom-0 w-full px-4 py-3">
          <p className="text-base font-normal -tracking-[2%] text-primary">{title}</p>
        </div>
      )}
    </div>
  )
}
