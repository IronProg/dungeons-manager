import { zodResolver } from '@hookform/resolvers/zod';
import { ATTRIBUTES } from 'core/enums/attributes';
import { useForm } from 'react-hook-form';
import { Attribute } from 'types/character';
import * as z from 'zod';

export const attributeSchema = z.object({
  id: z.coerce.number<number>(),
  name: z.enum(ATTRIBUTES),
  value: z.coerce.number<number>().int(),
  tempValue: z
    .any()
    .transform((v) =>
      v === '' || v === null || v === undefined ? null : Number(v),
    )
    .pipe(z.number().int().nullable())
    .optional(),
});

export const schema = z.object({
  characterAttributesAttributes: attributeSchema.array().length(6),
});

export type FormAttribute = z.infer<typeof attributeSchema>;
export type AttributesFormType = z.infer<typeof schema>;

type useAttributesFormProps = {
  characterAttributes: Attribute[];
};

export const useAttributesForm = ({
  characterAttributes,
}: useAttributesFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<AttributesFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        characterAttributesAttributes: [...characterAttributes],
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
