'use client'
import { createSwapy } from 'swapy';
import {useEffect} from "react";
import ItemSpine from "@/components/shelf/ItemSpine";
import {Item} from "@/types";
import {ObjectId} from "bson";

export default function Bookshelf(props: { shelfID: ObjectId, items: Item[], setFocusedItem: Function }) {

    // TODO: Add functionality to drag and drop new items when they are added without refresh
    // needs swapy update (or just a different drag and drop tool)

    const updateOrderBackend = async (itemIDs: string[]) => {
        await fetch(`/api/shelves/${props.shelfID}`, {
            body: JSON.stringify({
                items: itemIDs
            }),
            method: "PUT",
        });
    }

    const handleSwap = (data: any) => {
        const reorderedItemIDs: string[] =
            Object.keys(data.object).map(
                key => data.object[key]!
            );

        updateOrderBackend(reorderedItemIDs);
    }

    useEffect(() => {

        const container = document.querySelector('#bookshelf');

        if ((props.items.length != 0) && container) {

            // swapping is buggy when an item has its details changed

            const swapy = createSwapy(container, {
                animation: 'none', // animations get laggy with a lot of items
                continuousMode: false // no point in tracking while user still holding item
            });
            swapy.onSwap(({ data }) => handleSwap(data));
        }

    }, [props.items]);

    return (
        <div className="bg-emerald-200 p-2 rounded flex w-full flex-row gap-1 min-h-52 flex-wrap items-end justify-start gap-x-0.5 gap-y-8"
             id="bookshelf"
             onDoubleClick={() => props.setFocusedItem(null)}>

            {props.items.map((item, idx) => (
                <ItemSpine item={item} idx={idx} key={item._id!.toString()} setFocusedItem={props.setFocusedItem} />
            ))}

            {props.items.length == 0 && (
                <div className="flex flex-col items-start">
                    <p className="text-emerald-950 text-2xl">No items</p>
                    <p className="text-emerald-950 text-sm">Add an item using the form below</p>
                </div>
            )}

        </div>
    )
}