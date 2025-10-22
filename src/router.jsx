import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
import Loginmaincomponents from "./components/common/Loginmaincomponents/Loginmaincomponents";
import Error from "./error/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpages />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Loginmaincomponents></Loginmaincomponents>,
  },
]);
export default router;
