import { z } from 'zod';

export const CreateList = z.object({
  title: z
    .string({
      required_error: 'El título es requerido',
      invalid_type_error: 'El título es requerido',
    })
    .min(3, {
      message: 'El título es muy corto',
    }),
  boardId: z.string(),
});
