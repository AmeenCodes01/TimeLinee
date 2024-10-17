import {Tables} from "./database.types";

export type EventType = Tables<"Event"> & {imageUrl?: string};
