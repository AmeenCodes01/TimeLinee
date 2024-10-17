"use client";
import createUserTimeLine from "@/app/auth/actions/createUserTimeLine";
import {useRouter} from "next/navigation";
import {useState} from "react";
import getUser from "../auth/actions/getUser";
import {useSearchParams} from "next/navigation";
import {createQueryString} from "../../utils/createParams";

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
      console.log("test");
      console.log(data, "DATA ");
      if (data) {
        localStorage.setItem("authUser", JSON.stringify(data));
        router.push(
          params.get("id")
            ? "/create-event" +
                "?" +
                createQueryString("id", params.get("id") as string)
            : "/create-event"
        );
      }
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
          onClick={(e) => onSubmit(e, "logIn")}>
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
