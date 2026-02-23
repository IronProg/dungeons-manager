import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CharacterClass } from 'types/character';
import * as z from 'zod';

export const classSchema = z.object({
  id: z.coerce.number<number>().optional(),
  name: z.string(),
  level: z.coerce.number<number>().int(),
  castingKind: z.string().optional().nullable(),
  _destroy: z.boolean().optional(),
});

export const schema = z.object({
  classes: classSchema.array(),
});

export type ClassForm = z.infer<typeof classSchema>;
export type ClassesFormType = z.infer<typeof schema>;

type useClassesFormProps = {
  characterClasses: CharacterClass[];
};

export const useClassesForm = ({ characterClasses }: useClassesFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<ClassesFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        classes: [...characterClasses],
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
