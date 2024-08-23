'use client'
import {useEffect, useState} from "react";
import Bookshelf from "@/components/shelf/Bookshelf";
import {Item, Shelf} from "@/types";
import {API_URL} from "@/app/common";
import LoadingWheel from "@/components/LoadingWheel";
import ShelfDetails from "@/components/shelf/ShelfDetails";
import CreateItemForm from "@/components/CreateItemForm";

export default function ShelfPage({ params }: { params: { slug: string } }) {

    const [activeShelf, setActiveShelf] = useState<Shelf>();
    const [focusedItem, setFocusedItem] = useState<Item>()
    const [items, setItems] = useState<Item[]>([]);

    const addItem = (i: Item) => {
        setItems(items => [...items, i])
    }

    const getItems = async () => {
        const res = await fetch(`${API_URL}/shelves/${params.slug}/items`)
        if (!res.ok) return [];
        const items: Item[] = (await res.json()).data;
        return items;
    }

    useEffect(() => {

        const getShelf = async () => {
            const res = await fetch(`${API_URL}/shelves/${params.slug}`)
            if (!res.ok) return;
            const shelf: Shelf = (await res.json()).data;
            return shelf;
        }

        getShelf().then(s => setActiveShelf(s));
        getItems().then(i => setItems(i));

    }, [])


    // MAYBE USE CONTEXT FOR SHELF ID?
    return (
        <>
            { activeShelf ?
                <div className="flex flex-col gap-2 max-w-full">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-3xl font-semibold text-emerald-950">{activeShelf.name}</h2>
                        <button>Edit Shelf</button>
                    </div>
                    <Bookshelf shelfID={activeShelf._id!} items={items}/>
                    <CreateItemForm shelfID={activeShelf._id!} addItem={addItem}/>
                </div>
                : <LoadingWheel/>
            }

            <div className="bg-emerald-200 rounded p-2 flex flex-col gap-2 max-w-full">
                {activeShelf &&
                    <ShelfDetails shelf={activeShelf}/>
                }
            </div>
        </>
    );
}
