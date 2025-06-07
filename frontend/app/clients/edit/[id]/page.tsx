'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // useParams para pegar o ID da URL
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Vamos adicionar o Select

// URL da sua API Backend
const API_URL = 'http://localhost:3333/api/v1/clients';

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams(); // Hook para ler parâmetros da URL
  const id = params.id; // Pega o ID do cliente da URL

  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'ATIVO' | 'INATIVO'>('ATIVO');
  
  // Estados para controle de UI
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Busca os dados do cliente a ser editado quando a página carrega
  useEffect(() => {
    if (id) {
      const fetchClientData = async () => {
        try {
          const response = await axios.get(`${API_URL}/${id}`);
          const client = response.data;
          setName(client.name);
          setEmail(client.email);
          setStatus(client.status);
        } catch (err) {
          setError('Falha ao buscar dados do cliente.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchClientData();
    }
  }, [id]);

  // Submete as alterações para o backend
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.put(`${API_URL}/${id}`, { name, email, status });
      alert('Cliente atualizado com sucesso!');
      router.push('/clients'); // Redireciona para a lista
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Falha ao atualizar cliente.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  if (isLoading) return <p className="p-4 text-center">Carregando dados do cliente...</p>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Editar Cliente</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campos de Nome e Email */}
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        {/* Campo de Status */}
        <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: 'ATIVO' | 'INATIVO') => setStatus(value)}>
                <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ATIVO">Ativo</SelectItem>
                    <SelectItem value="INATIVO">Inativo</SelectItem>
                </SelectContent>
            </Select>
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </form>
    </div>
  );
}