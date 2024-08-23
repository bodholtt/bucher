import Link from "next/link";
import {Shelf} from "@/types";
import {API_URL} from "@/app/common";
import CreateShelfSidebarOption from "@/components/CreateShelfSidebarOption";

export default async function Sidebar() {

    const res = await fetch(`${API_URL}/shelves`, {
        method: "GET",
        next: { tags: ['sidebar'] }
    });
    const data = await res.json();
    const shelves: Shelf[] = data.data

    return (
        <aside
            className="bg-emerald-700 border-r-4 border-emerald-950 min-w-60 flex flex-col justify-between max-h-full">
            <div className="flex flex-col">
                <p className="text-2xl px-2">Shelves</p>
                <div className="pl-4 bg-emerald-900 border-t-2 border-emerald-950">
                    <div className="border-l-4 border-emerald-950 bg-emerald-800">
                        {shelves.map((shelf) => (
                            <Link
                                className="font-semibold block px-2 border-b-2 border-dashed border-emerald-950 hover:bg-emerald-700"
                                key={`${shelf._id}`}
                                href={`/shelf/${shelf._id}`}>
                                {shelf.name}
                            </Link>
                        ))}
                        <CreateShelfSidebarOption/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border-emerald-950 border-t-2">
                <Link className="text-2xl px-2 hover:bg-emerald-800" href="/about">About</Link>
                <Link className="text-2xl px-2 hover:bg-emerald-800" href="/settings">Settings</Link>
            </div>
        </aside>
    )
}