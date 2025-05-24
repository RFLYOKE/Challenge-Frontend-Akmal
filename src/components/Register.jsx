import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const username = e.target.user.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const newUser = { username, email, password };

    // Simpan ke localStorage
    localStorage.setItem("registeredUser", JSON.stringify(newUser));

    alert("Registrasi berhasil!");
    navigate("/"); // Arahkan ke login
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="flex items-center w-full px-4 py-2 mt-2 text-sm border rounded-lg">
        <FaUser className="text-gray-400 mr-2" />
        <input
          type="text"
          name="user"
          placeholder="Username"
          className="w-full outline-none bg-transparent"
          required
        />
      </div>
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

      <button
        type="submit"
        className="block w-full px-4 py-2 mt-6 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
      >
        Register
      </button>

      <button
        type="button"
        onClick={() => navigate("/")}
        className="text-indigo-800 w-full my-3 underline"
      >
        Login
      </button>
    </form>
  );
};

export default Register;
