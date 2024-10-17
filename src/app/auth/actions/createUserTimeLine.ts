"use server";

import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";

async function createUserTimeLine(username: string, password: string) {
  try {
    const supabase = createClient();
    const {data: user, error: userError} = await supabase
      .from("Users")
      .insert([{username, password}])
      .select();

    if (userError) {
      if (userError.code === "23505") {
        throw new Error("Username already exists");
      }
      throw userError;
    }

    const {data: timeline, error: timelineError} = await supabase
      .from("Timeline")
      .insert([{}])
      .select();

    if (timelineError) throw timelineError;

    const {data: user_tID, error: updateError} = await supabase
      .from("Users")
      .update({tId: timeline[0].id})
      .eq("id", user[0].id)
      .select();

    if (updateError) throw updateError;

    // Revalidate the path
    revalidatePath("/create-event");

    // Return the user data
    return user_tID[0];
  } catch (error) {
    console.error("Error in createUserTimeLine:", error);
    throw error;
  }
}

export default createUserTimeLine;
