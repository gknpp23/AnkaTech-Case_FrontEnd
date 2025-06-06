'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Client {
  id: number;
  name: string;
  email: string;
  status: 'ATIVO' | 'INATIVO';
}

// URL da sua API Backend (verifique se a porta do seu backend é 3333)
const API_URL = 'http://localhost:3333/api/v1/clients';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setClients(response.data);
      setError(null);
    } catch (err) {
      setError('Falha ao buscar clientes. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (clientId: number) => {
    if (!window.confirm('Tem certeza que deseja deletar este cliente?')) return;

    try {
      
      await axios.delete(`${API_URL}/${clientId}`);
      
      alert('Cliente deletado com sucesso!');
      fetchClients(); // Recarrega a lista para atualizar a tela

    } catch (err) {
      alert('Falha ao deletar o cliente.');
      console.error(err);
    }
  };

  if (isLoading) return <div className="p-4 text-center">Carregando clientes...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link href="/clients/new">
          <Button>Adicionar Cliente</Button>
        </Link>
      </div>
      <div className="border rounded-lg bg-white">
        <ul className="divide-y divide-gray-200">
          {clients.length > 0 ? (
            clients.map((client) => (
              <li key={client.id} className="flex justify-between items-center p-4 hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      client.status === 'ATIVO' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {client.status}
                  </span>
                  
                  
                  <Link href={`/clients/edit/${client.id}`}>
                    <Button variant="outline" size="sm">Editar</Button>
                  </Link>

                  <Button variant="destructive" size="sm" onClick={() => handleDelete(client.id)}>
                    Deletar
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">Nenhum cliente cadastrado.</p>
          )}
        </ul>
      </div>
    </div>
  );
}