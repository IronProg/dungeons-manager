import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import i18n from '@/i18n';
import { useUpdateNpcMutation } from '@/services/npcs/npc.api';
import type { Npc } from '@/types/npc';

const schema = z.object({
  damage: z.coerce.number<number>().int().nonnegative().optional(),
  healing: z.coerce.number<number>().int().nonnegative().optional(),
  temporary: z.coerce.number<number>().int().nonnegative().optional(),
});

type FormValues = z.infer<typeof schema>;

export const NpcHitPointsModifierForm = ({ npc }: { npc: Npc }) => {
  const { close } = useBottomSheet();
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { mutate: updateNpc, isPending } = useUpdateNpcMutation();

  const onSubmit = ({ damage = 0, healing = 0, temporary = 0 }: FormValues) => {
    let temporaryHitPoints = npc.temporaryHitPoints ?? 0;
    let hitPoints = npc.hitPoints;
    temporaryHitPoints -= damage;
    if (temporaryHitPoints < 0) hitPoints += temporaryHitPoints;
    hitPoints = Math.min(npc.hitPointsLimit, hitPoints + healing);
    temporaryHitPoints = Math.max(temporary, temporaryHitPoints, 0);

    updateNpc(
      {
        id: npc.id,
        params: {
          hitPoints: Math.max(hitPoints, 0),
          temporaryHitPoints: temporaryHitPoints || null,
        },
      },
      { onSuccess: () => close() },
    );
  };

  return (
    <View className="items-center gap-4">
      <Text className="text-2xl font-medium">{i18n.t('titles.hitPoints')}</Text>
      <View className="flex-row gap-4">
        <HitPointInput
          control={control}
          name="damage"
          label={i18n.t('general.damage')}
        />
        <HitPointInput
          control={control}
          name="healing"
          label={i18n.t('general.healing')}
        />
        <HitPointInput
          control={control}
          name="temporary"
          label={i18n.t('general.temporary')}
        />
      </View>
      <Button disabled={isPending} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const HitPointInput = ({
  control,
  name,
  label,
}: {
  control: ReturnType<typeof useForm<FormValues>>['control'];
  name: keyof FormValues;
  label: string;
}) => (
  <View className="min-w-0 flex-1">
    <Text className="text-center font-medium">{label}</Text>
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <BottomSheetTextInput
          className="h-15 rounded-lg bg-gray-100 px-4 text-center text-xl"
          keyboardType="numeric"
          value={`${field.value ?? ''}`}
          onChangeText={field.onChange}
        />
      )}
    />
  </View>
);
