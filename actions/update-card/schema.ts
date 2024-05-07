import { z } from 'zod';

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: 'La descripción es requerida',
        invalid_type_error: 'La descripción es requerida',
      })
      .min(3, {
        message: 'La descripción es muy corta',
      })
  ),
  title: z.optional(
    z
      .string({
        required_error: 'El título es requerido',
        invalid_type_error: 'El título es requerido',
      })
      .min(3, {
        message: 'El título es muy corto',
      })
  ),
  id: z.string(),
});
