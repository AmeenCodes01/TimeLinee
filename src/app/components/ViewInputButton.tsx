"use client";
import Link from "next/link";
import React, {useState} from "react";

function ViewInputButton() {
  const [id, setID] = useState("");

  return (
    <div className="flex  w-[100%] h-auto rounded-xl overflow-hidden self-center justify-center">
      <input
        type="text"
        value={id}
        className="w-1/2 text-center text-amber-600 p-2 focus:outline-none  rounded-l-lg"
        onChange={(e) => setID(e.target.value)}
        placeholder="Enter ID"
      />

      <Link
        href={id ? `/timeline/${id}` : "#"}
        className="flex justify-center ">
        <button
          className={`bg-amber-500 text-white h-full p-2 rounded-r-lg
           `}>
          View
        </button>
      </Link>
    </div>
  );
}

export default ViewInputButton;
