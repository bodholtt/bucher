'use client'
import { createSwapy } from 'swapy';
import {useEffect} from "react";
import ItemSpine from "@/components/shelf/ItemSpine";
import {Item} from "@/types";
import {ObjectId} from "bson";

export default function Bookshelf(props: { shelfID: ObjectId, items: Item[] }) {

    // TODO: 1. Add functionality to drag and drop new items when they are added without refresh
    // TODO: 2. Make it so updateItemOrder is only called upon the user dropping the item on the page, and not whenever a swap occurs.
    // both probably need new features from swapy

    const updateItemOrder = async (itemOrder: string[]) => {
        await fetch(`/api/shelves/${props.shelfID}`, {
            body: JSON.stringify({
                items: itemOrder
            }),
            method: "PUT",
        });
    }

    useEffect(() => {

        const container = document.querySelector('#bookshelf');
        const initSwapy = () => {
            if (container) {
                const swapy = createSwapy(container, {
                    animation: 'dynamic'
                });
                swapy.onSwap(({ data }) => {
                    const reorderedItemIDs =
                        Object.keys(data.object).map(
                            key => data.object[key]!
                        );
                    console.log(reorderedItemIDs);
                    updateItemOrder(reorderedItemIDs);
                });
            }
        }

        if (props.items.length != 0) initSwapy();

    }, [props.items]);


    return (
        <div className="bg-emerald-200 p-2 rounded flex w-full flex-row gap-1 min-h-fit flex-wrap items-end justify-start gap-x-0.5 gap-y-8"
             id="bookshelf">

            {props.items.map((item, idx) => (
                <ItemSpine item={item} idx={idx} key={idx} />
            ))}

        </div>
    )
}