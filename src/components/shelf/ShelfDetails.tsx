import {Shelf} from "@/types";
import {API_URL} from "@/app/common";

export default function ShelfDetails(props: { shelf: Shelf, setActiveShelf: Function }) {

    const deleteShelf = async () => {
        if (confirm("Are you sure you want to delete this shelf?")) {
            const res = await fetch(`${API_URL}/shelves/${props.shelf._id}`, {
                method: "DELETE",
            });
            if (res.ok) window.location.href = "/";
        }
    }

    const handleUpdateShelfDetails = async (e: React.MouseEvent) => {
        e.preventDefault();
        const form = document.getElementById("shelf-details-form") as HTMLFormElement;
        const formData = new FormData(form);
        const submit: Shelf = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
        }

        let updatedShelfDetails = props.shelf;
        updatedShelfDetails.name = submit.name;
        updatedShelfDetails.description = submit.description;

        const res = await fetch(`${API_URL}/shelves/${props.shelf._id}`, {
            method: "PUT",
            body: JSON.stringify(submit),
        });

        if (res.ok) {
            console.log("Updated shelf details");
            props.setActiveShelf(updatedShelfDetails);
        }
    }

    return (
        <>
            <form className="w-full flex flex-col gap-2" id="shelf-details-form">
                <input type="text" className="text-3xl font-semibold text-emerald-950 bg-transparent rounded"
                       defaultValue={props.shelf.name}
                       name="name"
                />
                <textarea className="resize-none rounded p-2 bg-emerald-300 text-emerald-950 h-32"
                          placeholder="Description"
                          name="description"
                          defaultValue={props.shelf.description}
                />
                <div className="w-full flex justify-end">
                    <button onClick={(e) => handleUpdateShelfDetails(e)}
                            title="Submit changes to shelf details">
                        Submit
                    </button>
                </div>
            </form>
            <div className="w-full h-full flex items-end justify-end">
                <button onClick={deleteShelf} title="Delete Shelf">Delete Shelf</button>
            </div>
        </>
    )
}