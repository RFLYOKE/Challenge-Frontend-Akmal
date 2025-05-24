import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { results = [], totalQuestions = 0 } = location.state || {};

  const correctAnswers = results.filter((r) => r.isCorrect).length;
  const wrongAnswers = results.length - correctAnswers;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Quiz Result</h1>

        <div className="text-lg text-gray-700 space-y-2 mb-6">
          <p>
            Total Questions:{" "}
            <span className="font-semibold">{totalQuestions}</span>
          </p>
          <p>
            Answered: <span className="font-semibold">{results.length}</span>
          </p>
          <p>
            Correct:{" "}
            <span className="text-green-600 font-semibold">
              {correctAnswers}
            </span>
          </p>
          <p>
            Wrong:{" "}
            <span className="text-red-600 font-semibold">{wrongAnswers}</span>
          </p>
          <p className="text-xl font-bold mt-4">
            Score: <span className="text-indigo-700">{scorePercentage}%</span>
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-6 py-3 rounded-lg bg-violet-600 text-white font-semibold hover:bg-violet-500 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Result;
