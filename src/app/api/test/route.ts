import * as mongoose from "mongoose";
import {ShelfModel} from "@/db/schema";
import dbConnect from "@/db/dbConnect";

export async function GET(request: Request) {
    await dbConnect();
    if (!mongoose.connection.readyState)
        return Response.json("Failed to connect to db");


    const s = new ShelfModel({
        name: "shelf 1",
        description: "test description"
    })

    await s.save();

    return Response.json(s);
}