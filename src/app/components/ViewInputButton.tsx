"use client";
import Link from "next/link";
import React, {useState} from "react";
import Button from "./Button";

function ViewInputButton() {
  const [id, setID] = useState("");
  return (
    <div className="flex flex-col">
      <Link href={`/timeline/${id}`} className="flex flex-col">
        <Button title="View" />
      </Link>
      <input
        type="text"
        value={id}
        className="w-[25px] self-center"
        onChange={(e) => setID(e.target.value)}
      />
    </div>
  );
}

export default ViewInputButton;
