import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const BASE_URL = import.meta.env.VITE_API_URL

export default function TestOverviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("access")
    if (!token) {
      navigate("/login")
      return
    }

    fetch(`${BASE_URL}/math-tests/test-overview/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        setLoading(false)
      })
  }, [id, navigate])

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-primary">Yuklanmoqda...</p>
      </div>
    )
  }

  return (
    <section className="container mx-auto mt-20 px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Test natijalari</h1>

      {questions.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Hali javob berilmagan testlar mavjud emas.
        </p>
      ) : (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <Card key={q.question_id} className="shadow-md">
              <CardContent className="p-4">
                 {q.image ? (
                    <img
                      src={BASE_URL + q.image}
                      alt="question"
                      className="mb-3 w-full max-w-full max-h-80 object-contain rounded"
                    />
                  ) : (
                    <p className="font-semibold mb-3">{idx + 1}. {q.question}</p>
                  )}

                {/* Closed question */}
                {q.options ? (
                  <div className="grid grid-cols-1 gap-2">
                    {["a", "b", "c", "d"].map((opt) => {
                      const isCorrect = q.correct_answer === opt
                      const isUser = q.user_answer === opt
                      let bgClass = "bg-gray-50"

                      if (q.test_status === "correct" && isUser) bgClass = "bg-green-200"
                      if (q.test_status === "wrong") {
                        if (isUser) bgClass = "bg-red-200"
                        if (isCorrect) bgClass = "bg-green-200"
                      }
                      return (
                        <div
                          key={opt}
                          className={`p-2 rounded border ${bgClass} border-border`}
                        >
                          <span className="font-medium">{opt.toUpperCase()}:</span> {q.options[opt]}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  // Open question
                  <div className="space-y-2">
                    <p>✅ To‘g‘ri javob: <span className="bg-green-200 px-2 rounded">{q.correct_answer_text}</span></p>
                    {q.test_status === "wrong" ? (
                      <p>❌ Sizning javobingiz: <span className="bg-red-200 px-2 rounded">{q.user_answer_text}</span></p>
                    ) : q.test_status === "correct" ? (
                      <p>✅ Sizning javobingiz: <span className="bg-green-200 px-2 rounded">{q.user_answer_text}</span></p>
                    ) : (
                      <p>⏸ Siz javob bermagansiz</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Button onClick={() => navigate("/profile")} className="px-8 py-3">
          ↩️ Natijalarni ko‘rish uchun profilega qaytish
        </Button>
      </div>
    </section>
  )
}
