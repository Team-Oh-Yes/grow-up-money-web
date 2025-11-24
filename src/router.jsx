import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
import Loginmaincomponents from "./components/common/Loginmaincomponents/Loginmaincomponents";
import Error from "./error/Error";
import MainTheme from "./components/common/Theme/MainTheme";
// You need to import the Theme component
import Themecomponents from "./components/common/Theme/Themecomponents"; // Assuming the path to your Theme component is correct

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpages />,
    errorElement: <Error />,
  },
  {
    path: "/roadmap",
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
    ],
  },
]);

export default router;