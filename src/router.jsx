import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
import Adminpages from "./components/common/AdminComponents/Admin-FT.jsx";
import Error from "./error/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpages />,
    element: <Adminpages />,
    errorElement: <Error />,
  },
]);
export default router;
