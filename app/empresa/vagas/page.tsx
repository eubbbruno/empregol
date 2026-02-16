"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EmpresaVagasPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/empresa/dashboard");
  }, [router]);

  return null;
}
