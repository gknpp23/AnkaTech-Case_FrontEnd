'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createClientFormSchema, CreateClientFormValues } from '@/app/schemas/client.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const API_URL = 'http://localhost:3333/api/v1/clients';

// Função que envia os dados para a API
const createClient = async (data: CreateClientFormValues) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export default function NewClientPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. CORREÇÃO: Usando o schema e o tipo de CRIAÇÃO
  const form = useForm<CreateClientFormValues>({
    resolver: zodResolver(createClientFormSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  // 2. Configuração da mutação (continua igual)
  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      alert('Cliente criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      router.push('/clients');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Falha ao criar cliente.';
      alert(errorMessage);
    },
  });

  // 3. Função de submissão que conecta o formulário à mutação
  function onSubmit(values: CreateClientFormValues) {
    createMutation.mutate(values);
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Adicionar Novo Cliente</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do Cliente" {...field} />
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
                  <Input placeholder="email@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Salvando...' : 'Salvar Cliente'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}