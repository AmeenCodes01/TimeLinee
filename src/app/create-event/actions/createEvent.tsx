"use server";
import {createClient} from "@/utils/supabase/server";
import {uploadFileToS3} from "@/utils/tigris/uploadFileToS3";
// import {redirect} from "next/dist/server/api-utils";

function generateUniqueFilename(file: File) {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = file?.name.split(".").pop();
  return `${timestamp}-${randomString}.${extension}`;
}

export const createEvent = async (
  userID: string,
  tId: string,
  event: FormData
) => {
  try {
    console.log(tId, "tId");
    const supabase = createClient();
    const title = event.get("title") as string;
    const description = event.get("desc") as string;
    const date = event.get("date") as string;
    const img = event.get("file") as File | null;

    if (img && img instanceof File) {
      const imgName = generateUniqueFilename(img);
      const buffer = Buffer.from(await img.arrayBuffer());

      const imgUpload = await uploadFileToS3(buffer, imgName);

      if (imgUpload) {
        console.log("img name", imgName);
        const {data: event, error} = await supabase
          .from("Event")
          .insert([
            {
              title,
              date: JSON.stringify(date),
              description,
              image: imgName,
              userID,
              tID: tId,
            },
          ])
          .select();

        if (error) throw error;
        console.log(event, "event");
        return event;
      }
    }
  } catch (e) {
    console.log("error in creating event", e);
  }
};
