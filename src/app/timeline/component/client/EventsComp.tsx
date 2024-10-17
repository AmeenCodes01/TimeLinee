"use client";
import {EventType} from "../../../../../types";
import {motion} from "framer-motion";

type DetailsProps = {
  index: number;
  side: string;
};

interface AuthUser {
  id: string;
  // Add other properties of the auth user object if needed
}

type Props = {
  side: string;
  setDescIndex: React.Dispatch<React.SetStateAction<DetailsProps | null>>;
  data: EventType[];
};
const authUserString = localStorage.getItem("authUser");
const userId: string | null = authUserString
  ? (JSON.parse(authUserString) as AuthUser).id
  : null;
function EventsComp({data, side, setDescIndex}: Props) {
  return (
    <>
      {data.map((event: EventType, i: number) => (
        <motion.div
          key={i}
          initial={{opacity: 0, x: 50}}
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: 50}}
          className={`
            self-end justify-self-end border-[1px] border-amber-300
rounded-lg
            w-full  flex ${
              side == "right" ? "flex-row" : "flex-row-reverse"
            } mb-40 ${side == "right" ? "mt-40" : null}`}>
          <motion.div
            style={{
              background: "linear-gradient(to left, #fff, #d97706)",
              backgroundSize: "200% 100%",
            }}
            className="w-full min-w-[100px] h-[5px] self-center"></motion.div>
          <div
            className="flex flex-col py-1
                        bg-gradient-to-t from-amber-600 from-10% to-amber-200 to-90%  
                        px-4
                   shadow-inner shadow-amber-200 rounded-lg
            
            "
            onClick={() => setDescIndex({index: i, side})}
            onMouseEnter={() => setDescIndex({index: i, side})}>
            <p className="text-md text-center text-nowrap w-full  text-amber-800 font-mono">
              {event?.title}
            </p>
            <p>{JSON.stringify(event.tID) === userId ? null : event.userID}</p>
            <p className="text-sm italic pt-3 text-amber-300">{event?.date}</p>
          </div>
        </motion.div>
      ))}
    </>
  );
}

export default EventsComp;
