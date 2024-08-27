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
    spineColor?: string
    textColor?: string
    images?: string
}

// export type ImageList = {
//     spine: string | null;
//     main: string | null;
// }