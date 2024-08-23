import {GetShelf} from "@/app/api/shelves/[slug]/route";
import dbConnect from "@/db/dbConnect";
import {ItemModel, ShelfModel} from "@/db/schema";
import {Item} from "@/types";

/**
 * Get all the items in a shelf
 */
export async function GET(
    request: Request,
    { params }: { params: { slug: string } })
{

    const s = await GetShelf(params.slug);
    if (!s) return Response.json({ error: "Shelf not found" }, { status: 404 })

    const ids = s.items;
    if (!ids || ids.length === 0)
        return Response.json({ error: "No items in shelf" }, { status: 404 })

    await dbConnect();

    const items: Item[] = await ItemModel.find({
        '_id': { $in: ids }
    });

    items.sort((a,b) => {
        const aIndex = ids.indexOf(a._id!);
        const bIndex = ids.indexOf(b._id!);
        return aIndex - bIndex;
    });

    return Response.json({
        data: items
    }, {
        status: 200
    })
}

/**
 * Create a new item at this shelf
 */
export async function POST(
    request: Request,
    { params }: { params: { slug: string } }
) {

    const i: Item = await request.json();

    await dbConnect();
    const iModel = new ItemModel(i);
    const entry = await iModel.save();

    const s = await ShelfModel.findById(params.slug);
    s.items.push(entry._id);
    await s.save();

    return new Response(JSON.stringify({
        data: entry
    }), {
        status: 201
    });
}

/**
 * Delete shelf items from a list of Object IDs
 */
export async function DELETE() {
    return new Response(JSON.stringify("Not implemented"), {
        status: 500
    })
}
