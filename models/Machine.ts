import mongoose, { Schema, Document } from "mongoose";

export type MachineResponse = {
  _id: string;
  name: string;
  status: string;
  numServices: number;
};

export interface IMachine extends Document {
  name: string;
  status: string;
}

const MachineSchema: Schema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
});

export const Machine =
  mongoose.models.Machine || mongoose.model<IMachine>("Machine", MachineSchema);
