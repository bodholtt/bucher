'use client'
import {FormEvent} from "react";
import {Item} from "@/types";
import {ObjectId} from "bson";


export default function CreateItemForm(props: { shelfID: ObjectId, addItem: Function }) {

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const i: Item = {
            name: formData.get("name") as string
        }

        const res = await fetch(`/api/shelves/${props.shelfID}/items`, {
            body: JSON.stringify(i),
            method: "POST",
        });

        const data = await res.json();
        const createdItem: Item = data.data;
        props.addItem(createdItem);
        form.reset();
    }

    return (
        <form onSubmit={onSubmit} className="customized-form p-4 rounded">
            <label>Create New Item</label>
            <input type="text" name="name" required placeholder="Item name"/>
            <button type="submit">Submit</button>
        </form>
    )
}