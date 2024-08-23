'use client'
import CreateShelfForm from "@/components/CreateShelfForm";
import {useEffect, useRef} from "react";

export default function CreateShelfSidebarOption() {

    const modalRef = useRef<HTMLDialogElement>(null);

    const showModal = () => modalRef.current?.showModal();
    const closeModal = () => modalRef.current?.close();

    useEffect(() => {
        const modal = document.getElementById("shelfModal") as HTMLDialogElement;
        modal!.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                e.stopPropagation();
                closeModal();
            }
        });
    }, []);

    return (
        <>
            <a className="block px-2 border-emerald-950 border-b-2 hover:bg-emerald-700"
               onClick={showModal}>+ Add new shelf</a>
            <dialog ref={modalRef} id="shelfModal" className="bg-transparent w-1/3 h-1/2">
                <CreateShelfForm closeModal={closeModal}/>
            </dialog>
        </>
    )
}