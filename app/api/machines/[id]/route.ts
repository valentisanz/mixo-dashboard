import { NextResponse } from "next/server";
import { Machine } from "@/models/Machine";
import { connectDB } from "@/lib/mongodb";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;

  try {
    const body = await req.json();
    const { name, status } = body;

    if (!name && !status) {
      return NextResponse.json(
        { error: "At least one field (name or status) is required" },
        { status: 400 }
      );
    }

    const updatedMachine = await Machine.findByIdAndUpdate(
      id,
      { ...(name && { name }), ...(status && { status }) },
      { new: true }
    );

    if (!updatedMachine) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 });
    }

    return NextResponse.json(updatedMachine, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update machine" },
      { status: 500 }
    );
  }
}
