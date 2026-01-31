import { zodResolver } from '@hookform/resolvers/zod';
import { ATTRIBUTES } from 'core/enums/attributes';
import { useForm } from 'react-hook-form';
import { Attack } from 'types/character';
import * as z from 'zod';

const damageSchema = z.object({
  id: z.coerce.number<number>().optional(),
  diceSize: z.coerce.number<number>().optional(),
  diceAmount: z.coerce.number<number>().optional(),
  mainAttribute: z.enum(ATTRIBUTES).optional(),
  kind: z.string().optional(),
  customBonus: z.string().optional(),
  _destroy: z.boolean().optional(),
});

const schema = z.object({
  name: z.string(),
  mainAttribute: z.enum(ATTRIBUTES).optional(),
  applyProficiency: z.boolean(),
  range: z.string().optional(),
  customBonus: z.coerce.number<number>().optional(),
  properties: z.string().optional(),
  description: z.string().optional(),
  damagesAttributes: damageSchema.array(),
});

export type AttacksFormType = z.infer<typeof schema>;

type useAttacksFormProps = {
  attack?: Attack;
};

export const useAttacksForm = ({ attack }: useAttacksFormProps) => {
  const { control, handleSubmit, watch, getValues, formState, setValue } =
    useForm<AttacksFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        applyProficiency: attack?.applyProficiency ?? false,
        name: attack?.name ?? '',
        range: attack?.range ?? '',
        properties: attack?.properties ?? '',
        damagesAttributes: attack?.damages ?? [],
      },
    });

  return {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState,
    errors: formState.errors,
  };
};
