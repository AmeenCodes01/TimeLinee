"use client";
import {useEffect} from "react";
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
  single?: boolean;
};

function EventsComp({data, side, setDescIndex, single}: Props) {
  let userId: string | null;
  useEffect(() => {
    const authUserString = localStorage.getItem("authUser");
    userId = authUserString
      ? (JSON.parse(authUserString) as AuthUser).id
      : null;
  }, []);

  return (
    <div
      className={`flex flex-col gap-28 w-full h-full ${
        single ? "mt-40" : ""
      }  justify-evenly  `}>
      {data.map((event: EventType, i: number) => (
        <motion.div
          key={i}
          initial={{opacity: 0, x: side === "left" ? 10 : -10}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 2}}
          exit={{opacity: 0, x: side === "left" ? 10 : -10}}
          className={`flex  ${
            side === "left" ? " flex-row-reverse" : " mb-auto mt-auto flex-row"
          } items-center`}>
          <div
            className="w-[15px] bg-amber-800 h-[5px]"
            style={{
              backgroundSize: "200% 100%",
            }}></div>
          <div
            className="flex flex-col py-1 bg-gradient-to-t from-amber-600 from-20% to-amber-400 to-80%  w-full 
                       px-2 md:min-w-[180px]   items-center justify-center
                       shadow-inner shadow-amber-200 cursor-pointer"
            onClick={() => setDescIndex({index: i, side})}
            //onMouseEnter={() => setDescIndex({ index: i, side })}
          >
            <p className="text-md self-center text-center text-wrap w-full text-amber-800 font-serif">
              {event?.title?.trim()}
            </p>
            <p className="text-[10px] text-orange-700 font-bold pt-1">
              {JSON.stringify(event.tID) === userId ? null : event.userID}
            </p>
            <p className="text-xs italic pt-3 text-amber-300">{event?.date}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default EventsComp;
