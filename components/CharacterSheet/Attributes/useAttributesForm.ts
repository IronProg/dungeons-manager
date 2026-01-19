import { zodResolver } from '@hookform/resolvers/zod';
import { ATTRIBUTES } from 'core/enums/attributes';
import { useForm } from 'react-hook-form';
import { Attribute } from 'types/character';
import * as z from 'zod';

export const attributeSchema = z.object({
  name: z.enum(ATTRIBUTES),
  value: z.coerce.number<number>().int(),
  tempValue: z.coerce.number<number>().int().optional(),
});

export const schema = z.object({
  attributes: attributeSchema.array().length(6),
});

export type FormAttribute = z.infer<typeof attributeSchema>;
export type AttributesFormType = z.infer<typeof schema>;

type useAttributesFormProps = {
  attributes: Attribute[];
};

export const useAttributesForm = ({ attributes }: useAttributesFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<AttributesFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        attributes: ATTRIBUTES.map((attributeName) => {
          const characterAttr = attributes.find(
            (attr) => attr.name === attributeName,
          );

          return {
            name: attributeName,
            value: characterAttr?.value || 10,
            tempValue: characterAttr?.tempValue ?? undefined,
          };
        }),
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
