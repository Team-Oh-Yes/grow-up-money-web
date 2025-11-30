import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
<<<<<<< HEAD
import Loginmaincomponents from "./components/common/Loginmaincomponents/Loginmaincomponents";
import Error from "./error/Error";
import MainTheme from "./components/common/Theme/MainTheme";
// You need to import the Theme component
import Themecomponents from "./components/common/Theme/Themecomponents"; // Assuming the path to your Theme component is correct
import SignUp from "./components/common/SignUp/SignUp.jsx";
import Login from "./components/common/Login/Login.jsx";
=======
// import Loginmaincomponents from "./components/common/Loginmaincomponents/Loginmaincomponents";
import Adminpages from "./components/common/AdminComponents/AdminPages";
import Error from "./error/Error";
// import Themecomponents from "./components/common/Theme/Themecomponents"; // Assuming the path to your Theme component is correct
import SignUp from "./components/common/SignUp/SignUp.jsx";
import Login from "./components/common/Login/Login.jsx";
import Planpages from "./components/common/plancomponents/Planpages";
import EULA from "./components/common/Serviccenter/EULA";
import Learn from "./components/common/Loadmapcomponents/Learn";
import Quiz from "./components/common/Loadmapcomponents/Quiz";
import MainTheme from "./components/common/Theme/MainTheme";
import FaQ from "./components/common/Serviccenter/FaQ.jsx";
import Notice from "./components/common/Serviccenter/Notice.jsx";
import Mypage from "./components/common/mypage/Mypage.jsx";

const Loginmaincomponents = lazy(() =>
  import("./components/common/Loginmaincomponents/Loginmaincomponents")
);

const Themecomponents = lazy(() =>
  import("./components/common/Theme/Themecomponents")
);
>>>>>>> 56c88d1c53e4dd06d6d1b1ec9a59c5df00d4042b

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpages />,
    errorElement: <Error />,
  },
<<<<<<< HEAD
  {
    path: "/home",
    element: <Loginmaincomponents />,
    children: [
      {  
=======
  // {
  //   path: "/login",
  //   element: <Loginmaincomponents />,
  //   errorElement: <Error />,
  // },
  {
    path: "roadmap",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Loginmaincomponents />
      </Suspense>
    ),
    children: [
      {
>>>>>>> 56c88d1c53e4dd06d6d1b1ec9a59c5df00d4042b
        index: true,
        element: <MainTheme />,
      },
      {
<<<<<<< HEAD
        path: ":id", 
        element: <Themecomponents />,
=======
        path: ":id",
        element: (
          <Suspense fallback={<div>loading</div>}>
            <Themecomponents />
          </Suspense>
        ),
      },
      {
        path: ":i/:d/learn",
        element: <Learn />,
      },
      {
        path: ":i/:d/quiz",
        element: <Quiz />,
>>>>>>> 56c88d1c53e4dd06d6d1b1ec9a59c5df00d4042b
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
<<<<<<< HEAD
]);

export default router;
=======
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
    path: "/admin",
    element: <Adminpages />,
    errorElement: <Error />,
  },
  {
    path: "/servicecenter/faq",
    element: <FaQ />,
    errorElement: <Error />
  },
  {
    path: "/servicecenter/notice",
    element: <Notice />,
    errorElement: <Error />
  },
  {
    path: "/admin/*",
    element: <Adminpages />,
    errorElement: <Error />,
  },{
    path: "/mypage",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Loginmaincomponents />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Mypage />,
      },
    ]
  }
]);

export default router;
>>>>>>> 56c88d1c53e4dd06d6d1b1ec9a59c5df00d4042b
