import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Feature } from 'types/character';
import * as z from 'zod';

const schema = z.object({
  title: z.string(),
  description: z.string(),
  origin: z.string().optional(),
});

export type FeaturesFormType = z.infer<typeof schema>;

type useFeaturesFormProps = {
  feature?: Feature;
};

export const useFeaturesForm = ({ feature }: useFeaturesFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<FeaturesFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        title: feature?.title || '',
        description: feature?.description || '',
        origin: feature?.origin || '',
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
