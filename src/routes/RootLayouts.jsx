import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import FormAuth from "../layouts/FormAuth";
import Home from "../pages/Home";
import QuizPage from "../pages/QuizPage";
import Result from "../pages/Result";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <FormAuth />,
      },
      {
        path: "register",
        element: <FormAuth />,
      },
      {
        path: "dashboard",
        element: <Home/>,
      },
      {
        path: "quiz",
        element: <QuizPage/>,
      },
      {
        path: "result",
        element: <Result/>,
      },
    ],
  },
]);