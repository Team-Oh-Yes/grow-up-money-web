
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer limit={1} transition={Bounce} />
    </>
  );
}

export default App;