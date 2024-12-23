import { connectDB } from "@/lib/mongodb";
import { Machine } from "@/models/Machine";
import { Service } from "@/models/Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const services = await Service.find();

    const servicesWithServices = await Promise.all(
      services.map(async (service) => {
        const numServices = await Service.countDocuments({
          service: service._id,
        });
        return { ...service.toObject(), numServices };
      })
    );

    return NextResponse.json(servicesWithServices);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();

  try {
    const body = await req.json();

    const { type, service, date, price, machineId } = body;
    if (!type || !service || !date || !price || !machineId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const machineFound = await Machine.findById(machineId);
    if (!machineFound) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 });
    }

    const newService = await Service.create({
      type,
      service,
      date,
      price,
      machine: machineFound,
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
