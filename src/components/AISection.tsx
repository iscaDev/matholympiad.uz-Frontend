import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Bot, Send, MessageCircle, Lightbulb, BookOpen, Calculator } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL

const AISection = () => {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [showLoginModal, setShowLoginModal] = useState(false)
const quickQuestions = [
    {
      icon: Calculator,
      question: 'Trigonometriya formulalari',
      category: 'Geometriya'
    },
    {
      icon: BookOpen,
      question: 'Logarifm xossalari',
      category: 'Algebra'
    },
    {
      icon: Lightbulb,
      question: 'Kombinatorika masalalari',
      category: 'Ehtimollar'
    },
  ];
  // Chat tarixini olish
  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem('access')
      if (!token) {
        setShowLoginModal(true)
        return
      }

      const res = await fetch(`${BASE_URL}/aihelper/chat/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
     if (res.status === 401) {
  console.warn("Token yaroqsiz yoki muddati tugagan. Chat tarixi saqlanmaydi.");

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  window.location.href = "/login";   

  return;
}
      const data = await res.json()
      setChatHistory(data)
    } catch (err) {
      console.error('Tarixni olishda xatolik:', err)
    }
  }

  useEffect(() => {
    fetchChatHistory()
  }, [])

  // User message yuborish
  const handleSendMessage = async () => {
    if (!message.trim()) return

    const token = localStorage.getItem('access')
    if (!token) {
      setShowLoginModal(true)
      return
    }

    setIsTyping(true)
    try {
      const res = await fetch(`${BASE_URL}/aihelper/chat/with-ai/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
        }),
      })

      const data = await res.json()
      if (data.success) {
        await fetchChatHistory()
      }
    } catch (err) {
      console.error('Xabar yuborishda xatolik:', err)
    } finally {
      setIsTyping(false)
      setMessage('')
    }
  }

  return (
    <section id="ai" className="py-20 mt-2">

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-glow">
              <Bot className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            AI Matematik Yordamchisi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sun'iy intellekt bilan matematik masalalaringizni yeching. 
            Savol bering, tushuntirish oling va bilimingizni oshiring.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {/* Quick Questions */}
          <div className="mb-12 animate-fade-in-up">
            <h3 className="text-xl font-semibold mb-6 text-center">Tez-tez so'raladigan savollar:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {quickQuestions.map((item, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-medium border-2 hover:border-primary/20 bg-gradient-card"
                >
                  <CardContent className="p-6 text-center">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">{item.question}</h4>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* Chat Interface */}
          <Card className="shadow-large border-2 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Bot className="w-6 h-6 text-primary" />
                <span>Matematik Suhbat</span>
                <Badge variant="secondary" className="ml-auto">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Faol
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-96 overflow-y-auto mb-4 p-4 bg-muted/30 rounded-lg flex flex-col justify-start space-y-4">
                {chatHistory.length === 0 && !isTyping ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Sizda bugun hech qanday chatlar yo‘q. AI yordamchi bilan suhbat uchun nimadir so‘rashingiz mumkin.
                    </p>
                  </div>
                ) : (
                  chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          chat.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-8'
                            : 'bg-background border shadow-soft mr-8'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{chat.message}</p>
                        <p
                          className={`text-xs mt-2 ${
                            chat.type === 'user'
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {new Date(chat.messaged_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-background border shadow-soft p-4 rounded-lg mr-8">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <Input
                  placeholder="Matematik savol yoki masalangizni yozing..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-primary hover:shadow-glow"
                  disabled={!message.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Modal */}
          {showLoginModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                <h3 className="text-lg font-semibold mb-4">Login talab qilinadi</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Chatdan foydalanish uchun iltimos, hisobingizga kiring.
                </p>
                <Button
                  onClick={() => {
                    setShowLoginModal(false)
                    window.location.href = '/login'
                  }}
                  className="bg-gradient-primary hover:shadow-glow w-full"
                >
                  Login qilish
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AISection
