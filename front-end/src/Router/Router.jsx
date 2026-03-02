import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MultiStepForm from "../Components/MultiStepForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <MultiStepForm />,
  },
]);

export default router;
