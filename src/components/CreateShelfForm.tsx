'use client'
import {FormEvent, MouseEvent, MouseEventHandler} from "react";
import {Shelf} from "@/types";

export default function CreateShelfForm(props: { closeModal: (Function | null) }) {

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const s: Shelf = {
            name: formData.get("name") as string,
        }

        const res = await fetch(`/api/shelves`, {
            body: JSON.stringify(s),
            method: "POST",
        });

        const location = res.headers.get("Location");
        if (location) window.location.href = location;
    }

    const handleCloseModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (props.closeModal) props.closeModal();
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-row justify-between">
                <label>Create New Shelf</label>
                { props.closeModal &&
                    <a onClick={(e) => handleCloseModal(e)}
                       className="w-6 h-6 bg-red-600 text-white rounded flex items-center justify-center"
                    >&#10761;</a>
                }
            </div>
            <input type="text" name="name" required placeholder="Shelf Name"/>
            <button type="submit">Submit</button>
        </form>
    )
}