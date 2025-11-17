import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Mainpages from "./components/Add/Mainpages";
import Learn from "./components/common/Loadmapcomponents/Learn";
import Quiz from "./components/common/Loadmapcomponents/Quiz";
import MainTheme from "./components/common/Theme/MainTheme";
import Error from "./error/Error";

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
]);

export default router;
