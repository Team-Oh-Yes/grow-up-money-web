import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
import Error from "./error/Error";
import Planpages from "./components/common/plancomponents/Planpages";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpages />,
    errorElement: <Error />,
  },
  {path:"/plan",
    element :<Planpages />,
    errorElement: <Error />
  }
]);
export default router;
