import mongoose from "mongoose";
const { Schema, Types } = mongoose;

let schema = new Schema(
  {
    place: { type: Types.ObjectId, ref: "places", required: true },
    date: { type: Date, required: true },
    name: { type: String, required: true },
    photo: { type: String, default: null },
    description: { type: String, required: true },
    attendees: [{ type: Types.ObjectId, ref: "users" }],
    minimumAge: { type: Number, required: true },
    organizer: { type: Types.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
  }
);

let collection = "events";
let eventSchema = mongoose.model(collection, schema);

export default eventSchema;
