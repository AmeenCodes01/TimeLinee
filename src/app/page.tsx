import Button from "./components/Button";
import Link from "next/link";
import ViewInputButton from "./components/ViewInputButton";

export default function Home() {
  return (
    <div className="w-full h-full bg-gradient-to-r from-amber-600 from-10% to-amber-200 to-90% items-center justify-center flex flex-col">
      <p className="md:text-6xl text-4xl text-amber-700 font-extrabold">
        TimeLinee
      </p>
      <div className="flex-row mt-6 flex gap-2 ">
        <ViewInputButton />
        <Link href="/create-event">
          <Button title="Create" />
        </Link>
      </div>
    </div>
  );
}
