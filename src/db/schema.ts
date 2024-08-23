import mongoose from "mongoose";
import {ObjectId} from "bson";

type shelfItemReference = {
    idx: number,
    id: ObjectId
}

const shelfSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    items: { type: Array<shelfItemReference>, required: false }, // Items in shelf
});
export const ShelfModel = mongoose.models.Shelf ?? mongoose.model('Shelf', shelfSchema);

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    spineColor: { type: String, required: false }, // hex code
    textColor: { type: String, required: false }, // hex code
})
export const ItemModel = mongoose.models.Item ?? mongoose.model('Item', itemSchema);