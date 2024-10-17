"use client";

import React, {useState} from "react";
import EventsComp from "./client/EventsComp";
import {EventType} from "../../../../types";
import AddEventButton from "./AddEventButton";
import {AnimatePresence} from "framer-motion";

type Props = {
  events: EventType[];
};

type DetailsProps = {
  index: number;
  side: string;
};

function TimelineClient({events}: Props) {
  const [descIndex, setDescIndex] = useState<DetailsProps | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  const visibleEvents = events.slice(startIndex, startIndex + 5);
  const rightEvents = visibleEvents.filter((_, i) => i % 2 === 0);
  const leftEvents = visibleEvents.filter((_, i) => i % 2 !== 0);

  const handleScroll = (direction: string) => {
    if (direction === "down" && startIndex + 5 < events.length) {
      setStartIndex(startIndex + 5);
    } else if (direction === "up" && startIndex - 5 >= 0) {
      setStartIndex(startIndex - 5);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 from-40% to-amber-300 to-90% w-full h-full flex justify-center items-center text-black relative">
      {/* <div className="w-[10%] h-full border-2 items-center justify-end absolute"> */}
      <AddEventButton />
      {/* </div> */}
      {/* Description/Image */}
      <div className="w-[15%] h-full "></div>

      <div className="flex flex-row w-[55%] h-full items-centre justify-center">
        {/* Left events */}
        <div className=" h-full w-fit max-w-[26%] pt-[30px] items-end self-end  justify-self-end ">
          <AnimatePresence>
            <EventsComp
              data={leftEvents}
              side="left"
              setDescIndex={setDescIndex}
            />
          </AnimatePresence>
        </div>
        {/* Stem */}
        <div
          className="h-full w-[3%] rounded-sm bg-amber-500 flex
           shadow-[inset_1px_1px_1px_1px_rgb(180_83_9_/_0.05)]
         
        shadow-amber-200 "></div>

        {/* Right events */}
        <div className=" h-full w-fit max-w-[26%]">
          <EventsComp
            data={rightEvents}
            side="right"
            setDescIndex={setDescIndex}
          />
        </div>
      </div>
      <div className="absolute bottom-4 right-2 transform  flex flex-col items-center space-y-2">
        <button
          onClick={() => handleScroll("up")}
          className="size-10 text-2xl text-white  bg-amber-600 rounded-full shadow-md"
          disabled={startIndex === 0}>
          ^
        </button>
        <button
          onClick={() => handleScroll("down")}
          className="size-10 text-2xl text-white  bg-amber-600 rounded-full shadow-md rotate-180"
          disabled={startIndex + 5 >= events.length}>
          ^
        </button>
      </div>
      <div className="w-[30%]  h-full border-2  flex">
        {descIndex !== null ? (
          <div className="flex justify-center flex-col items-center  ">
            <p className="text-md italic text-amber-800 font-sans font-extralight space-x-3 text-center">
              {descIndex.side == "right"
                ? rightEvents[descIndex.index]?.description
                : leftEvents[descIndex.index]?.description}
            </p>
            <img
              className="border-2 mt-5 border-dashed p-[1px] w-[90%] self-center flex border-amber-700 rounded-sm "
              src={
                descIndex.side == "right"
                  ? rightEvents[descIndex.index]?.imageUrl
                  : leftEvents[descIndex.index]?.imageUrl
              }
              alt=""
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TimelineClient;
