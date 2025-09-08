import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react"; // spinner icon

const BASE_URL = import.meta.env.VITE_API_URL;

const colors = {
  "1-sinf": "bg-red-500",
  "2-sinf": "bg-orange-500",
  "3-sinf": "bg-amber-500",
  "4-sinf": "bg-yellow-500",
  "5-sinf": "bg-lime-500",
  "6-sinf": "bg-green-500",
  "7-sinf": "bg-emerald-500",
  "8-sinf": "bg-teal-500",
  "9-sinf": "bg-cyan-500",
  "10-sinf": "bg-blue-500",
  "11-sinf": "bg-indigo-500",
};

const TestsSection = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/math-tests/all/`)
      .then((res) => res.json())
      .then((data) => {
        const withColors = data.map((item) => ({
          ...item,
          color: colors[item.grade] || "bg-gray-400",
          num: parseInt(item.grade.replace("-sinf", "")),
        }));
        setGrades(withColors);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="tests" className="py-20 bg-muted/30 mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            Matematik Testlar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Har xil sinf va mavzular bo'yicha testlar. O'z bilimingizni sinab
            ko'ring va olimpiadaga tayyorlaning.
          </p>
        </div>

        <div className="mb-12 animate-fade-in-up">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Sinf bo'yicha tanlang:
          </h3>

          {loading ? (
            <div className="flex flex-col justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-primary">Yuklanmoqda...</p>
      </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {grades.map((item) => (
                <Link to={`/tests-by-class/${item.num}`} key={item.grade}>
                  <Card className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-medium border-2 hover:border-primary/20">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-soft`}
                      >
                        <span className="text-white font-bold">{item.num}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">
                        {item.grade}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.total} ta test
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestsSection;
