import { zodResolver } from '@hookform/resolvers/zod';
import { ATTRIBUTES } from 'core/enums/attributes';
import { useForm } from 'react-hook-form';
import { CharacterGeneralInfo } from 'types/character';
import * as z from 'zod';

export const schema = z.object({
  passivePerceptionCustomBonus: z.coerce.number<number>().int().optional(),
  passivePerceptionExtraAttribute: z.enum(ATTRIBUTES).optional().nullable(),
});

export type PassivePerceptionFormType = z.infer<typeof schema>;

type usePassivePerceptionFormProps = { generalInfo: CharacterGeneralInfo };

export const usePassivePerceptionForm = ({
  generalInfo,
}: usePassivePerceptionFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<PassivePerceptionFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        passivePerceptionCustomBonus: generalInfo.passivePerceptionCustomBonus,
        passivePerceptionExtraAttribute:
          generalInfo.passivePerceptionExtraAttribute,
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
