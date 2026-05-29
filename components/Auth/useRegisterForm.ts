import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import i18n from '@/i18n';

export const schema = z
  .object({
    email: z.email(i18n.t('errors.invalidEmail')),
    password: z.string().min(6, i18n.t('errors.min', { min: 6 })),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: i18n.t('errors.passwordsDontMatch'),
    path: ['passwordConfirmation'],
  });

export type RegisterFormType = z.infer<typeof schema>;

export const useRegisterForm = () => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<RegisterFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        email: '',
        password: '',
        passwordConfirmation: '',
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
