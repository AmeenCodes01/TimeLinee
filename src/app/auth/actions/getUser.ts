"use server";

import {createClient} from "@/utils/supabase/server";
async function getUser(username: string, password: string) {
  try {
    const supabase = createClient();
    const {data: User, error} = await supabase
      .from("Users")
      .select("*")
      .eq("username", username);
    console.log(User, "login data");
    if (error) {
      throw new Error(error.message);
    }
    if (User.length === 0) {
      throw new Error("User does not exist");
    }

    if (User.length > 0 && User.password !== password) {
      throw new Error("Password is incorrect");
    }

    return User[0];
  } catch (error: unknown) {
    console.log("LOGIN Err", error);
    return {error: error.message};
  }
}
export default getUser;
