import {Shelf, InputShelf} from "@/types";
import dbConnect from "@/db/dbConnect";
import {ShelfModel} from "@/db/schema";
import {revalidateTag} from "next/cache";
import {Types as MongooseTypes} from "mongoose";
import {ObjectId} from "bson";

export async function GetShelf(id: string): Promise<Shelf | null> {
    await dbConnect();

    let s: Shelf | null;

    try {
        s = await ShelfModel.findById(id)
    } catch (err) {
        return null
    }
    return s
}

export async function GET(
    request: Request,
    { params }: { params: { slug: string } })
{

    const s = await GetShelf(params.slug);

    if (!s) {
        return Response.json({ error: "Shelf not found" }, { status: 404 })
    }

    return new Response(JSON.stringify({
        data: s
    }), {
        status: 200
    })
}

export async function DELETE(
    request: Request,
    { params }: { params: { slug: string } })
{
    await dbConnect();
    await ShelfModel.findByIdAndDelete(params.slug);

    revalidateTag('sidebar');

    return new Response(null, {
        status: 204
    })
}

export async function PUT(
    request: Request,
    { params }: { params: { slug: string } })
{

    const iShelf: InputShelf = await request.json();
    console.log(iShelf)

    let ids: ObjectId[] = [];
    if (iShelf.items) {
        ids = iShelf.items.map(s => MongooseTypes.ObjectId.createFromHexString(s));
    }

    let shelf: Shelf = {
        name: iShelf.name ?? undefined,
        description: iShelf.description ?? undefined,
        items: iShelf.items? ids : undefined
    };

    await dbConnect();
    await ShelfModel.findByIdAndUpdate(params.slug, shelf);

    revalidateTag('sidebar');

    return new Response(null, {
        status: 200
    })
}