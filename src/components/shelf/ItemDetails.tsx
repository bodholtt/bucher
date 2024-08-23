import {Item} from "@/types";
import {useEffect, useState} from "react";

export default function ItemDetails(props: { item: Item }) {

    const [itemName, setItemName] = useState<string>("");
    const [itemDescription, setItemDescription] = useState<string>("");

    useEffect(() => {
        setItemName(props.item.name);
        props.item.description && setItemDescription(props.item.description);
    }, [props.item]);

    return (
        <>
            <input type="text" className="text-3xl font-semibold text-emerald-950 bg-transparent rounded"
                   defaultValue={itemName}/>
            <textarea className="resize-none rounded p-2 bg-emerald-300 text-emerald-950 h-32"
                      placeholder="Description"
                      defaultValue={itemDescription}
            />
            {/*<button onClick={deleteShelf}>Delete Shelf</button>*/}
        </>
    )
}