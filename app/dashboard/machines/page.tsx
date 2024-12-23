"use client";
import Message from "@/components/custom-skeleton";
import { MachineCard } from "@/components/machine-card";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import { MachineResponse } from "@/models/Machine";
import { useMemo } from "react";

export default function Page() {
  const {
    data: machines,
    loading,
    executeFetch,
  } = useFetch<MachineResponse[]>("/api/machines", "GET");

  const content = useMemo(() => {
    if (loading) return <Skeleton className="h-[200px] w-[350px] rounded-xl" />;

    if (!machines || machines.length === 0) {
      return <Message message="No hay máquinas disponibles" />;
    }

    return machines.map((machine) => (
      <MachineCard key={machine._id} {...machine} updateData={executeFetch} />
    ));
  }, [loading, machines, executeFetch]);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Máquinas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6">
        {content}
      </div>
    </div>
  );
}
