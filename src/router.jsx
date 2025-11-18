import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
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


const Loginmaincomponents = lazy(() =>
  import("./components/common/Loginmaincomponents/Loginmaincomponents")
);

const Themecomponents = lazy(() =>
  import("./components/common/Theme/Themecomponents")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpages />,
    errorElement: <Error />,
  },
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
        index: true,
        element: <MainTheme />,
      },
      {
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
    path: "/servicecenter/faq",
    element: <FaQ />,
    errorElement: <Error />
  }
]);

export default router;
