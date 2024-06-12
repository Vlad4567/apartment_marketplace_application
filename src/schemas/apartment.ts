import { z } from 'zod';

export const apartmentSchema = z.object({
  id: z.coerce.string(),
  name: z.coerce.string().min(1, 'Name is required'),
  rooms: z.coerce.number().min(1, 'At least 1 room'),
  price: z.coerce.number().min(1, 'At least $1'),
  description: z.coerce.string(),
});

export type Apartment = z.infer<typeof apartmentSchema>;
