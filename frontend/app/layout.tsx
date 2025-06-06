import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; 
import Link from "next/link"; // Importando o componente de Link para navegação
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

// Metadados atualizados para o seu projeto
export const metadata: Metadata = {
  title: "Anka Tech - Gestão",
  description: "Gerenciamento de clientes e ativos financeiros.",
};

// Componente simples de Header para a Navegação
function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
          AnkaTech
        </Link>
        <div className="space-x-6">
          <Link href="/clients" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Clientes
          </Link>
          <Link href="/assets" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Ativos
          </Link>
        </div>
      </nav>
    </header>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} antialiased bg-gray-50`}>
        <Header /> 
        <main>
          {children} {/* O conteúdo da página será renderizado aqui */}
        </main>
      </body>
    </html>
  );
}