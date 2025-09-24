import { createBrowserRouter } from "react-router-dom";
import Error from "./error/Error";
import Mainpages from "./mainpages";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpages />,
    errorElement: <Error />,
  },
]);
export default router;
