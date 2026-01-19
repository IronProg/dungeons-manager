import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CharacterGeneralInfo } from 'types/character';
import * as z from 'zod';

export const schema = z.object({
  hitPoints: z.coerce.number<number>().int(),
  hitPointsLimit: z.coerce.number<number>().int(),
  hitPointsLimitTemporary: z.coerce.number<number>().int(),
  temporaryHitPoints: z.coerce.number<number>().int().optional(),
});

export type HitPointsFormType = z.infer<typeof schema>;

type useHitPointsFormProps = { generalInfo: CharacterGeneralInfo };

export const useHitPointsForm = ({ generalInfo }: useHitPointsFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<HitPointsFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        hitPoints: generalInfo.hitPoints,
        hitPointsLimit: generalInfo.hitPointsLimit,
        hitPointsLimitTemporary: generalInfo.hitPointsLimitTemporary,
        temporaryHitPoints: generalInfo.temporaryHitPoints,
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
