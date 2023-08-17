import { createHashRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";

const IndexRouter = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default IndexRouter;
