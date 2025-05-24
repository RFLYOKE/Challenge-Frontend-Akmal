import { useNavigate } from "react-router-dom";
import { useState } from "react";
import infoIcon from "../assets/icon/icon-information.png"

const Home = () => {
  const navigate = useNavigate();

  const instructions = [
    "You will get 10 multiple-choice questions.",
    "Each question has only one correct answer.",
    "You have 30 seconds to answer each question.",
    "Once you answer or time runs out, you can't go back.",
    "Try to get the highest score!",
  ];

  const [checked, setChecked] = useState(
    Array(instructions.length).fill(false)
  );

  const handleCheckboxChange = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-[90%] max-w-md text-center">
        <div className="flex justify-center mb-2">
          <img src={infoIcon} alt="" className="w-32" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to QuizMaster
        </h1>
        <p className="text-gray-600 mb-6">
          Before starting the quiz, please read the instructions carefully:
        </p>

        <ul className="text-left space-y-3 text-gray-700">
          {instructions.map((text, index) => (
            <li key={index} className="flex items-start gap-2">
              <input
                type="checkbox"
                className="accent-violet-600 mt-1"
                checked={checked[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/quiz")}
          disabled={!checked.every(Boolean)}
          className={`mt-8 w-full py-3 font-semibold rounded-lg transition ${
            checked.every(Boolean)
              ? "bg-violet-600 text-white hover:bg-violet-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
