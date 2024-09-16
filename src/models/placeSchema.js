import mongoose from "mongoose";
const { Schema, Types } = mongoose;

let schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    photo: { type: String, default: null },
    date: [{ type: Types.ObjectId, ref: "events" }],
    ocupancy: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

let collection = "places";
let placeSchema = mongoose.model(collection, schema);

export default placeSchema;
