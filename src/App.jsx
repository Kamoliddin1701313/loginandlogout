import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import HomePage from "./HomePage";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  // const token = localStorage.getItem("token");
  // console.log("salom", token);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (token?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
  //     navigate("/home");
  //   } else {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
