import { z } from 'zod'

export const createOpportunitySchema = z.object({
  titulo:   z.string().min(3,'Min 3 characters').max(100),
  cliente:  z.string().min(2,'Min 2 characters').max(100),
  valor:    z.number({ message:'Must be a number' }).positive('Must be positive'),
  status:   z.enum(['aberta','em_negociacao','fechada','perdida']).default('aberta'),
  descricao:z.string().max(500).optional(),
})

export type CreateForm = z.infer<typeof createOpportunitySchema>
