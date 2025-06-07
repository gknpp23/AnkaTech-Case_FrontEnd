'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { editClientFormSchema, EditClientFormValues } from '@/app/schemas/client.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const API_URL = 'http://localhost:3333/api/v1/clients';

interface Client {
  id: number;
  name: string;
  email: string;
  status: 'ATIVO' | 'INATIVO';
}

const fetchClientById = async (id: string): Promise<Client> => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

const updateClient = async ({ id, data }: { id: string, data: EditClientFormValues }) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const queryClient = useQueryClient();

  const { data: client, isLoading, isError } = useQuery({
    queryKey: ['client', id],
    // CORREÇÃO AQUI:
    // Adicionamos uma verificação para garantir que 'id' não é undefined
    queryFn: () => {
      if (!id) {
        // Isso não deve acontecer por causa da opção 'enabled', mas satisfaz o TypeScript
        throw new Error('ID do cliente não encontrado!');
      }
      return fetchClientById(id);
    },
    enabled: !!id, // Garante que a query só rode quando o 'id' estiver disponível
  });
  
  const form = useForm<EditClientFormValues>({
    resolver: zodResolver(editClientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      status: 'ATIVO',
    },
  });

  useEffect(() => {
    if (client) {
      form.reset(client);
    }
  }, [client, form]);

  const updateMutation = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      alert('Cliente atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client', id] });
      router.push('/clients');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Falha ao atualizar cliente.';
      alert(errorMessage);
    }
  });

  function onSubmit(values: EditClientFormValues) {
    if (!id) return; // Verificação de segurança extra
    updateMutation.mutate({ id, data: values });
  }

  if (isLoading) return <p className="p-4 text-center">Carregando dados do cliente...</p>;
  if (isError) return <p className="p-4 text-center text-red-500">Falha ao buscar dados do cliente.</p>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Editar Cliente</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ATIVO">Ativo</SelectItem>
                    <SelectItem value="INATIVO">Inativo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}