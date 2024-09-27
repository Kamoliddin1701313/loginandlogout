import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [raqam, setRaqam] = useState();
  const [parol, setParol] = useState();
  const navigate = useNavigate();

  const loginSubmit = (event) => {
    event.preventDefault();

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phone_number: raqam,
        password: parol,
      }),
    })
      .then((response) => response.json())
      .then((element) => {
        if (element?.success === true) {
          localStorage.setItem(
            "token",
            element?.data?.tokens?.accessToken?.token
          );
          toast.success(element.message);
          navigate("/home");
        } else {
          toast.error(element.message);
        }
      });
  };

  // https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin
  
  return (
    <div>
      <h1>Login qilish</h1>
      <form>
        <input
          onChange={(e) => setRaqam(e?.target?.value)}
          type="text"
          placeholder="number"
          minLength={"3"}
        />
        <input
          onChange={(e) => setParol(e?.target?.value)}
          type="text"
          placeholder="password"
          minLength={"3"}
        />
        <button onClick={loginSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
