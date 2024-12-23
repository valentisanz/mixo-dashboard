import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  id: number;
  type: string;
  service: { alcohol: string; bib: string };
  date: string;
  price: string;
  machine: mongoose.Types.ObjectId;
}

const ServiceSchema: Schema = new Schema({
  type: { type: String, required: true },
  service: { alcohol: { type: String }, bib: { type: String } },
  date: { type: String, required: true },
  price: { type: String, required: true },
  machine: { type: Schema.Types.ObjectId, ref: "Machine", required: true }, // Relación con Machine
});

export const Service =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
