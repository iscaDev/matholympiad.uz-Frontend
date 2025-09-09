import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

const BASE_URL = import.meta.env.VITE_API_URL

export default function TestPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [test, setTest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [alreadyTakenModal, setAlreadyTakenModal] = useState(false)
  const [result, setResult] = useState(null)

  // Test va token tekshiruvi
  useEffect(() => {
    const token = localStorage.getItem("access")
    if (!token) {
      setShowLoginModal(true)
      setLoading(false)
      return
    }

    fetch(`${BASE_URL}/math-tests/by-id/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) {
          if (res.status === 401) {
            setShowLoginModal(true)
          }
          if (res.status === 400 && data.error_code === "test_already_taken") {
            setAlreadyTakenModal(true)
          }
          setLoading(false)
          return
        }

        setTest(data)
        const savedAnswers = localStorage.getItem(`test_${id}_answers`)
        const savedTime = localStorage.getItem(`test_${id}_timeLeft`)

        if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
        if (savedTime) setTimeLeft(parseInt(savedTime))
        else setTimeLeft(data.deadline_time * 60)

        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        setLoading(false)
      })
  }, [id])

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      if (test && !result) handleSubmit()
      return
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, test, result])

  // LocalStorage
  useEffect(() => {
    if (test && !result) {
      localStorage.setItem(`test_${id}_answers`, JSON.stringify(answers))
      localStorage.setItem(`test_${id}_timeLeft`, timeLeft.toString())
    }
  }, [answers, timeLeft, test, id, result])

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s < 10 ? "0" : ""}${s}`
  }

  const handleCheckboxChange = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }))
  }

  const handleInputChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }))
  }

  const handleSubmit = () => {
    const token = localStorage.getItem("access")
    if (!token) {
      setShowLoginModal(true)
      return
    }

    const payload = test.questions.map((q) => ({
      question_id: q.id,
      answer: answers[q.id] || "no_answer",
      test_type: q.test_type, 
    }))

    fetch(`${BASE_URL}/math-tests/check-answers/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.removeItem(`test_${id}_answers`)
        localStorage.removeItem(`test_${id}_timeLeft`)
        setResult(data)
      })
      .catch((err) => console.error("Submit error:", err))
  }

  if (loading && !showLoginModal) {
    return (
       <div className="flex flex-col justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-primary">Yuklanmoqda...</p>
      </div>
    )
  }

  return (
    <section className="container mx-auto mt-20 px-4 py-10">
      {showLoginModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-4">🔒 Login kerak</h2>
            <p className="mb-6">Ushbu testni yechish uchun tizimga kirishingiz kerak.</p>
            <Button onClick={() => navigate("/login")} className="px-6 py-2">
              Login qilish
            </Button>
          </div>
        </div>
      ) : alreadyTakenModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-4">⚠️ Ogohlantirish</h2>
            <p className="mb-6">Siz bu testda avval qatnashgansiz.</p>
            <Button onClick={() => navigate("/profile")} className="px-6 py-2">
              ↩️ Natijani bilish uchun profilega o'tish
            </Button>
          </div>
        </div>
      ) : result ? (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold mb-4">📊 Natijangiz</h2>
          <div className="space-y-2 mb-6">
            <p>Umumiy savollar: {result.total_questions}</p>
            <p>✅ To‘g‘ri javoblar: {result.correct_answers}</p>
            <p>❌ Noto‘g‘ri javoblar: {result.wrong_answers}</p>
            <p>⏳ Javobsiz: {result.unanswered}</p>
            <p className="font-semibold text-lg">Ball: {result.score}</p>
          </div>
          <Button onClick={() => navigate("/tests")}>
            ↩️ Testlar ro‘yxatiga qaytish
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">{test?.name}</h1>
            {test?.description && <p className="text-muted-foreground mb-4">{test.description}</p>}
            <div className="text-lg font-semibold text-red-500">
              ⏳ Qolgan vaqt: {formatTime(timeLeft)}
            </div>
          </div>

          <div className="space-y-6">
            {test?.questions.map((q, index) => (
              <Card key={q.id} className="shadow-md">
                <CardContent className="p-4">
                   {q.image ? (
                    <img
                      src={BASE_URL + q.image}
                      alt="question"
                      className="mb-3 w-full max-w-full max-h-80 object-contain rounded"
                    />
                  ) : (
                    <p className="font-semibold mb-3">{index + 1}. {q.question}</p>
                  )}

                  {q.test_type === "closed" ? (
                    <div className="grid grid-cols-1 gap-2">
                      {["answer_a", "answer_b", "answer_c", "answer_d"].map(
                        (key, idx) => (
                          <label key={key} className="flex items-center space-x-2 cursor-pointer">
                            <Checkbox
                              checked={answers[q.id] === key}
                              onCheckedChange={() => handleCheckboxChange(q.id, key)}
                            />
                            <span>{String.fromCharCode(65 + idx)}: {q[key]}</span>
                          </label>
                        )
                      )}
                    </div>
                  ) : (
                    <Input
                      placeholder="Javobingizni yozing..."
                      value={answers[q.id] || ""}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button onClick={handleSubmit} className="px-8 py-3 text-lg">
              Javoblarni yuborish
            </Button>
          </div>
        </>
      )}
    </section>
  )
}
