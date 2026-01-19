import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const schema = z.object({
  passivePerceptionCustomBonus: z.coerce.number<number>().int().optional(),
});

export type PassivePerceptionFormType = z.infer<typeof schema>;

type usePassivePerceptionFormProps = {
  passivePerceptionCustomBonus?: number;
};

export const usePassivePerceptionForm = ({
  passivePerceptionCustomBonus,
}: usePassivePerceptionFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<PassivePerceptionFormType>({
      resolver: zodResolver(schema),
      defaultValues: { passivePerceptionCustomBonus },
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
