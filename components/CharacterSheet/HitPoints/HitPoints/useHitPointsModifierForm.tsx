import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const schema = z.object({
  damage: z.coerce.number<number>().int().optional(),
  healing: z.coerce.number<number>().int().optional(),
  temporary: z.coerce.number<number>().int().optional(),
});

export type HitPointsModifierFormType = z.infer<typeof schema>;

export const useHitPointsModifierForm = () => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<HitPointsModifierFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        damage: undefined,
        healing: undefined,
        temporary: undefined,
      },
    });

  return {
    control,
    handleSubmit,
    watch,
    getValues,
    formState,
    errors: formState.errors,
  };
};
