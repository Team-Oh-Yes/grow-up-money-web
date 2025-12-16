import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
import Adminpages from "./components/common/AdminComponents/AdminPages";
import Learn from "./components/common/Loadmapcomponents/Learn";
import Quiz from "./components/common/Loadmapcomponents/Quiz";
import Login from "./components/common/Login/Login.jsx";
import Market from "./components/common/Market/Market.jsx";
import Tshow from "./components/common/Market/Tshow.jsx";
import MypageProfile from "./components/common/MypageProfile/MypageProfile.jsx";
import EULA from "./components/common/Serviccenter/EULA";
import FaQ from "./components/common/Serviccenter/FaQ.jsx";
import Notice from "./components/common/Serviccenter/Notice.jsx";
import SignUp from "./components/common/SignUp/SignUp.jsx";
import MainTheme from "./components/common/Theme/MainTheme";
import Planpages from "./components/common/plancomponents/Planpages";
import Tshow from "./components/common/Market/Tshow.jsx";
import Error from "./error/Error";
import PrivateRoute from "./protected/PrivateRoute";
import PublicRoute from "./protected/PublicRoute";

const Loginmaincomponents = lazy(() =>
  import("./components/common/Loginmaincomponents/Loginmaincomponents.jsx")
);

const Themecomponents = lazy(() =>
  import("./components/common/Theme/Themecomponents")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Mainpages />
      </PublicRoute>
    ),
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
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Loginmaincomponents />
        </Suspense>
      </PrivateRoute>
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
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: "/servicecenter/eula",
    element: <EULA />,
    errorElement: <Error />,
  },
  {
    path: "/more",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Loginmaincomponents />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Planpages />,
      },
    ],
  },
  {
    path: "/servicecenter/faq",
    element: <FaQ />,
    errorElement: <Error />,
  },
  {
    path: "/servicecenter/notice",
    element: <Notice />,
    errorElement: <Error />,
  },
  {
    path: "/admin",
    element: <Adminpages />,
    errorElement: <Error />,
  },
  {
    path: "/my",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Loginmaincomponents />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <MypageProfile />,
      },
    ],
  },
  {
    path: "/market",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Loginmaincomponents />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Market />,
      },
      {
        path: "tshow",
        element: <Tshow></Tshow>,
      },
    ],
  },
]);

export default router;
