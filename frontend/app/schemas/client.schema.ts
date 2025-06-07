import { z } from "zod";

// Schema para o formulário de CRIAÇÃO de cliente
export const createClientFormSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
});

// Schema para o formulário de EDIÇÃO de cliente
export const editClientFormSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  status: z.enum(['ATIVO', 'INATIVO']),
});

// Tipos TypeScript inferidos a partir dos schemas
export type CreateClientFormValues = z.infer<typeof createClientFormSchema>;
export type EditClientFormValues = z.infer<typeof editClientFormSchema>;