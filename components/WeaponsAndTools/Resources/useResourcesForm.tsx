import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import type { Resource } from '@/types/character';

const schema = z.object({
  name: z.string(),
  amount: z.coerce.number<number>(),
  max: z.coerce.number<number>().optional(),
});

export type ResourcesFormType = z.infer<typeof schema>;

type useResourcesFormProps = {
  resource?: Resource;
};

export const useResourcesForm = ({ resource }: useResourcesFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<ResourcesFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        name: resource?.name ?? '',
        amount: resource?.amount,
        max: resource?.max,
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
