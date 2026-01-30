import { zodResolver } from '@hookform/resolvers/zod';
import { ATTRIBUTES } from 'core/enums/attributes';
import { useForm } from 'react-hook-form';
import { CharacterGeneralInfo } from 'types/character';
import * as z from 'zod';

export const schema = z.object({
  initiativeCustomBonus: z.coerce.number<number>().int().optional(),
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
