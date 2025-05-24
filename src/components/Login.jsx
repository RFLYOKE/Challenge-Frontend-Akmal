import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (storedUser) {
      if (email === storedUser.email && password === storedUser.password) {
        alert("Login berhasil!");
        navigate("/dashboard"); 
      } else {
        setError("Email atau password salah");
      }
    } else {
      setError("Belum ada akun terdaftar");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex items-center w-full px-4 py-2 mt-2 text-sm border rounded-lg">
        <FaEnvelope className="text-gray-400 mr-2" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full outline-none bg-transparent"
          required
        />
      </div>
      <div className="flex items-center w-full px-4 py-2 mt-2 text-sm border rounded-lg">
        <FaLock className="text-gray-400 mr-2" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full outline-none bg-transparent"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        type="submit"
        className="block w-full px-4 py-2 mt-6 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
      >
        Masuk
      </button>

      <button
        type="button"
        onClick={() => navigate("/register")}
        className="text-indigo-800 w-full my-3 underline"
      >
        Register
      </button>
    </form>
  );
};

export default Login;
