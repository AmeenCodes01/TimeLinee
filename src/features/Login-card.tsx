"use client";
import AuthForm from "@/app/components/AuthForm";
import {Suspense} from "react";
function Login() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  );
}

export default Login;
