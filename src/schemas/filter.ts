import { z } from 'zod';

export const filterSortByOptions = [
  'Sort by',
  'Price - lowest to highest',
  'Price - highest to lowest',
] as const;

export const filterSchema = z.object({
  sortBy: z.enum(filterSortByOptions).default('Sort by'),
  rooms: z.coerce.number(),
});

export type Filter = z.infer<typeof filterSchema>;
