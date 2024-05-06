import { z } from 'zod';

export const UpdateList = z.object({
  title: z
    .string({
      required_error: 'El título es requerido',
      invalid_type_error: 'El título es requerido',
    })
    .min(3, {
      message: 'El título es muy corto',
    }),
  id: z.string(),
  boardId: z.string(),
});
