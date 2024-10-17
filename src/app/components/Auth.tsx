"use client";
import SignUp from "@/features/SignUp-card";
import Login from "@/features/Login-card";
import {useState} from "react";

const Auth = () => {
  return (
    <div className="w-full h-full justify-center items-center flex">
      <Login />
    </div>
  );
};

export default Auth;
