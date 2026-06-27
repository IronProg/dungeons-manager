import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import i18n from '@/i18n';

export const schema = z.object({
  damage: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .int(i18n.t('validation.mustBeInteger'))
    .optional(),
  healing: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .int(i18n.t('validation.mustBeInteger'))
    .optional(),
  temporary: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .int(i18n.t('validation.mustBeInteger'))
    .optional(),
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
