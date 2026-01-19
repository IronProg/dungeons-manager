import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const schema = z.object({
  experience: z.coerce.number<number>().int(),
});

export type ExperienceFormType = z.infer<typeof schema>;

type useExperienceFormProps = { experience: number };

export const useExperienceForm = ({ experience }: useExperienceFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<ExperienceFormType>({
      resolver: zodResolver(schema),
      defaultValues: { experience },
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
