import { NextResponse } from "next/server";
import { Service } from "@/models/Service";
import { connectDB } from "@/lib/mongodb";
import { validateSession } from "@/lib/validate-session";
import { Machine } from "@/models/Machine";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;

  try {
    const machineFound = await Machine.findById(id);
    if (!machineFound) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 });
    }
    const services = await Service.find({ machine: id });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services from machine:", error);
    return NextResponse.json(
      { error: "Failed to fetch services from machine" },
      { status: 500 }
    );
  }
}
