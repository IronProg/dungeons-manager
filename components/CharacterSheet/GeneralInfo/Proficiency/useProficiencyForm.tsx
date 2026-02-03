import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const schema = z.object({
  proficiency: z.coerce.number<number>().int(),
});

export type ProficiencyFormType = z.infer<typeof schema>;

type useProficiencyFormProps = { proficiency: number };

export const useProficiencyForm = ({
  proficiency,
}: useProficiencyFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<ProficiencyFormType>({
      resolver: zodResolver(schema),
      defaultValues: { proficiency },
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
