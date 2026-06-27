import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ATTRIBUTES } from '@/core/enums/attributes';
import i18n from '@/i18n';
import type { SavingThrow } from '@/types/character';

export const schema = z.object({
  mainAttribute: z.enum(ATTRIBUTES),
  proficiency: z.boolean(),
  customBonus: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .int(i18n.t('validation.mustBeInteger'))
    .optional(),
  extraAttribute: z.enum(ATTRIBUTES).optional().nullable(),
});

export type SavingThrowFormType = z.infer<typeof schema>;

type useSavingThrowFormProps = {
  savingThrow: SavingThrow;
};

export const useSavingThrowForm = ({
  savingThrow,
}: useSavingThrowFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<SavingThrowFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        mainAttribute: savingThrow.mainAttribute,
        proficiency: savingThrow?.proficiency,
        customBonus: savingThrow.customBonus,
        extraAttribute: savingThrow.extraAttribute,
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
