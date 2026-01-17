import { zodResolver } from '@hookform/resolvers/zod';
import { ATTRIBUTES } from 'core/enums/attributes';
import { useForm } from 'react-hook-form';
import { Save } from 'types/character';
import * as z from 'zod';

export const schema = z.object({
  attribute: z.enum(ATTRIBUTES),
  proficiency: z.boolean(),
  customBonus: z.coerce.number<number>().int().optional(),
});

export type SaveFormType = z.infer<typeof schema>;

type useSaveFormProps = {
  save: Save;
};

export const useSaveForm = ({ save }: useSaveFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<SaveFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        attribute: save.attribute,
        proficiency: save.proficiency,
        customBonus: save.customBonus,
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
