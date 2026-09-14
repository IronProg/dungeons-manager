import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

import { getChangedNpcScalars } from '@/components/Npcs/Forms/npcFormValues';
import { AppKeyboardAvoidingView } from '@/components/ui/AppKeyboardAvoidingView';
import { Button } from '@/components/ui/Button';
import { buildNpcUpdatePayload } from '@/core/helpers/npcPayload';
import i18n from '@/i18n';
import { useUpdateNpcMutation } from '@/services/npcs/npc.api';
import type { Npc, NpcAbilityName, NpcScalars } from '@/types/npc';

const abilityNames: NpcAbilityName[] = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

const npcAttributesSchema = z.object({
  strength: z
    .number()
    .int(i18n.t('validation.mustBeInteger'))
    .min(0, i18n.t('validation.numberMin', { min: 0 })),
  dexterity: z
    .number()
    .int(i18n.t('validation.mustBeInteger'))
    .min(0, i18n.t('validation.numberMin', { min: 0 })),
  constitution: z
    .number()
    .int(i18n.t('validation.mustBeInteger'))
    .min(0, i18n.t('validation.numberMin', { min: 0 })),
  intelligence: z
    .number()
    .int(i18n.t('validation.mustBeInteger'))
    .min(0, i18n.t('validation.numberMin', { min: 0 })),
  wisdom: z
    .number()
    .int(i18n.t('validation.mustBeInteger'))
    .min(0, i18n.t('validation.numberMin', { min: 0 })),
  charisma: z
    .number()
    .int(i18n.t('validation.mustBeInteger'))
    .min(0, i18n.t('validation.numberMin', { min: 0 })),
});

type NpcAttributesFormValues = z.infer<typeof npcAttributesSchema>;

type NpcAttributesFormProps = {
  npc: Npc;
};

const getAttributeScalars = (
  npc: Npc,
  values: NpcAttributesFormValues,
): NpcScalars =>
  getChangedNpcScalars(
    {
      strength: npc.strength,
      dexterity: npc.dexterity,
      constitution: npc.constitution,
      intelligence: npc.intelligence,
      wisdom: npc.wisdom,
      charisma: npc.charisma,
    },
    values,
  );

export const NpcAttributesForm = ({ npc }: NpcAttributesFormProps) => {
  const router = useRouter();
  const { mutate: updateNpc, isPending } = useUpdateNpcMutation();
  const { control, handleSubmit } = useForm<NpcAttributesFormValues>({
    resolver: zodResolver(npcAttributesSchema),
    defaultValues: {
      strength: npc.strength,
      dexterity: npc.dexterity,
      constitution: npc.constitution,
      intelligence: npc.intelligence,
      wisdom: npc.wisdom,
      charisma: npc.charisma,
    },
  });

  const onSubmit = handleSubmit((values) => {
    const scalars = getAttributeScalars(npc, values);

    if (Object.keys(scalars).length === 0) {
      router.back();
      return;
    }

    updateNpc(
      { id: npc.id, params: buildNpcUpdatePayload({ scalars }) },
      { onSuccess: () => router.back() },
    );
  });

  return (
    <AppKeyboardAvoidingView>
      <View className="bg-white rounded-2xl p-5 gap-4 shadow-sm">
        <Text className="text-lg font-semibold text-gray-800">
          {i18n.t('titles.attributes')}
        </Text>

        {abilityNames.map((abilityName) => (
          <Controller
            key={abilityName}
            control={control}
            name={abilityName}
            render={({ field, fieldState: { error } }) => (
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  {i18n.t(`attributes.${abilityName}`)}
                </Text>
                <TextInput
                  value={
                    Number.isNaN(field.value) ? '' : field.value.toString()
                  }
                  onChangeText={(text) =>
                    field.onChange(text === '' ? Number.NaN : Number(text))
                  }
                  onBlur={field.onBlur}
                  className="h-12 rounded-xl border border-gray-200 bg-white px-4 font-medium text-gray-800"
                  keyboardType="number-pad"
                  accessibilityLabel={i18n.t(`attributes.${abilityName}`)}
                />
                {error?.message && (
                  <Text className="text-red-400 text-sm mt-1">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
        ))}

        <TouchableOpacity
          onPress={() => router.back()}
          disabled={isPending}
          className="rounded-lg border border-slate-300 py-3"
          activeOpacity={0.8}
        >
          <Text className="text-center text-base font-semibold text-slate-700">
            {i18n.t('general.cancel')}
          </Text>
        </TouchableOpacity>
        <Button
          text={i18n.t('general.save')}
          onPress={onSubmit}
          disabled={isPending}
          loading={isPending}
          textClassName="text-base"
        />
      </View>
    </AppKeyboardAvoidingView>
  );
};
