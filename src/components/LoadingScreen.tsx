import { useEffect, useState } from 'react'
import { Mic } from 'lucide-react'

interface Note {
  id: number
  angle: number
  distance: number
  delay: number
  duration: number
}

function LoadingScreen({ onLoadComplete }: { onLoadComplete: () => void }) {
  const [notes, setNotes] = useState<Note[]>([])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Создаем ноты, вылетающие из микрофона в разные стороны
    const newNotes: Note[] = []
    const noteCount = 16
    for (let i = 0; i < noteCount; i++) {
      const angle = (360 / noteCount) * i // равномерное распределение по кругу
      newNotes.push({
        id: i,
        angle: angle,
        distance: 150 + Math.random() * 100, // расстояние полета
        delay: i * 0.08, // задержка для каждой ноты
        duration: 1.8 + Math.random() * 0.4, // случайная длительность
      })
    }
    setNotes(newNotes)

    // Скрываем экран загрузки через 2.5 секунды
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onLoadComplete()
      }, 500) // время на fade out
    }, 2500)

    return () => clearTimeout(timer)
  }, [onLoadComplete])

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        backgroundColor: '#72212A',
      }}
    >
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Микрофон в центре */}
        <Mic 
          className="w-16 h-16 animate-pulse z-10" 
          style={{ color: '#F5E7B6' }}
        />

        {/* Ноты, вылетающие из микрофона */}
        {notes.map((note) => {
          const radians = (note.angle * Math.PI) / 180
          const x = Math.cos(radians) * note.distance
          const y = Math.sin(radians) * note.distance

          return (
            <div
              key={note.id}
              className="absolute text-3xl pointer-events-none note-fly"
              style={{
                left: '50%',
                top: '50%',
                color: '#F5E7B6',
                '--end-x': `${x}px`,
                '--end-y': `${y}px`,
                animation: `noteFly ${note.duration}s ease-out ${note.delay}s forwards`,
              } as React.CSSProperties & { '--end-x': string; '--end-y': string }}
            >
              ♪
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes noteFly {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.4) rotate(0deg);
          }
          10% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(1.3) rotate(360deg);
          }
        }
        
        .note-fly {
          font-family: Arial, sans-serif;
          text-shadow: 0 0 10px rgba(245, 231, 182, 0.8);
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen

