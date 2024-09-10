'use client'
import { Swapy, createSwapy } from 'swapy';
import {useEffect, useRef} from "react";
import ItemSpine from "@/components/shelf/ItemSpine";
import {Item, Shelf} from "@/types";
import {debounce} from "next/dist/server/utils";

export default function Bookshelf(props: { shelf: Shelf, items: Item[], setFocusedItem: Function }) {

    // https://github.com/TahaSh/swapy/blob/main/examples/react-dynamic/App.tsx
    // maybe do swapy manual swap

    const swapyRef = useRef<Swapy | null>(null)

    const handleSwap = async (data: any) => {
        const reorderedItemIDs: string[] =
            Object.keys(data.object).map(
                key => data.object[key]!
            );

        await fetch(`/api/shelves/${props.shelf._id!}`, {
            body: JSON.stringify({
                items: reorderedItemIDs
            }),
            method: "PUT",
        });
    }
    // debounce so that we can still have the items move with the default swapy mode, but only send a
    // max of 1 request per second to the backend
    const debouncedHandleSwap = debounce(handleSwap, 1000);

    useEffect(() => {

        const container = document.querySelector('#bookshelf');

        if ((props.items.length != 0) && container) {

            // if an item is swapped then its details are changed, the item jumps back to its position, but
            // stays in the new position upon refresh.

            // colors don't work when swapy is enabled

            swapyRef.current = createSwapy(container, {
                animation: 'dynamic'
            });
            swapyRef.current.onSwap(({ data }) => debouncedHandleSwap(data));

            return () => {
                swapyRef.current?.destroy();
            }

        }

    }, [props.items]);

    return (
        <div className="bg-emerald-200 p-2 rounded flex w-full flex-col gap-1"
             id="bookshelf"
             onDoubleClick={() => props.setFocusedItem(null)}>

            {/*<div className="flex justify-between p-0.5 rounded border border-emerald-950 items-center">*/}
            {/*    <p className="text-emerald-950">{props.shelf.name}</p>*/}
            {/*    <button id="reorder-toggle">Enable Re-ordering</button>*/}
            {/*</div>*/}

            <div className="flex w-full flex-row gap-1 min-h-50 flex-wrap items-end justify-start gap-x-0.5 gap-y-8">
            {props.items.map((item, idx) => (
                <ItemSpine item={item} idx={idx} key={item._id!.toString()} setFocusedItem={props.setFocusedItem} />
            ))}
            </div>

            {props.items.length == 0 && (
                <div className="flex flex-col items-start">
                    <p className="text-emerald-950 text-2xl">No items</p>
                    <p className="text-emerald-950 text-sm">Add an item using the form below</p>
                </div>
            )}

        </div>
    )
}