"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Usuario o contraseña inválidos");
    } else {
      router.push("/dashboard/machines");
    }
  };

  return status === "loading" ? (
    <h1>Loading...</h1>
  ) : (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo de mi página"
            width={200}
            height={100}
          />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="username">Usuario</Label>
                <Input id="username" type="text" name="username" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" name="password" />
              </div>
              {error && <p className="text-red-500 text-sm m-0">{error}</p>}
              <Button type="submit" className="w-full">
                {status ? "Iniciando sesión..." : "Acceder"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
