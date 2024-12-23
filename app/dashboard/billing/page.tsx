"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";

export default function Page() {
  const { data } = useFetch<any>("/api/services", "GET");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data
    ? data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Facturación
      </h1>
      <Input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Identificador</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Servicio</TableHead>
              <TableHead>Fecha y hora</TableHead>
              <TableHead className="text-right">Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item._id}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{`${item.service.alcohol} + ${item.service.bib}`}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="text-right">{item.price} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
