import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MultiStepForm from "../Components/MultiStepForm";
import NotFound from "../Components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <MultiStepForm />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
