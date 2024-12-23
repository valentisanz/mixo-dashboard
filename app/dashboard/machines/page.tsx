"use client";
import { MachineCard } from "@/components/machine-card";
import useFetch from "@/hooks/useFetch";

export default function Page() {
  const {
    data: machines,
    loading,
    executeFetch,
  } = useFetch<any>("/api/machines", "GET");

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Máquinas</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : !machines || machines.length === 0 ? (
        <h1>No hay máquinas disponibles</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6">
          {machines.map((machine) => (
            <MachineCard
              key={machine._id}
              {...machine}
              updateData={executeFetch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
