"use client";
import Link from "next/link";

type Props = {
  title: string;
  onClick?: () => void;
};

function Button({title, onClick}: Props) {
  let user: any | null;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("authUser");
    console.log(localStorage.getItem("authUser"), "user");
  }

  return (
    <>
      {user ? (
        <Link href="/create-event">
          <button
            onClick={onClick}
            className="bg-amber-600 py-2 px-4 rounded-xl w-full">
            {title}
          </button>
        </Link>
      ) : (
        <Link href="/auth">
          <button
            onClick={onClick}
            className="bg-amber-600 py-2 px-4 rounded-xl w-full">
            {title}
          </button>
        </Link>
      )}
    </>
  );
}

export default Button;
