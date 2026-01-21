import { zodResolver } from '@hookform/resolvers/zod';
import { ATTRIBUTES } from 'core/enums/attributes';
import { useForm } from 'react-hook-form';
import { Attack } from 'types/character';
import * as z from 'zod';

const damageSchema = z.object({
  dice: z.string().optional(),
  attribute: z.enum(ATTRIBUTES).optional(),
  kind: z.string().optional(),
  customBonus: z.string().optional(),
});

const schema = z.object({
  name: z.string(),
  attribute: z.enum(ATTRIBUTES).optional(),
  applyProficiency: z.boolean(),
  range: z.string().optional(),
  customBonus: z.coerce.number<number>().optional(),
  properties: z.string().optional(),
  description: z.string().optional(),
  damages: damageSchema.array(),
});

export type AttacksFormType = z.infer<typeof schema>;

type useAttacksFormProps = {
  attack?: Attack;
};

export const useAttacksForm = ({ attack }: useAttacksFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<AttacksFormType>({
      resolver: zodResolver(schema),
      defaultValues: attack || {
        name: '',
        applyProficiency: false,
        range: '',
        properties: '',
        damages: [{}],
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
