import React from "react";
import TimelineClient from "./timelineClient";
import {getObjectSignedUrl} from "@/utils/tigris/getImgURL";
import {EventType} from "../../../../types";
type Props = {
  events: EventType[];
};
async function TimelineServer({events}: Props) {
  // get URL for each img here and append.

  for (let event of events) {
    if (event.image) {
      event.imageUrl = await getObjectSignedUrl(event.image);
    }
  }
  console.log(events);
  // const rightEvents = events.filter((_, i: number) => i % 2 === 0);
  // const leftEvents = events.filter((_, i: number) => i % 2 !== 0);
  return <TimelineClient events={events} />;
}

export default TimelineServer;
