import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
      <ToastContainer limit={1} transition={Bounce} />
    </>
  );
}

export default App;
