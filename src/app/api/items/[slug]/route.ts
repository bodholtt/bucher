import {Item} from "@/types";
import dbConnect from "@/db/dbConnect";
import {ItemModel} from "@/db/schema";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } })
{

    return new Response(JSON.stringify("Not implemented"), {
        status: 200
    });
}

export async function DELETE(
    request: Request,
    { params }: { params: { slug: string } })
{

    return new Response(JSON.stringify("Not implemented"), {
        status: 200
    });
}

export async function PUT(
    request: Request,
    { params }: { params: { slug: string } })
{
    const iItem: Item = await request.json();
    console.log(iItem);

    await dbConnect();
    await ItemModel.findByIdAndUpdate(params.slug, iItem);

    return new Response(null, {
        status: 200
    });
}