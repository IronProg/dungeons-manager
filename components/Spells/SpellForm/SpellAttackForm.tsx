import type { Control, UseFormWatch } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { Switch, TextInput } from 'react-native-gesture-handler';

import { SpellDamagesForm } from '@/components/Spells/SpellForm/SpellDamagesForm';
import type { SpellFormValues } from '@/components/Spells/SpellForm/useSpellForm';
import { AttributePicker } from '@/components/ui/inputs/AttributePicker';
import i18n from '@/i18n';

interface SpellAttackFormProps {
  control: Control<SpellFormValues>;
  watch: UseFormWatch<SpellFormValues>;
}

export const SpellAttackForm = ({ control, watch }: SpellAttackFormProps) => {
  const hasAttack = watch('hasAttack');

  return (
    <>
      <Controller
        control={control}
        name="hasAttack"
        render={({ field: { value, onChange } }) => (
          <TouchableOpacity className="flex flex-row gap-1 items-center justify-center">
            <Switch value={value} onValueChange={onChange} />

            <Text className="text-lg font-medium">
              {i18n.t('spells.hasAttack')}
            </Text>
          </TouchableOpacity>
        )}
      />

      {hasAttack && (
        <View className="flex flex-row gap-4">
          <View className="min-w-0 grow flex-1">
            <Text>{i18n.t('general.attribute')}</Text>

            <Controller
              control={control}
              name="attackAttributes.mainAttribute"
              render={({ field, fieldState: { error } }) => (
                <AttributePicker {...field} error={error?.message} />
              )}
            />
          </View>

          <View className="w-20">
            <Text>{i18n.t('general.mod')}</Text>

            <Controller
              control={control}
              name="attackAttributes.customBonus"
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextInput
                    className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                    onChangeText={field.onChange}
                    value={`${field.value ?? ''}`}
                    keyboardType="numeric"
                  />

                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                </>
              )}
            />
          </View>

          <View className="flex flex-col items-start">
            <Text>{i18n.t('general.prof')}</Text>

            <Controller
              control={control}
              name="attackAttributes.applyProficiency"
              render={({ field, fieldState: { error } }) => (
                <>
                  <Switch
                    value={field.value}
                    onValueChange={field.onChange}
                    className="pt-5"
                  />

                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                </>
              )}
            />
          </View>
        </View>
      )}

      <SpellDamagesForm control={control} name="damagesAttributes" />

      <Text className="text-center text-xl font-medium mt-4">
        {i18n.t('spells.higherLevelDamages')}
      </Text>

      <SpellDamagesForm
        control={control}
        name="higherLevelsDamagesAttributes"
      />
    </>
  );
};
