"use server";

import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";

async function getUser(username: string, password: string) {
  try {
    const supabase = createClient();
    let {data: User, error} = await supabase
      .from("Users")
      .select("*")
      .eq("username", username)
      .eq("password", password);
    console.log(User, "login data");
    if (error) {
      console.log(error);
      throw error;
    }
    if (User) return User[0];
  } catch (e) {
    console.log("Sign up Err", e);
    throw e;
  }
}
export default getUser;
