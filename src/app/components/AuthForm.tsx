"use client";
import createUserTimeLine from "@/app/auth/actions/createUserTimeLine";
import {useRouter} from "next/navigation";
import {useState} from "react";
import getUser from "../auth/actions/getUser";
import {useSearchParams} from "next/navigation";
import {createQueryString} from "../../utils/createParams";
import {toast} from "react-toastify";

function AuthForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: string
  ) => {
    e.preventDefault();

    if (username && pass.length > 4) {
      console.log("test");
      const data =
        type == "signIn"
          ? await createUserTimeLine(username, pass)
          : await getUser(username, pass);
      console.log(data, " da ta");
      if (data.error) {
        if (
          data.error ==
          'duplicate key value violates unique constraint "Users_username_key"'
        ) {
          toast("User already exists. Please login");
        } else {
          toast(data.error);
        }
      }

      // if (data) {
      //   localStorage.setItem("authUser", JSON.stringify(data));
      //   router.push(
      //     params.get("id")
      //       ? "/create-event" +
      //           "?" +
      //           createQueryString("id", params.get("id") as string)
      //       : "/create-event"
      //   );
      // } else if (type == "login" && data == undefined) {
      //   console.log("toast");
      //   toast("Username or pass incorrect", {
      //     position: "top-right",
      //     autoClose: 5000,

      //     theme: "light",
      //   });
      // } else if (type == "signIn" && data == undefined) {
      //   toast("Username already exists", {
      //     position: "top-right",
      //     autoClose: 5000,

      //     theme: "light",
      //   });
      // }
    }
  };
  return (
    <form className="flex flex-col gap-2 text-slate-500 focus:outline-none drop-shadow-xl">
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-white">
          username:
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-white">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <button
          className="bg-green-500 text-white"
          type="submit"
          onClick={(e) => onSubmit(e, "login")}>
          Log in
        </button>
        <button
          className="bg-indigo-400 text-white"
          onClick={(e) => onSubmit(e, "signIn")}>
          Sign up
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
