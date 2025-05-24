import { useState, useEffect } from "react";
import { Endpoint } from "../services/endpoint.service.js";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 jam
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async (retryCount = 3) => {
      try {
        const res = await fetch(Endpoint.getQuestions);
        if (res.status === 429) {
          if (retryCount > 0) {
            console.warn("Rate limited. Retrying in 2 seconds...");
            setTimeout(() => fetchQuestions(retryCount - 1), 2000);
          } else {
            throw new Error("Too many requests. Please try again later.");
          }
          return;
        }

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (!data.results) throw new Error("No results found in API response");

        const formatted = data.results.map((q) => {
          const options = [...q.incorrect_answers];
          const randIdx = Math.floor(Math.random() * (options.length + 1));
          options.splice(randIdx, 0, q.correct_answer);
          return {
            question: q.question,
            options,
            correct_answer: q.correct_answer,
          };
        });

        setQuestions(formatted);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("quiz_answers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);  

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(null);
    }
  };

  const handleFinish = () => {
    // Simpan ke localStorage sebelum submit
    localStorage.setItem("quiz_answers", JSON.stringify(answers));

    // Hitung skor
    const score = answers.filter((a) => a?.isCorrect).length;

    // Navigasi ke halaman hasil tanpa submit ke API
    localStorage.removeItem("quiz_answers");
    navigate("/result", {
      state: { answers, score, timeTaken: 60 * 60 - timeLeft },
    });
  };

  useEffect(() => {
    if (answers[currentQuestion]) {
      setSelectedOption(answers[currentQuestion].selectedAnswer);
    } else {
      setSelectedOption(null);
    }
  }, [currentQuestion, answers]);  

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading)
    return <div className="text-center mt-10">Loading questions...</div>;

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl p-6 md:p-10">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">QuizMaster</h1>
            <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-semibold text-sm">
              {formatTime(timeLeft)}
            </div>
          </div>

          <h2
            className="text-xl font-semibold text-gray-800 mb-6"
            dangerouslySetInnerHTML={{ __html: question.question }}
          />

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition ${
                  selectedOption === option
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => {
                    setSelectedOption(option);
                    const isCorrect = option === question.correct_answer;

                    setAnswers((prev) => {
                      const newAnswers = [...prev];
                      newAnswers[currentQuestion] = {
                        question: question.question,
                        selectedAnswer: option,
                        correctAnswer: question.correct_answer,
                        isCorrect,
                      };

                      localStorage.setItem(
                        "quiz_answers",
                        JSON.stringify(newAnswers)
                      );

                      return newAnswers;
                    });
                  }}
                  className="accent-violet-500 w-5 h-5"
                />
                <span dangerouslySetInnerHTML={{ __html: option }} />
              </label>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleFinish}
                className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 transition"
              >
                Finish Attempt
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-lg bg-violet-600 text-white font-semibold hover:bg-violet-500 transition"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-8 md:mt-0 md:ml-10">
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestion(i)}
                className={`w-10 h-10 rounded-md border text-sm font-medium transition ${
                  i === currentQuestion
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
