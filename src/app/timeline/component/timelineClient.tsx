"use client";

import React, {useState, useMemo} from "react";
import EventsComp from "./client/EventsComp";
import {EventType} from "../../../../types";
import AddEventButton from "./AddEventButton";
import {AnimatePresence} from "framer-motion";
import Image from "next/image";
import ErrorWatch from "../watch-error.png";
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

  //get list of events of upcoming week
  const oneWeekAhead = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }, []);

  const eventsThisWeek = useMemo(() => {
    return events.filter(
      (event) => new Date(event.date as string) <= oneWeekAhead
    );
  }, [events, oneWeekAhead]);
  console.log(eventsThisWeek, oneWeekAhead, "events thsi week");

  const visibleEvents = events.slice(startIndex, startIndex + 5);
  const rightEvents = visibleEvents.filter((_, i) => i % 2 === 0);
  const leftEvents = visibleEvents.filter((_, i) => i % 2 !== 0);

  const handleScroll = (direction: string) => {
    if (direction === "down" && startIndex + 5 < events.length) {
      setStartIndex(startIndex + 5);
      setDescIndex(null);
    } else if (direction === "up" && startIndex - 5 >= 0) {
      setStartIndex(startIndex - 5);
      setDescIndex(null);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 from-40% to-amber-300 to-90% w-full h-full flex justify-center items-center text-black relative md:flex-row flex-col pt-4 md:pt-0 ">
      {/* <div className="w-[10%] h-full border-2 items-center justify-end absolute"> */}
      <AddEventButton />
      {/* </div> */}
      {/* Description/Image */}
      <div className="md:w-[15%] hidden h-full  p-2 gap-2 md:flex flex-col">
        <h2 className="text-amber-800">Events This Week</h2>
        {eventsThisWeek
          ? eventsThisWeek.map((event, i: number) => (
              <div
                className=" flex flex-row justify-between text-center "
                key={i}>
                <p className="text-xs  text-center self-center font-thin text-amber-700 bg-amber-400 px-4 ">
                  {event.title}
                </p>
                <p className="text-xs font-thin text-amber-700 bg-amber-400 p-1 ">
                  {event.date}
                </p>
              </div>
            ))
          : null}
      </div>

      <div className="flex flex-row w-[55%] h-full items-centre justify-center">
        {/* Left events */}
        <div className="  h-full w-fit max-w-[26%] justify-stretch flex justify-items-stretch  ">
          <AnimatePresence>
            <EventsComp
              data={leftEvents}
              side="left"
              single={
                rightEvents.length <= 1 && leftEvents.length <= 1 ? true : false
              }
              setDescIndex={setDescIndex}
            />
          </AnimatePresence>
        </div>
        {/* Stem */}
        <div
          className="h-full w-[20px] rounded-sm bg-amber-500 flex
           shadow-[inset_1px_1px_1px_1px_rgb(180_83_9_/_0.05)]
           border-r-2 border-r-amber-600
        shadow-amber-200 "></div>

        {/* Right events */}
        <div className=" h-full w-fit max-w-[26%] justify-stretch flex justify-items-stretch  ">
          <AnimatePresence>
            <EventsComp
              data={rightEvents}
              side="right"
              setDescIndex={setDescIndex}
            />
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 transform  flex flex-col items-center space-y-2">
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
      <div className="w-[30%]  h-full   flex  items-center justify-center">
        {descIndex !== null ? (
          <div className="flex justify-center flex-col items-center  ">
            <p className="text-md italic text-amber-800 font-sans font-extralight space-x-3 text-center">
              {descIndex.side == "right"
                ? rightEvents[descIndex.index]?.description
                : leftEvents[descIndex.index]?.description}
            </p>
            <Image
              className="border-2 mt-5 border-dashed p-[1px] w-[90%] self-center justify-center flex border-amber-700 rounded-sm "
              src={
                (descIndex.side === "right"
                  ? rightEvents[descIndex.index]?.imageUrl
                  : leftEvents[descIndex.index]?.imageUrl) ?? ErrorWatch
              }
              width={250}
              height={250}
              alt=""
            />
          </div>
        ) : (
          <span className="text-xs italic text-amber-700 font-extralight">
            Click on event to see description
          </span>
        )}
      </div>
    </div>
  );
}

export default TimelineClient;
