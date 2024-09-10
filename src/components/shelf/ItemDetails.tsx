import {formats, Item} from "@/types";
import {API_URL} from "@/app/common";

export default function ItemDetails(props: { item: Item, toggleRefresh: Function, setFocusedItem: Function, shelfID: string }) {

    const handleUpdateItemDetails = async (e: React.MouseEvent) => {
        e.preventDefault();
        const form = document.getElementById("item-details-form") as HTMLFormElement;
        const formData = new FormData(form);

        const resetSpineColor = formData.get("resetSpineColor");
        const resetTextColor = formData.get("resetTextColor");

        const submit: Item = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            format: formData.get("format") as string,
            spineColor: (resetSpineColor == "on")? null : (formData.get("spineColor") as string),
            textColor: (resetTextColor == "on")? null : (formData.get("textColor") as string),
        }

        // anti pattern i dont care
        props.item.name = submit.name;
        props.item.description = submit.description;
        props.item.format = submit.format;
        props.item.spineColor = submit.spineColor;
        props.item.textColor = submit.textColor;

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
                       defaultValue={props.item.name}
                       name="name"
                />
                <textarea className="resize-none rounded p-2 bg-emerald-300 text-emerald-950 h-32"
                          placeholder="Description"
                          name="description"
                          defaultValue={props.item.description}
                />

                <div className="flex flex-col gap-1 justify-end">

                    <div className="flex items-center justify-end gap-1">
                        <label className="text-emerald-950">Format:</label>
                        <input type="text" name="format" list="formats"
                               className="text-emerald-950 bg-emerald-300 rounded px-1 py-0.5"
                               placeholder="Format" defaultValue={props.item.format}/>
                        <datalist id="formats">
                            {formats.map(format => (
                                <option label={format} key={format}/>
                            ))}
                        </datalist>
                    </div>

                    <div className="flex items-center justify-end gap-1">
                        <p className="text-emerald-950">Colors:</p>

                        <div className="grid bg-emerald-300 text-emerald-950 text-sm p-1 rounded gap-1"
                             style={{
                                 gridTemplateColumns: "auto auto auto"
                             }}>

                            <label>Spine:</label>
                            <input type="color" className="w-16 h-6" name="spineColor" id="spineColor"
                                   defaultValue={props.item.spineColor ?? undefined}/>
                            <label className="flex flex-row gap-1">
                                Reset:
                                <input type="checkbox" name="resetSpineColor"/>
                            </label>

                            <label>Text:</label>
                            <input type="color" className="w-16 h-6" name="textColor"
                                   defaultValue={props.item.textColor ?? undefined}/>
                            <label className="flex flex-row gap-1">
                                Reset:
                                <input type="checkbox" name="resetTextColor"/>
                            </label>

                        </div>

                    </div>

                </div>

                <div className="w-full flex justify-end gap-1">
                    <button type="reset"
                            title="Reset changes">
                        Reset
                    </button>
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