import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CharacterGeneralInfo } from 'types/character';
import * as z from 'zod';

export const schema = z.object({
  speed: z.coerce.number<number>().int(),
  speedClimbing: z.coerce.number<number>().int().optional(),
  speedFlying: z.coerce.number<number>().int().optional(),
});

export type SpeedFormType = z.infer<typeof schema>;

type useSpeedFormProps = {
  generalInfo: CharacterGeneralInfo;
};

export const useSpeedForm = ({ generalInfo }: useSpeedFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<SpeedFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        speed: generalInfo.speed,
        speedClimbing: generalInfo.speedClimbing,
        speedFlying: generalInfo.speedFlying,
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
