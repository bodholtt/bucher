import {Item} from "@/types";

/**
 * Item spine for displaying on a Bookshelf.
 * Uses Swapy for drag-and-drop capabilities.
 * @param props Takes an Item object.
 */
export default function ItemSpine(props: { item: Item, idx: number, setFocusedItem: Function }) {

    const handleItemDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        props.setFocusedItem(props.item);
    }

    return (
        <div data-swapy-slot={props.idx} className="w-8 h-48 max-h-48 grid place-items-end">

            <div className={`${!props.item.spineColor && `bg-emerald-700`} border-emerald-950 border-2 hover:opacity-90 text-topdown truncate py-2 w-full grid place-items-start min-h-28 max-h-full select-none cursor-pointer`}
                 style={{
                     backgroundColor: props.item.spineColor ?? undefined,
                     color: props.item.textColor ?? undefined,
                 }}
                 onDoubleClick={(e) => handleItemDoubleClick(e)}
                 data-swapy-item={props.item._id}>
                {props.item.name}
            </div>

        </div>
    )
}