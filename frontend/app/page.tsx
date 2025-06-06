import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Anka Tech - Gestão de Investimentos</h1>
        <p className="mb-8 text-lg text-gray-600">Gerencie seus clientes e visualize ativos financeiros.</p>
        <Link href="/clients">
          <Button size="lg">Acessar Lista de Clientes</Button>
        </Link>
      </div>
    </main>
  );
}