import {Shelf} from "@/types";
import {API_URL} from "@/app/common";

export default function ShelfDetails(props: { shelf: Shelf }) {

    const deleteShelf = async () => {
        if (confirm("Are you sure you want to delete this shelf?")) {
            const res = await fetch(`${API_URL}/shelves/${props.shelf._id}`, {
                method: "DELETE",
            });
            if (res.ok) window.location.href = "/";
        }
    }

    return (
        <>
            <input type="text" className="text-3xl font-semibold text-emerald-950 bg-transparent rounded"
                   defaultValue={props.shelf.name}/>
            <textarea className="resize-none rounded p-2 bg-emerald-300 text-emerald-950 h-32"
                      placeholder="Description"
                      defaultValue={props.shelf.description}
            />
            <button onClick={deleteShelf}>Delete Shelf</button>
        </>
    )
}