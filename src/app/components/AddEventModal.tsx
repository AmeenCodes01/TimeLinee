"use client";
import {useRouter, useSearchParams} from "next/navigation";
import {useState, useEffect} from "react";
import {createEvent} from "../create-event/actions/createEvent";
type Props = {
  tID?: string;
};

function AddEventModal({tID}: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const [auth, setAuth] = useState(localStorage.getItem("authUser") !== null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    localStorage.getItem("authUser") ? null : router.push("/auth");
  }, []);

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const user = localStorage.getItem("authUser");
    if (user) {
      setAuth(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", JSON.stringify(date));
      formData.append("desc", desc);
      file ? formData.append("file", file) : null;

      const eventCreate = await createEvent(
        JSON.parse(user).id,
        params.get("id") ? params.get("id") : JSON.parse(user).tId,
        formData
      );
      if (eventCreate) {
        console.log("event CREATED    ");
        router.push(
          `/timeline/${
            params.get("id") ? params.get("id") : JSON.parse(user).tId
          }`
        );
      }
    } else {
      //   setAuth(false);
      router.push("/auth");
      //send event Data. through URL? or
    }
    //check user in ls

    //if user in ls, send data to api with userId and timelineId

    //if not, show auth modal.

    //after login/signup , send data to sercver
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  console.log(file, "file", date, " date");
  return (
    <div className="flex relative">
      <form
        className={`flex flex-col gap-4 text-slate-500 focus:outline-none drop-shadow-xl`}
        //onSubmit={onSubmit}
      >
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          className="border-2 p-1 focus:outline-none rounded-sm "
        />
        {/* date */}
        <input
          type="date"
          id="date"
          name="date"
          className="border-2 py-1 focus:outline-none rounded-sm "
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          className="border-2 p-2 text-wrap h-auto focus:outline-none rounded-sm"
          id="description"
          placeholder="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-xs font-serif"
        />
        <button
          type="submit"
          onClick={(e) => onSubmit(e)}
          className="bg-amber-200 rounded-sm text-amber-800">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddEventModal;
