import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const BASE_URL = import.meta.env.VITE_API_URL

export default function GradeTests() {
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(true)
  const { grade } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetch(`${BASE_URL}/math-tests/by-class/${grade}/`)
      .then(res => res.json())
      .then(data => setTests(data))
      .finally(() => setLoading(false))
  }, [grade])

  const truncate = (text, length = 100) => {
    if (!text) return ""
    return text.length > length ? text.slice(0, length) + "..." : text
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-primary">Yuklanmoqda...</p>
      </div>
    )
  }

  if (!tests.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-muted-foreground">
          Hozircha testlar mavjud emas
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 mb-10">
      {tests.map(test => (
        <Card key={test.id} className="ml-4 shadow-lg">
          <CardHeader>
            <CardTitle>{test.title}</CardTitle>
            {test.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {truncate(test.description, 100)}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <p>⏱ Davomiyligi: {test.duration} daqiqa</p>
            <p>❓ Savollar soni: {test.questions_count}</p>
            <Button
              className="mt-4 w-full"
              onClick={() => navigate(`/tests-form/${test.id}`)}
              disabled={test.questions_count === 0}
            >
              Testda qatnashish
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
