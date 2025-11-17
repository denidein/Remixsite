import { useEffect, useState, useRef } from 'react'
import { Music, Mic, Headphones, Radio } from 'lucide-react'

interface FloatingElement {
  id: number
  type: 'note' | 'icon'
  content: string
  iconType?: string
  x: number
  y: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  size: number
  opacity: number
  floatOffset: number
  floatSpeed: number
}

function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    // Создаем парящие элементы
    const newElements: FloatingElement[] = []
    const noteSymbols = ['♪', '♫', '♬', '♩', '♭', '♯', '𝄞', '𝄢']
    const iconTypes = ['music', 'mic', 'headphones', 'radio']

    // Создаем ноты
    for (let i = 0; i < 20; i++) {
      newElements.push({
        id: i,
        type: 'note',
        content: noteSymbols[Math.floor(Math.random() * noteSymbols.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speedX: (Math.random() - 0.5) * 0.1, // замедлено в 2 раза
        speedY: (Math.random() - 0.5) * 0.075, // замедлено в 2 раза
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5, // замедлено в 2 раза
        size: 28 + Math.random() * 32,
        opacity: 0.3 + Math.random() * 0.25,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.25 + Math.random() * 0.25, // замедлено в 2 раза
      })
    }

    // Создаем иконки инструментов
    for (let i = 0; i < 12; i++) {
      newElements.push({
        id: 100 + i,
        type: 'icon',
        content: '',
        iconType: iconTypes[Math.floor(Math.random() * iconTypes.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speedX: (Math.random() - 0.5) * 0.09, // замедлено в 2 раза
        speedY: (Math.random() - 0.5) * 0.06, // замедлено в 2 раза
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.4, // замедлено в 2 раза
        size: 32 + Math.random() * 28,
        opacity: 0.25 + Math.random() * 0.2,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.2 + Math.random() * 0.3, // замедлено в 2 раза
      })
    }

    setElements(newElements)

    // Анимация движения с плавной интерполяцией
    let lastTimestamp = 0
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
        lastTimestamp = timestamp
      }
      
      // Плавное вычисление дельты времени
      const deltaTime = Math.min((timestamp - lastTimestamp) / 1000, 0.016) // ограничиваем максимальную дельту
      lastTimestamp = timestamp
      
      const elapsed = (timestamp - startTimeRef.current) / 1000
      
      setElements((prev) => {
        if (prev.length === 0) return prev
        
        return prev.map((el) => {
          // Плавное базовое движение с использованием дельты времени
          let newX = el.x + el.speedX * deltaTime * 60
          let newY = el.y + el.speedY * deltaTime * 60
          let newRotation = el.rotation + el.rotationSpeed * deltaTime * 60

          // Плавное плавающее движение вверх-вниз (синусоидальное)
          const floatY = Math.sin(elapsed * el.floatSpeed + el.floatOffset) * 3
          newY += floatY * deltaTime * 1.5 // более плавное добавление

          // Зацикливание при выходе за границы
          if (newX < -5) newX = 105
          if (newX > 105) newX = -5
          if (newY < -5) newY = 105
          if (newY > 105) newY = -5

          return {
            ...el,
            x: newX,
            y: newY,
            rotation: newRotation,
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const renderIcon = (iconType: string, size: number) => {
    const iconStyle = { 
      width: `${size}px`, 
      height: `${size}px`,
      display: 'block'
    }
    switch (iconType) {
      case 'music':
        return <Music style={iconStyle} />
      case 'mic':
        return <Mic style={iconStyle} />
      case 'headphones':
        return <Headphones style={iconStyle} />
      case 'radio':
        return <Radio style={iconStyle} />
      default:
        return <Music style={iconStyle} />
    }
  }

  if (elements.length === 0) {
    return null
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 5,
      }}
    >
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
            fontSize: element.type === 'note' ? `${element.size}px` : 'inherit',
            color: '#F5E7B6',
            opacity: element.opacity,
            transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
            willChange: 'transform',
            userSelect: 'none',
          }}
        >
          {element.type === 'note' ? (
            <span style={{ 
              fontFamily: 'Arial, sans-serif',
              display: 'inline-block',
              textShadow: '0 2px 10px rgba(245, 231, 182, 0.5)',
              lineHeight: 1,
            }}>
              {element.content}
            </span>
          ) : (
            <div style={{ 
              color: '#F5E7B6',
              width: `${element.size}px`,
              height: `${element.size}px`,
              filter: 'drop-shadow(0 2px 8px rgba(245, 231, 182, 0.4))',
            }}>
              {element.iconType && renderIcon(element.iconType, element.size)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FloatingElements
