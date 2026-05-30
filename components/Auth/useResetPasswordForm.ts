import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import i18n from '@/i18n';

export const schema = z
  .object({
    password: z.string().min(6, i18n.t('errors.min', { min: 6 })),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: i18n.t('errors.passwordsDontMatch'),
    path: ['passwordConfirmation'],
  });

export type ResetPasswordFormType = z.infer<typeof schema>;

export const useResetPasswordForm = () => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<ResetPasswordFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
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
