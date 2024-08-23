'use client'
import { useState } from "react";

export default function ShelfLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <article className="grid p-4 gap-4 max-h-full overflow-y-auto" style={{gridTemplateColumns: '3fr 2fr'}}>
            {children}
        </article>
    );
}
