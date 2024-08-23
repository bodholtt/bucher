'use client'
import {useEffect, useState} from "react";
import Bookshelf from "@/components/shelf/Bookshelf";
import {Item, Shelf} from "@/types";
import {API_URL} from "@/app/common";
import ShelfDetails from "@/components/shelf/ShelfDetails";
import CreateItemForm from "@/components/CreateItemForm";
import BookshelfSkeleton from "@/components/shelf/BookshelfSkeleton";
import DetailsSkeleton from "@/components/shelf/DetailsSkeleton";

export default function ShelfPage({ params }: { params: { slug: string } }) {

    const [activeShelf, setActiveShelf] = useState<Shelf>();
    const [focusedItem, setFocusedItem] = useState<Item | null>(null);
    const [items, setItems] = useState<Item[] | null>(null);

    const addItem = (i: Item) => {
        if (!items) setItems([i])
        else setItems(items => [...items!, i])
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
            <div className="flex flex-col gap-2 max-w-full">
                { activeShelf && items ?
                    <>
                        <Bookshelf shelfID={activeShelf._id!} items={items}/>
                        <CreateItemForm shelfID={activeShelf._id!} addItem={addItem}/>
                    </>
                    :
                    <BookshelfSkeleton/>
                }
            </div>

            <div className="bg-emerald-200 rounded p-2 flex flex-col gap-2 max-w-full">
                {activeShelf ?
                    (focusedItem ?
                        <p>Item</p>
                        :
                        <ShelfDetails shelf={activeShelf}/>
                    )
                    :
                    <DetailsSkeleton/>
                }
            </div>
        </>
    );
}
