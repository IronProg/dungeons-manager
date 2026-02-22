import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const schema = z.object({
  email: z.email(),
  password: z.string(),
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
