import React from "react";
import { RouterProvider } from "react-router-dom";
import IndexRouter from "./router/IndexRouter";

const App: React.FC = () => {
  return <RouterProvider router={IndexRouter} future={{ v7_startTransition: true }} />;
};

export default App;
