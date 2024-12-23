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
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { data, loading } = useFetch<ServiceResponse[]>("/api/services", "GET");
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
        {loading ? (
          <LoadingState />
        ) : filteredServices.length === 0 ? (
          <EmptyState message="No hay servicios disponibles" />
        ) : (
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
                  <TableCell className="text-right">
                    {service.price} €
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

// Componente para el estado de carga
function LoadingState() {
  return (
    <div>
      <Skeleton className="h-[40px] w-full mb-4" />
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="h-[50px] w-full mb-2" />
      ))}
    </div>
  );
}

// Componente para el estado vacío
function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center text-gray-500 mt-6">
      <p>{message}</p>
    </div>
  );
}
