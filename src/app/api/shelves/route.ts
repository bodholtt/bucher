import {Shelf} from "@/types";
import dbConnect from "@/db/dbConnect";
import mongoose from "mongoose";
import {ShelfModel} from "@/db/schema";
import {NextResponse} from "next/server";
import {revalidateTag} from "next/cache";

/**
 * Get all the shelves' names and IDs
 */
export async function GET(request: Request) {

    await dbConnect();
    if (!mongoose.connection.readyState)
        return Response.json({
            error: "Failed to connect to db"
        });

    const shelves: Shelf[] = await ShelfModel.find({}, "_id, name");

    return NextResponse.json({
        data: shelves
    }, {
        status: 200
    })
}

/**
 * Create a new shelf and respond with the location
 */
export async function POST(request: Request) {

    // you should probably add error checking bro

    await dbConnect();
    if (!mongoose.connection.readyState) // and i dont think this actually does anything
        return Response.json({
            error: "Failed to connect to db"
        });

    const s: Shelf = await request.json();
    const sModel = new ShelfModel(s);

    const entry = await sModel.save();

    revalidateTag('sidebar');

    return new Response(null, {
        status: 201,
        headers: {
            "Location": `/shelf/${entry._id}`
        },
    });
}