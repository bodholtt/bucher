import {ObjectId} from "bson";

/**
 * Shelf type corresponding directly to how it's stored in MongoDB
 */
export type Shelf = {
    _id?: ObjectId
    name?: string
    description?: string
    items?: ObjectId[]
}

/**
 * Shelf type for inputting changes via put request
 */
export type InputShelf = {
    name?: string
    description?: string
    items?: string[]
}

/**
 * Item type corresponding directly to how it's stored in MongoDB
 */
export type Item = {
    _id?: ObjectId
    name?: string
    description?: string
    format?: string
    spineColor?: string | undefined | null // null to reset
    textColor?: string | undefined | null // null to reset
    images?: string
}

export const formats = [
    "Book", "Paperback", "Hardcover", "Magazine",
    "DVD", "Blu-ray", "CD",
    "Cassette", "VHS",
]

// export type ImageList = {
//     spine: string | null;
//     main: string | null;
// }