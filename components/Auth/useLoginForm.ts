import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import i18n from '@/i18n';

export const schema = z.object({
  email: z.email(i18n.t('validation.invalidEmail')),
  password: z.string({ error: i18n.t('validation.required') }),
});

export type LoginFormType = z.infer<typeof schema>;

export const useLoginForm = () => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<LoginFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        email: '',
        password: '',
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
