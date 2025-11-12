import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
import Loginmaincomponents from "./components/common/Loginmaincomponents/Loginmaincomponents";
import Adminpages from "./components/common/AdminComponents/AdminPages";
import Error from "./error/Error";
import MainTheme from "./components/common/Theme/MainTheme";
// You need to import the Theme component
import Themecomponents from "./components/common/Theme/Themecomponents"; // Assuming the path to your Theme component is correct
import SignUp from "./components/common/SignUp/SignUp.jsx";
import Login from "./components/common/Login/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpages />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Loginmaincomponents />,
    errorElement: <Error />,
  },
  {
    path: "/admin",
    element: <Adminpages />,
    errorElement: <Error />,
  },
  {
    path: "/home",
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
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;