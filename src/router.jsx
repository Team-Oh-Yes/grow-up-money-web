import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
import Learn from "./components/common/Loadmapcomponents/Learn";
import Loginmaincomponents from "./components/common/Loginmaincomponents/Loginmaincomponents";
import MainTheme from "./components/common/Theme/MainTheme";
import Themecomponents from "./components/common/Theme/Themecomponents"; // Assuming the path to your Theme component is correct
import Error from "./error/Error";
import Quiz from "./components/common/Loadmapcomponents/Quiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpages />,
    errorElement: <Error />,
  },
  {
    path: "roadmap",
    element: <Loginmaincomponents />,
    children: [
      {
        index: true,
        element: <MainTheme />,
      },
      {
        path: ":id",
        element: <Themecomponents />,
      },
      {
        path: ":i/:d/learn",
        element: <Learn />,
      },
      {
        path: ":i/:d/quiz",
        element: <Quiz />,
      },
    ],
  },
]);

export default router;
