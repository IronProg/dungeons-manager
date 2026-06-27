import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import i18n from '@/i18n';

export const schema = z.object({
  experience: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .int(i18n.t('validation.mustBeInteger')),
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
