import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ATTRIBUTES } from '@/core/enums/attributes';
import i18n from '@/i18n';
import type { CharacterGeneralInfo } from '@/types/character';

export const schema = z.object({
  initiativeCustomBonus: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .int(i18n.t('validation.mustBeInteger'))
    .optional(),
  initiativeExtraAttribute: z.enum(ATTRIBUTES).optional().nullable(),
});

export type InitiativeFormType = z.infer<typeof schema>;

type useInitiativeFormProps = { generalInfo: CharacterGeneralInfo };

export const useInitiativeForm = ({ generalInfo }: useInitiativeFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<InitiativeFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        initiativeCustomBonus: generalInfo.initiativeCustomBonus,
        initiativeExtraAttribute: generalInfo.initiativeExtraAttribute,
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
