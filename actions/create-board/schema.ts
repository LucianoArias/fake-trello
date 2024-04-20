import { z } from 'zod';

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: 'El titulo es requerido',
      invalid_type_error: 'El titulo es requerido',
    })
    .min(3, {
      message: 'El titulo es muy corto',
    }),
});
