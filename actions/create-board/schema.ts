import { z } from 'zod';

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: 'El título es requerido',
      invalid_type_error: 'El título es requerido',
    })
    .min(3, {
      message: 'El título es muy corto',
    }),
  image: z.string({
    required_error: 'La imagen es requerida',
    invalid_type_error: 'La imagen es requerida',
  }),
});
