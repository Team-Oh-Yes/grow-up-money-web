import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
import Loadmap from "./components/common/Loadmapcomponents/Loadmap";
import Loginmaincomponents from "./components/common/Loginmaincomponents/Loginmaincomponents";
import MainTheme from "./components/common/Theme/MainTheme";
import Themecomponents from "./components/common/Theme/Themecomponents"; // Assuming the path to your Theme component is correct
import Error from "./error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpages />,
    errorElement: <Error />,
  },
  {
    path: "/login",
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
        path: "quiz/:i/:d",
        element: <Loadmap />,
      },
    ],
  },
]);

export default router;
