import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const schema = z.object({
  name: z.string().min(1),
});

export type EditTableFormType = z.infer<typeof schema>;

export const useEditTable = (defaultName: string) => {
  const { control, handleSubmit, watch, getValues, reset, formState } =
    useForm<EditTableFormType>({
      resolver: zodResolver(schema),
      defaultValues: { name: defaultName },
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
