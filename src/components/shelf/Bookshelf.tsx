'use client'
import { createSwapy } from 'swapy';
import {useEffect} from "react";
import ItemSpine from "@/components/shelf/ItemSpine";
import {Item} from "@/types";
import {ObjectId} from "bson";
import {debounce} from "next/dist/server/utils";

export default function Bookshelf(props: { shelfID: ObjectId, items: Item[], setFocusedItem: Function }) {

    // TODO: Add functionality to drag and drop new items when they are added without refresh
    // needs swapy update (or just a different drag and drop tool)

    const updateItemOrder = async (itemOrder: string[]) => {
        await fetch(`/api/shelves/${props.shelfID}`, {
            body: JSON.stringify({
                items: itemOrder
            }),
            method: "PUT",
        });
    }

    const handleSwap = (data: any) => {
        const reorderedItemIDs =
            Object.keys(data.object).map(
                key => data.object[key]!
            );
        updateItemOrder(reorderedItemIDs);
    }
    const debouncedHandleSwap = debounce(handleSwap, 1000); // so i dont murder the backend

    useEffect(() => {

        const container = document.querySelector('#bookshelf');

        if ((props.items.length != 0) && container) {
            const swapy = createSwapy(container, {
                animation: 'none' // animations get laggy with a lot of items
            });
            swapy.onSwap(({ data }) => debouncedHandleSwap(data));
        }

    }, [props.items]);

    return (
        <div className="bg-emerald-200 p-2 rounded flex w-full flex-row gap-1 min-h-52 flex-wrap items-end justify-start gap-x-0.5 gap-y-8"
             id="bookshelf"
             onDoubleClick={() => props.setFocusedItem(null)}>

            {props.items.map((item, idx) => (
                <ItemSpine item={item} idx={idx} key={idx} setFocusedItem={props.setFocusedItem} />
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