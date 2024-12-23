"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { Label } from "./ui/label";

export function MachineCard({
  _id,
  name,
  status,
  numServices,
  updateData,
}: any) {
  const { executeFetch } = useFetch<any>(`/api/machines/${_id}`, "PATCH");
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEdittedData] = useState({
    name,
    status,
  });

  const handleSave = async () => {
    const changes: { [key: string]: any } = {};

    if (editedData.name !== name) {
      changes.name = editedData.name;
    }
    if (editedData.status !== status) {
      changes.status = editedData.status;
    }

    if (Object.keys(changes).length > 0) {
      await executeFetch(changes);
      await updateData();
    }
  };

  return (
    <Card className="flex flex-col sm:flex-row h-full overflow-hidden">
      <div className="relative w-full sm:w-1/3 lg:w-1/4 h-48 sm:h-auto p-2">
        <div className="relative w-full h-full">
          <Image
            src={"/images/mixo_machine.png"}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <CardContent className="flex flex-col justify-between flex-grow p-4 w-full sm:w-2/3 lg:w-3/4">
        <div>
          {isEditing ? (
            <>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={editedData.name}
                onChange={(e) =>
                  setEdittedData({ ...editedData, name: e.target.value })
                }
                className="mb-2"
              />
              <Label htmlFor="status">Estado</Label>
              <Input
                id="status"
                type="text"
                name="status"
                value={editedData.status}
                onChange={(e) =>
                  setEdittedData({ ...editedData, status: e.target.value })
                }
                className="mb-2"
              />
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-2">{name}</h3>
              <p className="mb-1">Estado: {status}</p>
            </>
          )}
          <p>Número de servicios: {numServices}</p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="self-end mt-4"
        >
          {isEditing ? "Guardar" : "Modificar"}
        </Button>
      </CardContent>
    </Card>
  );
}
