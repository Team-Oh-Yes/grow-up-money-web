
import { RouterProvider } from "react-router-dom";
import router from "./router";
import LoginAndSignup from "./components/common/LoginAndSignup";

function App() {
  return (
    <>
      <LoginAndSignup />
      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;