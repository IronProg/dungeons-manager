import { zodResolver } from '@hookform/resolvers/zod';
import { ATTRIBUTES } from 'core/enums/attributes';
import { useForm } from 'react-hook-form';
import { CharacterGeneralInfo } from 'types/character';
import * as z from 'zod';

export const schema = z.object({
  armorClassBase: z.coerce.number<number>().int(),
  armorClassFirstAttribute: z.enum(ATTRIBUTES).optional().nullable(),
  armorClassSecondAttribute: z.enum(ATTRIBUTES).optional().nullable(),
});

export type ArmorClassFormType = z.infer<typeof schema>;

type useArmorClassFormProps = {
  generalInfo: CharacterGeneralInfo;
};

export const useArmorClassForm = ({ generalInfo }: useArmorClassFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<ArmorClassFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        armorClassBase: generalInfo.armorClassBase,
        armorClassFirstAttribute: generalInfo.armorClassFirstAttribute,
        armorClassSecondAttribute: generalInfo.armorClassSecondAttribute,
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
