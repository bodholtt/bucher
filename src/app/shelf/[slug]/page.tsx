'use client'
import {useEffect, useState} from "react";
import Bookshelf from "@/components/shelf/Bookshelf";
import {Item, Shelf} from "@/types";
import {API_URL} from "@/app/common";
import ShelfDetails from "@/components/shelf/ShelfDetails";
import CreateItemForm from "@/components/CreateItemForm";
import BookshelfSkeleton from "@/components/shelf/BookshelfSkeleton";
import DetailsSkeleton from "@/components/shelf/DetailsSkeleton";
import ItemDetails from "@/components/shelf/ItemDetails";
import {notFound} from "next/navigation";

export default function ShelfPage({ params }: { params: { slug: string } }) {

    const [activeShelf, setActiveShelf] = useState<Shelf>();
    const [focusedItem, setFocusedItem] = useState<Item | null>(null);
    const [items, setItems] = useState<Item[] | null>(null);

    const [noShelfFound, setNoShelfFound] = useState(false);

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

        getShelf().then(s => {
            if (s) setActiveShelf(s)
            else setNoShelfFound(true);
        });
        getItems().then(i => setItems(i));

    }, [])

    useEffect(() => {


    }, [focusedItem])

    if (noShelfFound)
        return notFound();

    // MAYBE USE CONTEXT FOR SHELF ID?
    return (
        <>
            <div className="flex flex-col gap-2 max-w-full">
                { activeShelf && items ?
                    <>
                        <Bookshelf shelfID={activeShelf._id!} items={items} setFocusedItem={setFocusedItem}/>
                        <div className="flex items-start">
                            <CreateItemForm shelfID={activeShelf._id!} addItem={addItem}/>
                        </div>
                    </>
                    :
                    <BookshelfSkeleton/>
                }
            </div>

            <div className="bg-emerald-200 rounded p-2 flex flex-col gap-2 max-w-full overflow-x-hidden overflow-y-auto">
                {activeShelf ?

                    (focusedItem ?
                        <ItemDetails item={focusedItem}/>
                        :
                        <ShelfDetails shelf={activeShelf} setActiveShelf={setActiveShelf} key={activeShelf.name}/>
                    )
                    :
                    <DetailsSkeleton/>
                }
            </div>
        </>
    );
}
