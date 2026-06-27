import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import i18n from '@/i18n';
import type { CharacterGeneralInfo } from '@/types/character';

export const schema = z.object({
  hitPoints: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .int(i18n.t('validation.mustBeInteger')),
  hitPointsLimit: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .int(i18n.t('validation.mustBeInteger')),
  hitPointsLimitTemporary: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .int(i18n.t('validation.mustBeInteger')),
  temporaryHitPoints: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .int(i18n.t('validation.mustBeInteger'))
    .optional(),
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
