import { zodResolver } from '@hookform/resolvers/zod';
import { HIT_DICES } from 'core/enums/hitDices';
import { useForm } from 'react-hook-form';
import { CharacterGeneralInfo } from 'types/character';
import * as z from 'zod';

export const schema = z.object({
  hitDices: z.coerce.number<number>().int(),
  hitDicesMaximum: z.coerce.number<number>().int(),
  hitDicesSize: z.enum(HIT_DICES),
});

export type HitDicesFormType = z.infer<typeof schema>;

type useHitDicesFormProps = { generalInfo: CharacterGeneralInfo };

export const useHitDicesForm = ({ generalInfo }: useHitDicesFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<HitDicesFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        hitDices: generalInfo.hitDices,
        hitDicesMaximum: generalInfo.hitDicesMaximum,
        hitDicesSize: generalInfo.hitDicesSize,
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
