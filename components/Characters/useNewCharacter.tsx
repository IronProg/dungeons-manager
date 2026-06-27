import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import i18n from '@/i18n';

export const schema = z.object({
  name: z.string({ error: i18n.t('validation.required') }),
});

export type NewCharacterFormType = z.infer<typeof schema>;

export const useNewCharacter = () => {
  const { control, handleSubmit, watch, getValues, reset, formState } =
    useForm<NewCharacterFormType>({
      resolver: zodResolver(schema),
      defaultValues: { name: '' },
    });

  return {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState,
    errors: formState.errors,
  };
};
