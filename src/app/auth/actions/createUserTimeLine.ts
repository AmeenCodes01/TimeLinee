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
      throw new Error(
        userError.message || "An error occurred while creating the user."
      );
    }

    const {data: timeline, error: timelineError} = await supabase
      .from("Timeline")
      .insert([{}])
      .select();

    if (timelineError) {
      throw new Error(
        timelineError.message ||
          "An error occurred while creating the timeline."
      );
    }

    const {data: user_tID, error: updateError} = await supabase
      .from("Users")
      .update({tId: timeline[0].id})
      .eq("id", user[0].id)
      .select();

    if (updateError) {
      throw new Error(
        updateError.message || "An error occurred while signing in."
      );
    }

    // Revalidate the path
    revalidatePath("/create-event");

    // Return the user data
    return user_tID[0];
  } catch (error: unknown) {
    console.error("Error in createUserTimeLine:", error);
    // Return the error object with a descriptive message
    return {error: error.message};
  }
}

export default createUserTimeLine;
