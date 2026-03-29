import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Equipment } from 'types/character';
import * as z from 'zod';

const schema = z.object({
  name: z.string(),
  amount: z.coerce.number<number>(),
  description: z.string().optional(),
});

export type EquipmentsFormType = z.infer<typeof schema>;

type useEquipmentsFormProps = {
  equipment?: Equipment;
};

export const useEquipmentsForm = ({ equipment }: useEquipmentsFormProps) => {
  return useForm<EquipmentsFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: equipment?.name ?? '',
      amount: equipment?.amount ?? 1,
      description: equipment?.description ?? '',
    },
  });
};
