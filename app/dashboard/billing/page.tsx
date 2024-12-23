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
import { ServiceResponse } from "@/models/Service";
import filterData from "@/lib/filter-data";

export default function Page() {
  const { data } = useFetch<ServiceResponse[]>("/api/services", "GET");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = filterData(data ?? [], searchTerm);

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
            {filteredServices.map((service) => (
              <TableRow key={service._id}>
                <TableCell className="font-medium">{service._id}</TableCell>
                <TableCell>{service.type}</TableCell>
                <TableCell>{`${service.service.alcohol} + ${service.service.bib}`}</TableCell>
                <TableCell>{service.date}</TableCell>
                <TableCell className="text-right">{service.price} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
