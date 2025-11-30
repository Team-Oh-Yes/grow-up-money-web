import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
<<<<<<< HEAD
=======
import { Toaster } from "react-hot-toast";
>>>>>>> 56c88d1c53e4dd06d6d1b1ec9a59c5df00d4042b

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
