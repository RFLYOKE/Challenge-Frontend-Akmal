// FormAuth.jsx
import { useLocation } from "react-router-dom";
import logo from "../assets/icon/icon-kuis.png";
import questions from "../assets/icon/icon-questions.png";
import Login from "../components/Login";
import Register from "../components/Register";

const FormAuth = () => {
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col items-center justify-start py-20">
      <img src={logo} alt="logo" className="lg:w-1/5 md:w-1/4 w-1/2" />
      <div className="mt-6 px-4 py-5 bg-white rounded-lg">
        <div className="flex items-center gap-x-2">
          <img src={questions} alt="quiz" className="w-12" />
          <p className="font-semibold text-4xl text-indigo-800">QuizMaster</p>
        </div>
        {isRegister ? <Register /> : <Login />}
      </div>
    </div>
  );
};

export default FormAuth;
