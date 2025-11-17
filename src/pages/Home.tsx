import { useState, useEffect } from 'react'
import { Music, Mic, Users, Phone, Mail, MapPin, X } from 'lucide-react'
import LoadingScreen from '../components/LoadingScreen'
import FloatingElements from '../components/FloatingElements'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })

  // Закрытие модального окна по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  const services = [
    {
      id: 1,
      title: 'Пробное индивидуальное занятие',
      price: '1200 ₽',
      duration: '50 мин',
      icon: Mic,
      description: 'Первое знакомство с вокалом и нашим подходом к обучению'
    },
    {
      id: 2,
      title: 'Групповое детское занятие',
      price: '700 ₽',
      duration: '50 мин',
      icon: Users,
      description: 'Занятия в небольших группах для детей от 6 лет'
    },
    {
      id: 3,
      title: 'Индивидуальный урок для взрослых',
      price: '1700 ₽',
      duration: '50 мин',
      icon: Music,
      description: 'Персональные занятия для взрослых любого уровня'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Форма отправлена! (Бэкенд не запущен, поэтому данные не будут сохранены)')
    console.log('Form data:', formData)
  }

  // Цветовая палитра
  const backgroundColor = '#72212A' // темно-красный фон
  const containerColor = '#1E201F' // темно-серый для контейнеров
  const textColor = '#F5E7B6' // бежевый/кремовый текст

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      <FloatingElements />
      
      <div 
        className="min-h-screen relative"
        style={{
          backgroundColor: backgroundColor,
          backgroundImage: 'url(/images/back.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          position: 'relative',
        }}
      >
        {/* Затемнение фона для лучшей читаемости */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundColor: 'rgba(114, 33, 42, 0.7)',
            zIndex: 0,
          }}
        />
        {/* Header */}
        <header 
          className="fixed top-0 left-0 right-0 backdrop-blur-sm shadow-sm z-50"
          style={{
            backgroundColor: containerColor,
          }}
        >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/logo.jpg" 
                alt="Remix Logo" 
                className="h-16 w-auto object-contain"
              />
              <h1 
                className="text-2xl script-font"
                style={{ color: textColor, fontWeight: 600 }}
              >
                Remix
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a 
                href="#services" 
                className="transition"
                style={{ 
                  color: textColor,
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Услуги
              </a>
              <a 
                href="#about" 
                className="transition"
                style={{ 
                  color: textColor,
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                О нас
              </a>
              <a 
                href="#contact" 
                className="transition"
                style={{ 
                  color: textColor,
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Контакты
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center relative z-10 pt-32">
        <h2 
          className="text-5xl md:text-6xl mb-4 script-font"
          style={{
            color: textColor,
            fontWeight: 600,
          }}
        >
          Студия вокала в Твери
        </h2>
        <p 
          className="text-xl mb-6 max-w-2xl mx-auto elegant-text"
          style={{
            color: textColor,
            opacity: 0.95,
          }}
        >
          Раскройте свой голос и обретите уверенность на сцене вместе с нами
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#services"
            className="px-8 py-3 rounded-lg font-semibold transition"
            style={{
              backgroundColor: containerColor,
              color: textColor,
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Наши услуги
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg font-semibold transition"
            style={{
              border: `2px solid ${textColor}80`,
              color: textColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = containerColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            Записаться
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-12 relative z-10">
        <h2 
          className="text-4xl text-center mb-8 script-font"
          style={{
            color: textColor,
            fontWeight: 600,
          }}
        >
          О нас
        </h2>
        <div className="max-w-4xl mx-auto">
          <div 
            className="rounded-lg p-8 mb-8"
            style={{
              backgroundColor: containerColor,
            }}
          >
            <h3 
              className="text-2xl mb-4 script-font"
              style={{
                color: textColor,
                fontWeight: 600,
              }}
            >
              Студия эстрадного вокала «REMIX»
            </h3>
            
            <div className="mb-6">
              <h4 
                className="text-xl mb-3"
                style={{ color: textColor, fontWeight: 500 }}
              >
                Мы поможем, если Вы:
              </h4>
              <ul 
                className="space-y-2"
                style={{ color: textColor, opacity: 0.9 }}
              >
                <li className="flex items-start">
                  <span style={{ marginRight: '12px' }}>•</span>
                  <span>Хотите реализовать мечту о красивом пении;</span>
                </li>
                <li className="flex items-start">
                  <span style={{ marginRight: '12px' }}>•</span>
                  <span>Неуверенно чувствуете себя на сцене;</span>
                </li>
                <li className="flex items-start">
                  <span style={{ marginRight: '12px' }}>•</span>
                  <span>Не знаете, с чего начать;</span>
                </li>
                <li className="flex items-start">
                  <span style={{ marginRight: '12px' }}>•</span>
                  <span>Планируете поступление в музыкальное учреждение;</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 
                className="text-xl mb-3"
                style={{ color: textColor, fontWeight: 500 }}
              >
                Кому пригодятся наши занятия?
              </h4>
              <ul 
                className="space-y-2"
                style={{ color: textColor, opacity: 0.9 }}
              >
                <li className="flex items-start">
                  <span style={{ marginRight: '12px' }}>•</span>
                  <span>Всем, кто любит петь и хочет получать от этого удовольствие;</span>
                </li>
                <li className="flex items-start">
                  <span style={{ marginRight: '12px' }}>•</span>
                  <span>Тем, кто всегда мечтал петь, но не знал, с чего начать;</span>
                </li>
                <li className="flex items-start">
                  <span style={{ marginRight: '12px' }}>•</span>
                  <span>Музыкантам, которые хотят улучшить свой эстрадный вокал и научиться новым техникам вокала;</span>
                </li>
                <li className="flex items-start">
                  <span style={{ marginRight: '12px' }}>•</span>
                  <span>Тем, кто мечтает обрести свой репертуар и сценический имидж.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {/* Первая фотография вверху по центру */}
            <div className="flex justify-center">
              <div
                className="rounded-lg p-2 cursor-pointer transition-transform hover:scale-105"
                style={{
                  border: `2px solid ${textColor}60`,
                  boxShadow: `0 0 20px ${textColor}40, 0 0 40px ${textColor}30, inset 0 0 20px ${textColor}20`,
                  backgroundColor: `${textColor}10`,
                }}
                onClick={() => setSelectedImage('/images/photo1.png')}
              >
                <img 
                  src="/images/photo1.png" 
                  alt="Фото 1" 
                  className="rounded-lg object-cover w-full max-w-2xl"
                  style={{
                    maxHeight: '400px',
                    display: 'block',
                  }}
                />
              </div>
            </div>
            {/* Две фотографии под первой в ряд */}
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="rounded-lg p-2 cursor-pointer transition-transform hover:scale-105"
                style={{
                  border: `2px solid ${textColor}60`,
                  boxShadow: `0 0 20px ${textColor}40, 0 0 40px ${textColor}30, inset 0 0 20px ${textColor}20`,
                  backgroundColor: `${textColor}10`,
                }}
                onClick={() => setSelectedImage('/images/photo2.png')}
              >
                <img 
                  src="/images/photo2.png" 
                  alt="Фото 2" 
                  className="rounded-lg object-cover w-full"
                  style={{
                    height: '300px',
                    display: 'block',
                  }}
                />
              </div>
              <div
                className="rounded-lg p-2 cursor-pointer transition-transform hover:scale-105"
                style={{
                  border: `2px solid ${textColor}60`,
                  boxShadow: `0 0 20px ${textColor}40, 0 0 40px ${textColor}30, inset 0 0 20px ${textColor}20`,
                  backgroundColor: `${textColor}10`,
                }}
                onClick={() => setSelectedImage('/images/photo3.png')}
              >
                <img 
                  src="/images/photo3.png" 
                  alt="Фото 3" 
                  className="rounded-lg object-cover w-full"
                  style={{
                    height: '300px',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 py-12 relative z-10">
        <h2 
          className="text-4xl text-center mb-8 script-font"
          style={{
            color: textColor,
            fontWeight: 600,
          }}
        >
          Наши услуги
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className="rounded-lg shadow-lg p-6 hover:shadow-xl transition"
                style={{
                  backgroundColor: containerColor,
                }}
              >
                <div 
                  className="flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{
                    backgroundColor: 'rgba(245, 231, 182, 0.1)',
                  }}
                >
                  <Icon 
                    className="w-8 h-8" 
                    style={{ color: textColor }}
                  />
                </div>
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: textColor }}
                >
                  {service.title}
                </h3>
                <p 
                  className="mb-4"
                  style={{ color: textColor, opacity: 0.9 }}
                >
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: textColor }}
                  >
                    {service.price}
                  </span>
                  <span style={{ color: textColor, opacity: 0.8 }}>
                    {service.duration}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-12 relative z-10">
        <h2 
          className="text-4xl text-center mb-8 script-font"
          style={{
            color: textColor,
            fontWeight: 600,
          }}
        >
          Записаться на занятие
        </h2>
        <div 
          className="max-w-4xl mx-auto rounded-lg shadow-lg p-8"
          style={{
            backgroundColor: containerColor,
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Двухколоночный блок для основных полей */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label 
                  className="block font-semibold mb-2"
                  style={{ color: textColor }}
                >
                  Имя
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: backgroundColor,
                    border: `1px solid ${textColor}40`,
                    color: textColor,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = textColor
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${textColor}40`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = `${textColor}40`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  required
                />
              </div>
              <div>
                <label 
                  className="block font-semibold mb-2"
                  style={{ color: textColor }}
                >
                  Телефон
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: backgroundColor,
                    border: `1px solid ${textColor}40`,
                    color: textColor,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = textColor
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${textColor}40`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = `${textColor}40`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  required
                />
              </div>
              <div>
                <label 
                  className="block font-semibold mb-2"
                  style={{ color: textColor }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: backgroundColor,
                    border: `1px solid ${textColor}40`,
                    color: textColor,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = textColor
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${textColor}40`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = `${textColor}40`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  required
                />
              </div>
              <div>
                <label 
                  className="block font-semibold mb-2"
                  style={{ color: textColor }}
                >
                  Услуга
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: backgroundColor,
                    border: `1px solid ${textColor}40`,
                    color: textColor,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = textColor
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${textColor}40`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = `${textColor}40`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  required
                >
                  <option value="" style={{ backgroundColor: backgroundColor, color: textColor }}>
                    Выберите услугу
                  </option>
                  {services.map((service) => (
                    <option 
                      key={service.id} 
                      value={service.title}
                      style={{ backgroundColor: backgroundColor, color: textColor }}
                    >
                      {service.title} - {service.price}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label 
                className="block font-semibold mb-2"
                style={{ color: textColor }}
              >
                Сообщение
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: backgroundColor,
                  border: `1px solid ${textColor}40`,
                  color: textColor,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = textColor
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${textColor}40`
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = `${textColor}40`
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg font-semibold transition"
              style={{
                backgroundColor: containerColor,
                color: textColor,
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Отправить заявку
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-12 relative z-10"
        style={{
          backgroundColor: containerColor,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Music 
                  className="w-6 h-6" 
                  style={{ color: textColor }}
                />
                <h3 
                  className="text-xl script-font"
                  style={{ color: textColor, fontWeight: 600 }}
                >
                  Remix
                </h3>
              </div>
              <p style={{ color: textColor, opacity: 0.9 }}>
                Студия вокала в Твери для всех, кто хочет раскрыть свой голос
              </p>
            </div>
            <div>
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ color: textColor }}
              >
                Контакты
              </h4>
              <div className="space-y-2" style={{ color: textColor, opacity: 0.9 }}>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@remix-vocal.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Тверь, ул. Примерная, д. 1</span>
                </div>
              </div>
            </div>
            <div>
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ color: textColor }}
              >
                Время работы
              </h4>
              <div style={{ color: textColor, opacity: 0.9 }} className="space-y-1">
                <p>Пн-Пт: 10:00 - 20:00</p>
                <p>Сб-Вс: 11:00 - 18:00</p>
              </div>
            </div>
          </div>
          {/* Map Section */}
          <div className="mt-8 mb-8">
            <h4 
              className="text-lg font-semibold mb-4 text-center"
              style={{ color: textColor }}
            >
              Как нас найти
            </h4>
            <div 
              className="rounded-lg overflow-hidden"
              style={{
                height: '400px',
                backgroundColor: backgroundColor,
              }}
            >
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=35.899104,56.815400&z=15&pt=35.899104,56.815400"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                style={{ border: 0 }}
                title="Карта расположения студии"
              />
            </div>
          </div>

          <div 
            className="border-t mt-8 pt-8 text-center"
            style={{
              borderColor: `${textColor}30`,
              color: textColor,
              opacity: 0.8,
            }}
          >
            <p className="mb-2">&copy; 2024 Remix Vocal Studio. Все права защищены.</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
              <a 
                href="https://loyal-team.ru/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: textColor,
                  textDecoration: 'underline',
                  opacity: 0.8,
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                Разработка сайта
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Modal for enlarged photo */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-opacity"
              style={{
                backgroundColor: containerColor,
                color: textColor,
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image container with glow effect */}
            <div
              className="rounded-lg p-4 max-w-full max-h-full"
              style={{
                border: `3px solid ${textColor}80`,
                boxShadow: `
                  0 0 30px ${textColor}60,
                  0 0 60px ${textColor}50,
                  0 0 90px ${textColor}40,
                  inset 0 0 30px ${textColor}30
                `,
                backgroundColor: `${textColor}15`,
              }}
            >
              <img
                src={selectedImage}
                alt="Увеличенное фото"
                className="rounded-lg max-w-full max-h-[85vh] object-contain"
                style={{
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      )}

      </div>
    </>
  )
}

export default Home

