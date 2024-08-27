import {Item} from "@/types";
import {useEffect, useState} from "react";
import {API_URL} from "@/app/common";

export default function ItemDetails(props: { item: Item, toggleRefresh: Function, setFocusedItem: Function, shelfID: string }) {

    const [itemDetails, setItemDetails] = useState<Item>();

    useEffect(() => {
        setItemDetails(props.item);
    }, [props.item]);

    const handleUpdateItemDetails = async (e: React.MouseEvent) => {
        e.preventDefault();
        const form = document.getElementById("item-details-form") as HTMLFormElement;
        const formData = new FormData(form);
        const submit: Item = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
        }

        // // anti pattern i dont care
        props.item.name = submit.name;
        props.item.description = submit.description;

        const res = await fetch(`${API_URL}/items/${props.item._id}`, {
            method: "PUT",
            body: JSON.stringify(submit),
        });

        if (res.ok) {
            console.log("Updated item details");
            props.toggleRefresh();
        }
    }

    const handleDeleteItem = async () => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        const res = await fetch(`${API_URL}/shelves/${props.shelfID}/items/`, {
            method: "DELETE",
            body: JSON.stringify([props.item._id])
        });
        if (res.ok) props.setFocusedItem(null);

    }

    return (
        <>
            <form className="w-full flex flex-col gap-2" id="item-details-form">
                <input type="text" className="text-3xl font-semibold text-emerald-950 bg-transparent rounded"
                       defaultValue={itemDetails?.name}
                       name="name"
                />
                <textarea className="resize-none rounded p-2 bg-emerald-300 text-emerald-950 h-32"
                          placeholder="Description"
                          name="description"
                          defaultValue={itemDetails?.description}
                />
                <div className="w-full flex justify-end">
                    <button onClick={(e) => handleUpdateItemDetails(e)}
                            title="Submit changes to shelf details">
                        Submit
                    </button>
                </div>
            </form>
            <div className="w-full h-full flex items-end justify-end">
                <button onClick={handleDeleteItem} title="Delete Shelf">Delete Item</button>
            </div>
        </>
    )
}