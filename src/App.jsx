import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Toaster } from "react-hot-toast";
import axiosInstance from "./components/api/axiosInstance";

function App() {
  // 앱 로드 시 쿠키 확인을 위해 서버 통신 (새로고침 시에도 동작)
  useEffect(() => {
    const refreshCookie = async () => {
      try {
        await axiosInstance.get('/healthCheck');
      } catch (error) {
        // 에러 무시 - 쿠키 새로고침 목적
      }
    };
    refreshCookie();
  }, []);

  return (
    <>
      {/* <Toaster /> */}
      <RouterProvider router={router} />
      <ToastContainer limit={1} transition={Bounce} />
    </>
  );
}

export default App;
