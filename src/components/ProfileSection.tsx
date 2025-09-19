import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const BASE_URL = import.meta.env.VITE_API_URL

export default function ProfilePage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("access")
    if (!token) {
      navigate("/login")
      return
    }

    fetch(`${BASE_URL}/math-tests/user-answered-questions/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        setLoading(false)
      })
  }, [navigate])

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
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Mening test natijalarim</h1>

      {results.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Hali hech qaysi testda qatnashmagansiz.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((r) => (
            <Card
              key={r.id}
              className="shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="font-bold text-lg mb-2">{r.test}</h2>
                  <p>📌 Umumiy savollar: {r.total_questions}</p>
                  <p>✅ To‘g‘ri javoblar: {r.correct_answers}</p>
                  <p>❌ Noto‘g‘ri javoblar: {r.wrong_answers}</p>
                  <p>➖ Javobsiz: {r.unanswered}</p>
                  <p className="mt-2 font-semibold">
                    🔥 Ball: <span className="text-blue-600">{r.score.toFixed(2)}/{r.total_score.toFixed(2)}</span>
                  </p>
                </div>

                <div className="mt-4 text-center">
                  <Button
                    size="sm"
                    className="px-4 py-2 w-full bg-gradient-primary hover:shadow-glow"
                    onClick={() => navigate(`/test-overview/${r.id}/`)}
                  >
                    Natijalarni ko'rish
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Button onClick={() => navigate("/tests")} className="px-8 py-3">
          📝 Testlar ro‘yxatiga qaytish
        </Button>
      </div>
    </section>
  )
}
