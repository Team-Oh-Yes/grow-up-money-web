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
import Planpages from "./components/common/plancomponents/Planpages";
import Ranking from "./components/common/Ranking/Ranking.jsx";
import EULA from "./components/common/Serviccenter/EULA";
import FaQ from "./components/common/Serviccenter/FaQ.jsx";
import Notice from "./components/common/Serviccenter/Notice.jsx";
import ShopComponents from "./components/common/Shopcomponents/Shopcomponents.jsx";
import SignUp from "./components/common/SignUp/SignUp.jsx";
import MainTheme from "./components/common/Theme/MainTheme";
import Error from "./error/Error";

const Loginmaincomponents = lazy(() =>
  import("./components/common/Loginmaincomponents/Loginmaincomponents.jsx")
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
    path: "/admin",
    element: <Adminpages />,
    errorElement: <Error />,
  },
  {
    path: "/more",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Loginmaincomponents />
      </Suspense>
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
      <Suspense fallback={<div>Loading...</div>}>
        <Loginmaincomponents />
      </Suspense>
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
      <Suspense fallback={<div>Loading...</div>}>
        <Loginmaincomponents />
      </Suspense>
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
  {
    path: "/ranking",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Loginmaincomponents />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Ranking />,
      },
    ],
  },
  {
    path: "/shop",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Loginmaincomponents />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <ShopComponents />,
      },
    ],
  },
]);

export default router;
