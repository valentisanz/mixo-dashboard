import { NextResponse } from "next/server";
import { Machine } from "@/models/Machine";
import { Service } from "@/models/Service";
import { connectDB } from "@/lib/mongodb";
import { validateSession } from "@/lib/validate-session";

export async function GET() {
  const validSession = await validateSession();
  if (!validSession) {
    return NextResponse.json(
      { error: "User not logged in or does not exist" },
      { status: 401 }
    );
  }
  await connectDB();

  try {
    const machines = await Machine.find();

    const machinesWithServices = await Promise.all(
      machines.map(async (machine) => {
        const numServices = await Service.countDocuments({
          machine: machine._id,
        });
        return { ...machine.toObject(), numServices };
      })
    );

    return NextResponse.json(machinesWithServices);
  } catch (error) {
    console.error("Error fetching machines:", error);
    return NextResponse.json(
      { error: "Failed to fetch machines" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();

    const { name, status } = body;
    if (!name || !status) {
      return NextResponse.json(
        { error: "Name and status are required" },
        { status: 400 }
      );
    }

    const newMachine = await Machine.create({ name, status });

    return NextResponse.json(newMachine, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create machine" },
      { status: 500 }
    );
  }
}
