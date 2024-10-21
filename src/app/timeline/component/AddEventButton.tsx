"use client";

import {useRouter} from "next/navigation";
import {useParams} from "next/navigation";
import {createQueryString} from "../../../utils/createParams";
function AddEventButton() {
  const router = useRouter();

  const params = useParams<{id: string}>();
  let user: any | null;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("authUser");
    console.log(localStorage.getItem("authUser"), "user");
  }
  return (
    <button
      className="size-10 text-2xl text-white  bg-amber-600 rounded-full shadow-md  self-end absolute bottom-24 left-10  "
      onClick={() => {
        const tId = createQueryString("id", params.id);

        router.push(user ? "/create-event" + "?" + tId : "/auth" + "?" + tId);
      }}>
      +
    </button>
  );
}

export default AddEventButton;
