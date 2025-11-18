import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
import Error from "./error/Error";
import Planpages from "./components/common/plancomponents/Planpages";
import EULA from "./components/common/Serviccenter/EULA";
import Notice from "./components/common/Serviccenter/Notice";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpages />,
    errorElement: <Error />,
  },
  {
    path: "/servicecenter/eula",
    element: <EULA />,
    errorElement: <Error />
  },
  {path:"/plan",
    element :<Planpages />,
    errorElement: <Error />
  },
  {
    path: "/servicecenter/notice",
    element: <Notice />,
    errorElement: <Error />
  }
]);
export default router;
