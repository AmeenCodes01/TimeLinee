//timeline
import {createClient} from "@/utils/supabase/server";
import Timeline from "../component/timeline";
import {Tables} from "../../../../database.types";

async function page({params}: {params: {id: string}}) {
  type Event = Tables<"Event">;
  const {id} = params;
  const supabase = createClient();
  const {data, error} = await supabase
    .from("Event")
    .select("*")
    .eq("tID", id)
    .order("date", {ascending: false});
  if (error) throw Error;
  const events: Event[] = data ?? [];

  // console.log(events, "events  ");
  //fetch events
  return (
    <div className="w-full h-[100vh] flex flex-row overflow-hidden ">
      <div className="w-[100%]">
        <Timeline events={events} />
      </div>
    </div>
  );
}

export default page;
