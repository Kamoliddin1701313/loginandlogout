import React, { useState } from "react";
import { FaPhoneVolume } from "react-icons/fa6"; //react icon phone
import { FaLockOpen } from "react-icons/fa"; //react icon lock
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  //   const token=localStorage.
  const loginBtn = (event) => {
    event.preventDefault();
    fetch("https://api.dezinfeksiyatashkent.uz/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phone,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((respons) => {
        if (respons?.success == true) {
          localStorage.setItem(
            "token",
            respons?.data?.tokens?.accessToken?.token
          );
          navigate("/categories");
        //   alert(respons.message);
        } else {
          alert("Ma'lumotlarni to'g'iri kiriting ! ");
        }
      });
  };

  return (
    <div className="bg-neutral-700 w-full h-screen flex items-center">
      <form className="w-1/3 mx-auto bg-white min-h-[220px] p-8 rounded-[24px]">
        <h1 className="text-center my-5 text-[36px] font-semibold text-blue-700">
          Sign up
        </h1>
        <div className="relative">
          <FaPhoneVolume className="absolute top-1/2 left-5 -translate-y-1/2" />
          <input
            className="w-full border-[2px] border-gray-500 rounded-[12px] outline-none py-[10px] px-5 pl-12"
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Phone number"
          />
        </div>

        <div className="relative my-8">
          <FaLockOpen className="absolute top-1/2 left-5 -translate-y-1/2" />
          <input
            className="w-full border-[2px] border-gray-500 rounded-[12px] outline-none py-[10px] px-5 pl-12"
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Password"
          />
        </div>
        <button
          onClick={loginBtn}
          className="font-semibold border-[2px] border-gray-500 px-6 py-[10px] text-[18px] rounded-[12px] block mx-auto mb-5"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
