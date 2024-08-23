import {Item} from "@/types";

/**
 * Item spine for displaying on a Bookshelf.
 * Uses Swapy for drag-and-drop capabilities.
 * @param props Takes an Item object.
 */
export default function ItemSpine(props: { item: Item, idx: number }) {
    return (
        <div data-swapy-slot={props.idx} className="w-8 h-48 max-h-48 grid place-items-end">
            <div className={`border-emerald-950 border-2 bg-emerald-700 text-topdown truncate py-2 w-full grid place-items-start min-h-28 max-h-full`}
                 data-swapy-item={props.item._id}>
                {props.item.name}
            </div>
        </div>
    )
}