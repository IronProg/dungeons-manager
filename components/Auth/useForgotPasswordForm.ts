import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import i18n from '@/i18n';

export const schema = z.object({
  email: z.email(i18n.t('errors.invalidEmail')),
});

export type ForgotPasswordFormType = z.infer<typeof schema>;

export const useForgotPasswordForm = () => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<ForgotPasswordFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        email: '',
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
