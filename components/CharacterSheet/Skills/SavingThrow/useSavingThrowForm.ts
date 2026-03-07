import { zodResolver } from '@hookform/resolvers/zod';
import { ATTRIBUTES } from 'core/enums/attributes';
import { useForm } from 'react-hook-form';
import { SavingThrow } from 'types/character';
import * as z from 'zod';

export const schema = z.object({
  mainAttribute: z.enum(ATTRIBUTES),
  proficiency: z.boolean(),
  customBonus: z.coerce.number<number>().int().optional(),
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
