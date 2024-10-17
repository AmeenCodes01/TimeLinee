"use client";

import {useRouter} from "next/navigation";
import {useParams} from "next/navigation";
import {createQueryString} from "../../../utils/createParams";
import {useEffect} from "react";
function AddEventButton() {
  const router = useRouter();
  const params = useParams<{id: string}>();
  let user: any | null;
  useEffect(() => {
    user = localStorage.getItem("authUser");
  }, []);
  const tId = createQueryString("id", params.id);
  return (
    <button
      className="size-10 text-2xl text-white  bg-amber-600 rounded-full shadow-md  self-end absolute top-24 left-10  "
      onClick={() =>
        router.push(user ? "/create-event" + "?" + tId : "/auth" + "?" + tId)
      }>
      +
    </button>
  );
}

export default AddEventButton;
