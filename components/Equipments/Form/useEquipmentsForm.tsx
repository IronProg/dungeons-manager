import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
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
  const formValues = useMemo(
    () => ({
      name: equipment?.name ?? '',
      amount: equipment?.amount ?? 1,
      description: equipment?.description ?? '',
    }),
    [equipment],
  );

  const { control, handleSubmit, watch, reset, getValues, formState } =
    useForm<EquipmentsFormType>({
      resolver: zodResolver(schema),
      defaultValues: formValues,
    });

  useEffect(() => {
    reset(formValues);
  }, [reset, formValues]);

  return {
    control,
    handleSubmit,
    watch,
    getValues,
    formState,
    errors: formState.errors,
  };
};
