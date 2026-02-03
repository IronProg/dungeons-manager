import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const schema = z.object({ name: z.string() });

export type NewCharacterFormType = z.infer<typeof schema>;

export const useNewCharacter = () => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<NewCharacterFormType>({
      resolver: zodResolver(schema),
      defaultValues: { name: '' },
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
